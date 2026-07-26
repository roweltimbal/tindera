// Store business logic and MongoDB queries
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getStoreById(storeId: string) {
  const db = await getDb();
  const store = await db.collection("stores").findOne(
    { _id: new ObjectId(storeId) },
    { projection: { storeName: 1 } }
  );

  if (!store) return null;

  return {
    storeName: store.storeName as string,
  };
}

export async function updateStoreById(storeId: string, updates: { storeName: string }) {
  const db = await getDb();
  await db.collection("stores").updateOne(
    { _id: new ObjectId(storeId) },
    { $set: updates }
  );
}
