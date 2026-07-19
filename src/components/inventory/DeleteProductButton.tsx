"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteProductAction } from "@/app/dashboard/inventory/actions"

interface DeleteProductButtonProps {
  product: {
    productId: string
    productName: string
  }
}

export function DeleteProductButton({ product }: DeleteProductButtonProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setError(null)
    try {
      await deleteProductAction(product.productId)
      setOpen(false)
    } catch {
      setError("Failed to delete product. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle>Deleting Product</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete {product.productName}?
        </DialogDescription>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
