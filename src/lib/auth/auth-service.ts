// Auth business logic: password hashing/verification, user lookup
// STUB — fake internals, real signatures. Replace with Argon2/MongoDB/JWT tomorrow.
import argon2 from "argon2"
import { getDb } from "../db"
import { MongoServerError } from "mongodb"
import { error } from "console"

export async function validateAndSignIn(
  email: string,
  password: string
): Promise<{ error: string } | { success: true, userId: string, storeId: string }> {
 
  const db = await getDb()
  try {
    const userDoc = await db.collection("users").findOne({email: email})
    if(!userDoc) {
      return { error: "Invalid email or password" }
    }

    const isValid = await argon2.verify(userDoc.passwordHash, password)
    if(!isValid) {
      return { error: "Invalid email or password" }
    }
    return {success: true, userId: userDoc._id.toString(), storeId: userDoc.storeId.toString() }
  } catch (err) {
    return { error: "Could not log you in" }
  }

}

export async function signUpUser(input: {
  firstName: string
  lastName: string
  email: string
  storeName: string
  password: string
}): Promise<{ error: string } | { success: true }> {
  
  const db = await getDb();
  const passwordHash = await argon2.hash(input.password)
  // Insert storeName to stores collection
  const storeInsertResult = await db.collection("stores").insertOne({storeName: input.storeName})

  if (!storeInsertResult.acknowledged) {
    return { error: "Error encountered in creating store." }
  }

  const storeId = storeInsertResult.insertedId

  // Create the user document to be inserted
  const userDoc = {
    storeId: storeId,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    passwordHash: passwordHash
  }

  try {
    await db.collection("users").insertOne(userDoc)
  } catch (err) {
    await db.collection("stores").deleteOne({_id: storeId})
    if (err instanceof MongoServerError && err.code === 11000) {
      return { error: "Email already registered." }
    }
    console.error("signUpUser failed:", err)
    return { error: "Something went wrong. Please try again." }
  }

  return { success: true }
  
}

