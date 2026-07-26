"use server"

import { revalidatePath } from "next/cache"
import { deleteProduct } from "@/lib/products/product-service"
import { validateUser } from "@/lib/auth/session"

export async function deleteProductByIdAction(productId: string) {
  const auth = await validateUser()
  if ("error" in auth) {
    throw new Error(auth.error)
  }

  await deleteProduct({ productId, storeId: auth.storeId })
  revalidatePath("/dashboard/inventory")
}
