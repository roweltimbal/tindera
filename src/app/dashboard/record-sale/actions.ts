"use server"

import { revalidatePath } from "next/cache"
import { recordSaleSchema } from "@/lib/schemas/sale.schema"
import { recordSale, type RecordSaleResult } from "@/lib/sales/sale-service"
import { validateUser } from "@/lib/auth/session"

export async function recordSaleAction(items: unknown): Promise<RecordSaleResult> {
  const auth = await validateUser()
  if ("error" in auth) {
    return { success: false, error: auth.error }
  }

  const parsed = recordSaleSchema.safeParse(items)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid sale data." }
  }

  const result = await recordSale(auth.storeId, parsed.data)
  if (!result.success) {
    return result
  }

  revalidatePath("/dashboard/record-sale")
  revalidatePath("/dashboard/inventory")
  revalidatePath("/dashboard/low-stock")

  return { success: true }
}
