// Product/inventory business logic and MongoDB queries
import { ObjectId, Decimal128 } from "mongodb"
import { getDb } from "@/lib/db"
import { AddProductCompleteSchema, EditProductCompleteSchema } from "../schemas/product.schema";

// Types / Schema
interface ProductDocument {
    _id: ObjectId;
    storeId: ObjectId;
    productName: string;
    category: "Food & Snacks" | "Beverages" | "Cleaning Products" | "Alcohol";
    price: Decimal128;
    quantity: number;
    threshold: number;
}

type AddProductDocument = Omit<ProductDocument, "_id">

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

// add product to db


export async function addProductToDb(product: AddProductCompleteSchema) {
    const db = await getDb();
    const productDoc = {
        ...product,
        price: Decimal128.fromString(product.price.toString())
    }
    const result = await db.collection<AddProductDocument>("products").insertOne(productDoc)
    return result;
}

export async function getProductById({ productId, storeId }: { productId: string; storeId: string }) {
    const db = await getDb();
    const product = await db.collection<ProductDocument>("products").findOne({
        _id: new ObjectId(productId),
        storeId: new ObjectId(storeId),
    });

    if (!product) return null;

    return {
        ...product,
        _id: product._id.toString(),
        storeId: product.storeId.toString(),
        price: parseFloat(product.price.toString()),
    };
}

export async function editProductOnDb(product: EditProductCompleteSchema) {
    const db = await getDb();
    const result = await db.collection("products").updateOne(
        { _id: new ObjectId(product.productId), storeId: product.storeId },
        {
            $set: {
                productName: product.productName,
                category: product.category,
                price: Decimal128.fromString(product.price.toString()),
                quantity: product.quantity,
                threshold: product.threshold,
            },
        }
    );
    return result;
}

export async function deleteProduct({ productId, storeId }: { productId: string; storeId: string }) {
    const db = await getDb();
    const result = await db.collection("products").deleteOne({
        _id: new ObjectId(productId),
        storeId: new ObjectId(storeId),
    });

    if (result.deletedCount === 0) {
        throw new Error("Product not found or already deleted");
    }
}