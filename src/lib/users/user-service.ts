// User business logic and MongoDB queries
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export async function getUserById(userId: string) {
  const db = await getDb();
  const user = await db.collection("users").findOne(
    { _id: new ObjectId(userId) },
    { projection: { firstName: 1, lastName: 1, email: 1 } }
  );

  if (!user) return null;

  return {
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    email: user.email as string,
  };
}

export async function updateUserById(
  userId: string,
  updates: { firstName: string; lastName: string; email: string }
) {
  const db = await getDb();
  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: updates }
  );
}
