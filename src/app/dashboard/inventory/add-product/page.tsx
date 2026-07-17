import { AddProductForm } from "./AddProductForm"

export default function AddProductPage() {
  return (
    <div className="flex flex-1 flex-col items-center overflow-x-hidden py-12">
      <div className="flex w-full max-w-[520px] flex-col gap-8 px-6">
        <h1 className="font-heading text-4xl font-extrabold text-forest-green">
          Add Product
        </h1>
        <AddProductForm />
      </div>
    </div>
  )
}
