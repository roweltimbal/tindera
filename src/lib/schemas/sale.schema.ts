// Zod schema for sale validation
import { z } from "zod"

export const recordSaleItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
})
export type RecordSaleItem = z.infer<typeof recordSaleItemSchema>

export const recordSaleSchema = z.array(recordSaleItemSchema).min(1)
export type RecordSaleSchema = z.infer<typeof recordSaleSchema>
