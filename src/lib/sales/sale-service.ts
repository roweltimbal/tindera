// Sales business logic and MongoDB queries
import { ObjectId } from "mongodb"
import { getClient } from "@/lib/db"
import { RecordSaleItem } from "../schemas/sale.schema"

interface ProductDocument {
    _id: ObjectId;
    storeId: ObjectId;
    productName: string;
    quantity: number;
}

interface InsufficientStockItem {
    productId: string;
    productName: string;
    available: number;
    requested: number;
}

export type RecordSaleResult =
    | { success: true }
    | { success: false; error: string; insufficientStock?: InsufficientStockItem[] };

class InsufficientStockError extends Error {
    constructor(public items: InsufficientStockItem[]) {
        super("INSUFFICIENT_STOCK");
    }
}

export async function recordSale(storeId: string, items: RecordSaleItem[]): Promise<RecordSaleResult> {
    const client = await getClient();
    const db = client.db("tindera");
    const session = client.startSession();

    try {
        await session.withTransaction(async () => {
            const productIds = items.map(item => new ObjectId(item.productId));

            const products = await db.collection<ProductDocument>("products")
                .find({ _id: { $in: productIds }, storeId: new ObjectId(storeId) }, { session })
                .toArray();

            const productMap = new Map(products.map(product => [product._id.toString(), product]));

            const insufficient: InsufficientStockItem[] = [];
            for (const item of items) {
                const product = productMap.get(item.productId);
                if (!product || product.quantity < item.quantity) {
                    insufficient.push({
                        productId: item.productId,
                        productName: product?.productName ?? "Unknown product",
                        available: product?.quantity ?? 0,
                        requested: item.quantity,
                    });
                }
            }

            if (insufficient.length > 0) {
                throw new InsufficientStockError(insufficient);
            }

            const operations = items.map(item => ({
                updateOne: {
                    filter: {
                        _id: new ObjectId(item.productId),
                        storeId: new ObjectId(storeId),
                        quantity: { $gte: item.quantity },
                    },
                    update: { $inc: { quantity: -item.quantity } },
                },
            }));

            const bulkResult = await db.collection("products").bulkWrite(operations, { session });

            if (bulkResult.matchedCount !== items.length) {
                throw new Error("STOCK_CHANGED");
            }
        });

        return { success: true };
    } catch (err) {
        if (err instanceof InsufficientStockError) {
            const names = err.items.map(item => item.productName).join(", ");
            return {
                success: false,
                error: `Not enough stock for: ${names}.`,
                insufficientStock: err.items,
            };
        }
        if (err instanceof Error && err.message === "STOCK_CHANGED") {
            return { success: false, error: "Stock changed while recording this sale. Please try again." };
        }
        return { success: false, error: "Error encountered recording sale, please try again." };
    } finally {
        await session.endSession();
    }
}
