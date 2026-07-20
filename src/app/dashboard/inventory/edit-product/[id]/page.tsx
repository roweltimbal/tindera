import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products/product-service"
import { EditProductForm } from "./EditProductForm"

const STORE_ID = "6a3ef76c40de4c3b847c2908" // TODO: replace with session storeId once auth lands

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById({ productId: id, storeId: STORE_ID })

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-1 flex-col items-center overflow-x-hidden py-12">
      <div className="flex w-full max-w-[520px] flex-col gap-8 px-6">
        <h1 className="font-heading text-4xl font-extrabold text-forest-green">
          Edit Product
        </h1>
        <EditProductForm product={product} />
      </div>
    </div>
  )
}
