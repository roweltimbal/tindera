"use server"

import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { editProductSchema, editProductCompleteSchema } from "@/lib/schemas/product.schema"
import { editProductOnDb, deleteProduct } from "@/lib/products/product-service"

const STORE_ID = "6a3ef76c40de4c3b847c2908" // TODO: replace with session storeId once auth lands

export type EditProductActionState = { error: string } | null

export async function editProductAction(
  _prevState: EditProductActionState,
  formData: FormData
): Promise<EditProductActionState> {
  const productId = formData.get("productId")
  const productName = formData.get("productName")
  const category = formData.get("category")
  const price = formData.get("price")
  const quantity = formData.get("quantity")
  const threshold = formData.get("threshold")

  if (
    typeof productId !== "string" ||
    typeof productName !== "string" ||
    typeof category !== "string" ||
    typeof price !== "string" ||
    typeof quantity !== "string" ||
    typeof threshold !== "string"
  ) {
    return { error: "Missing required fields." }
  }

  const parsed = editProductSchema.safeParse({
    productId,
    productName,
    category,
    price: Number(price),
    quantity: Number(quantity),
    threshold: Number(threshold),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data." }
  }

  const completeProduct = editProductCompleteSchema.parse({
    ...parsed.data,
    storeId: new ObjectId(STORE_ID),
  })

  await editProductOnDb(completeProduct)

  revalidatePath("/dashboard/inventory")
  redirect("/dashboard/inventory")
}

export type DeleteProductActionState = { error: string } | null

export async function deleteProductAction(
  _prevState: DeleteProductActionState,
  formData: FormData
): Promise<DeleteProductActionState> {
  const productId = formData.get("productId")

  if (typeof productId !== "string") {
    return { error: "Missing product id." }
  }

  try {
    await deleteProduct({ productId, storeId: STORE_ID })
  } catch {
    return { error: "Failed to delete product. Please try again." }
  }

  revalidatePath("/dashboard/inventory")
  redirect("/dashboard/inventory")
}
