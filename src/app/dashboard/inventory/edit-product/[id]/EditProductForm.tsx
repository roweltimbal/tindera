"use client"

import { useActionState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  editProductAction,
  deleteProductAction,
  type EditProductActionState,
  type DeleteProductActionState,
} from "./actions"

const categoryOptions = [
  "Food & Snacks",
  "Beverages",
  "Alcohol",
  "Cleaning Products",
] as const

const inputClassName =
  "h-12 w-full rounded-xl border border-border-tan bg-white px-[14px] text-sm text-forest-green placeholder:text-muted-sage focus:outline-none"

interface EditProductFormProps {
  product: {
    _id: string
    productName: string
    category: string
    price: number
    quantity: number
    threshold: number
  }
}

export function EditProductForm({ product }: EditProductFormProps) {
  const [state, formAction, pending] = useActionState<EditProductActionState, FormData>(
    editProductAction,
    null
  )
  const [deleteState, deleteFormAction, deletePending] = useActionState<
    DeleteProductActionState,
    FormData
  >(deleteProductAction, null)

  return (
    <>
      <form
        action={formAction}
        className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0px_4px_24px_0px_rgba(36,84,36,0.1)]"
      >
        <input type="hidden" name="productId" defaultValue={product._id} />

        <div className="flex flex-col gap-2">
          <label htmlFor="productName" className="text-[13px] font-semibold text-forest-green">
            Product name
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            placeholder="e.g. Pancit Canton"
            defaultValue={product.productName}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-[13px] font-semibold text-forest-green">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              defaultValue={product.category}
              className={`${inputClassName} appearance-none pr-10`}
            >
              <option value="" disabled>
                Select category
              </option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-[14px] size-4 -translate-y-1/2 text-muted-sage" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="price" className="text-[13px] font-semibold text-forest-green">
              Price
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-[14px] -translate-y-1/2 text-sm font-semibold text-forest-green">
                ₱
              </span>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                defaultValue={product.price}
                className={`${inputClassName} pl-[28px]`}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="quantity" className="text-[13px] font-semibold text-forest-green">
              Quantity in stock
            </label>
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                placeholder="0"
                defaultValue={product.quantity}
                className={`${inputClassName} pr-14`}
              />
              <span className="pointer-events-none absolute top-1/2 right-[14px] -translate-y-1/2 text-[13px] font-medium text-muted-sage">
                units
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="threshold" className="text-[13px] font-semibold text-forest-green">
            Low-stock alert at
          </label>
          <div className="relative">
            <input
              id="threshold"
              name="threshold"
              type="number"
              min="0"
              placeholder="0"
              defaultValue={product.threshold}
              className={`${inputClassName} pr-14`}
            />
            <span className="pointer-events-none absolute top-1/2 right-[14px] -translate-y-1/2 text-[13px] font-medium text-muted-sage">
              units
            </span>
          </div>
          <p className="text-xs text-muted-sage">
            You&apos;ll be flagged when stock drops to this
          </p>
        </div>

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
        {deleteState?.error && <p className="text-sm text-destructive">{deleteState.error}</p>}

        <div className="flex items-center justify-between gap-4 border-t border-border-tan pt-6">
          <Button
            type="submit"
            form="delete-product-form"
            variant="ghost"
            disabled={deletePending}
            className="text-sm font-medium text-destructive hover:underline disabled:opacity-50"
          >
            {deletePending ? "Deleting..." : "Delete Product"}
          </Button>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/inventory"
              className="text-sm font-medium text-body-sage hover:underline"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-gold-yellow px-6 text-[15px] font-extrabold text-forest-green shadow-[0px_8px_8px_0px_rgba(240,192,60,0.19)] hover:bg-gold-yellow/90 disabled:opacity-50"
            >
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>

      <form id="delete-product-form" action={deleteFormAction} className="hidden">
        <input type="hidden" name="productId" defaultValue={product._id} />
      </form>
    </>
  )
}
