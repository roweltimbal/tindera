"use server"

import { revalidatePath } from "next/cache"
import { deleteProduct } from "@/lib/products/product-service"

const STORE_ID = "6a3ef76c40de4c3b847c2908" // TODO: replace with session storeId once auth lands

export async function deleteProductAction(productId: string) {
  await deleteProduct({ productId, storeId: STORE_ID })
  revalidatePath("/dashboard/inventory")
}
