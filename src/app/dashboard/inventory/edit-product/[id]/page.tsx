import { notFound, redirect } from "next/navigation"
import { getProductById } from "@/lib/products/product-service"
import { getUserSession } from "@/lib/auth/session"
import { EditProductForm } from "./EditProductForm"

export default async function EditProductPage({ params, searchParams }: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ from?: string }>
}) {
  const { id } = await params
  const { from } = await searchParams

  const userSession = await getUserSession()
  if (!userSession) {
    redirect("/sign-in")
  }

  const product = await getProductById({ productId: id, storeId: userSession.storeId })

  if (!product) {
    notFound()
  }

  const returnTo = from === "low-stock" ? "/dashboard/low-stock" : "/dashboard/inventory"

  return (
    <div className="flex flex-1 flex-col items-center overflow-x-hidden py-12">
      <div className="flex w-full max-w-[520px] flex-col gap-8 px-6">
        <h1 className="font-heading text-4xl font-extrabold text-forest-green">
          Edit Product
        </h1>
        <EditProductForm product={product} returnTo={returnTo} />
      </div>
    </div>
  )
}
