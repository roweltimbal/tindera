// Product/inventory business logic and MongoDB queries
import { ObjectId, Decimal128 } from "mongodb"
import { getDb } from "@/lib/db"

interface ProductDocument {
    _id: ObjectId;
    storeId: ObjectId;
    productName: string;
    category: "Food & Snacks" | "Beverages" | "Cleaning Products" | "Alcohol";
    price: Decimal128;
    quantity: number;
    threshold: number;
}

function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface GetProductOptions {
    search?: string;
    category?: string;
    // page, limit will slot in here later for pagination
}

export async function getProductsByStore(storeId: string, options: GetProductOptions = {}) {
    const db = await getDb();
    const query: Record<string, unknown> = { storeId: new ObjectId(storeId) };

    if (options.search) {
        query.productName = { $regex: escapeRegex(options.search), $options: "i" };
    }

    if (options.category && options.category !== "All") {
        query.category = options.category
    }

    const rawProducts = await db.collection<ProductDocument>("products").find(query).toArray();

    return rawProducts.map(product => ({
        ...product,
        _id: product._id.toString(),
        storeId: product.storeId.toString(),
        price: parseFloat(product.price.toString()),
    }))
}