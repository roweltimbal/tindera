"use server"

import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addProductSchema, addProductCompleteSchema } from "@/lib/schemas/product.schema"
import { addProductToDb } from "@/lib/products/product-service"

const STORE_ID = "6a3ef76c40de4c3b847c2908" // TODO: replace with session storeId once auth lands

export type AddProductActionState = { error: string } | null

export async function addProduct(
  _prevState: AddProductActionState,
  formData: FormData
): Promise<AddProductActionState> {
  const productName = formData.get("productName")
  const category = formData.get("category")
  const price = formData.get("price")
  const quantity = formData.get("quantity")
  const threshold = formData.get("threshold")

  if (
    typeof productName !== "string" ||
    typeof category !== "string" ||
    typeof price !== "string" ||
    typeof quantity !== "string" ||
    typeof threshold !== "string"
  ) {
    return { error: "Missing required fields." }
  }

  const parsed = addProductSchema.safeParse({
    productName,
    category,
    price: Number(price),
    quantity: Number(quantity),
    threshold: Number(threshold),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data." }
  }

  const completeProduct = addProductCompleteSchema.parse({
    ...parsed.data,
    storeId: new ObjectId(STORE_ID),
  })

  const result = await addProductToDb(completeProduct)

  if (!result.acknowledged) {
    return { error: "Failed to save product. Please try again." }
  }

  revalidatePath("/dashboard/inventory")
  redirect("/dashboard/inventory")
}
