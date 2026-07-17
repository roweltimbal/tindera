// Zod schema for product validation
import { ObjectId } from "mongodb"
import { z } from "zod"

// Reusable category enum
export const productCategory = z.enum([
  "Food & Snacks",
  "Beverages",
  "Alcohol",
  "Cleaning Products",
])
export type ProductCategory = z.infer<typeof productCategory>

// Add product form schema (validated in actions.ts against raw user input)
export const addProductSchema = z.object({
  productName: z.string().min(1),
  category: productCategory,
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
  threshold: z.number().int().nonnegative(),
})
export type AddProductSchema = z.infer<typeof addProductSchema>

// Complete schema (form schema + storeId) — passed to product-service.ts
export const addProductCompleteSchema = addProductSchema.extend({
  storeId: z.instanceof(ObjectId),
})
export type AddProductCompleteSchema = z.infer<typeof addProductCompleteSchema>