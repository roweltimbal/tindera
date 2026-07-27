"use server"

import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { editProductSchema, editProductCompleteSchema } from "@/lib/schemas/product.schema"
import { editProductOnDb, deleteProduct } from "@/lib/products/product-service"
import { validateUser } from "@/lib/auth/session"

const ALLOWED_RETURN_PATHS = ["/dashboard/inventory", "/dashboard/low-stock"]

function resolveReturnTo(value: FormDataEntryValue | null) {
  return typeof value === "string" && ALLOWED_RETURN_PATHS.includes(value)
    ? value
    : "/dashboard/inventory"
}

export type EditProductActionState = { error: string } | null

export async function editProductAction(
  _prevState: EditProductActionState,
  formData: FormData
): Promise<EditProductActionState> {
  const auth = await validateUser()
  if ("error" in auth) {
    return { error: auth.error }
  }

  const returnTo = resolveReturnTo(formData.get("returnTo"))

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
    storeId: new ObjectId(auth.storeId),
  })

  await editProductOnDb(completeProduct)

  revalidatePath("/dashboard/inventory")
  revalidatePath("/dashboard/low-stock")
  redirect(returnTo)
}

export type DeleteProductActionState = { error: string } | null

export async function deleteProductAction(
  _prevState: DeleteProductActionState,
  formData: FormData
): Promise<DeleteProductActionState> {
  const auth = await validateUser()
  if ("error" in auth) {
    return { error: auth.error }
  }

  const returnTo = resolveReturnTo(formData.get("returnTo"))

  const productId = formData.get("productId")

  if (typeof productId !== "string") {
    return { error: "Missing product id." }
  }

  try {
    await deleteProduct({ productId, storeId: auth.storeId })
  } catch {
    return { error: "Failed to delete product. Please try again." }
  }

  revalidatePath("/dashboard/inventory")
  revalidatePath("/dashboard/low-stock")
  redirect(returnTo)
}
