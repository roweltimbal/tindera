import Link from "next/link";
import { PenSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryFilterChips } from "./CategoryFilterChips";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";
import { ProductSearchInput } from "./ProductSearchInput";
import { DeleteProductButton } from "./DeleteProductButton";

type ProductCategories = "Food & Snacks" | "Beverages" | "Cleaning Products" | "Alcohol"

interface Product{
  _id: string;
  storeId: string;
  productName: string;
  category: ProductCategories;
  price: number;
  quantity: number;
  threshold: number;
}

interface ProductProps{
  products: Product[]
}

export async function InventoryDesktop({products}: ProductProps) {
 
  return (
    <div className="flex flex-1 flex-col items-center overflow-x-hidden py-12">
      <div className="flex w-full max-w-[1176px] flex-col gap-8 px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-heading text-4xl font-extrabold text-forest-green">
              Inventory
            </p>
            <p className="text-[15px] text-muted-sage">
              {products.length} products in catalog
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ProductSearchInput className="w-80" />
            <Button
              asChild
              variant="ghost"
              className="h-12 gap-2.5 rounded-xl bg-gold-yellow px-6 text-[15px] font-bold text-forest-green shadow-[0px_8px_8px_0px_rgba(240,192,60,0.19)] hover:bg-gold-yellow/90"
            >
              <Link href="/dashboard/inventory/add-product">
                <Plus className="size-[18px]" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        <CategoryFilterChips size="lg" />

        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0px_4px_24px_0px_rgba(36,84,36,0.1)]">
          <div className="flex items-start border-b border-border-tan bg-[#f9fbf9] px-5 py-3.5 text-[13px] font-bold text-muted-sage uppercase">
            <p className="flex-1">Product</p>
            <p className="w-[180px]">Category</p>
            <p className="w-[100px]">Price</p>
            <p className="w-[100px]">Quantity</p>
            <p className="w-[120px]">Status</p>
            <p className="w-[100px] text-right">Actions</p>
          </div>

          <div className="flex flex-col">
            {products.map((product, index) => (
              <div
                key={product._id}
                className={cn(
                  "flex items-center border-b border-border-tan px-5 py-4 last:border-b-0",
                  index % 2 === 1 ? "bg-[#f9fbf9]" : "bg-white"
                )}
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <ProductImagePlaceholder variant="desktop" />
                  <p className="text-[15px] font-bold text-forest-green">
                    {product.productName}
                  </p>
                </div>
                <p className="w-[180px] text-sm text-body-sage">
                  {product.category}
                </p>
                <p className="w-[100px] text-sm font-semibold text-forest-green">
                  ₱{product.price}
                </p>
                <p className="w-[100px] text-sm font-semibold text-forest-green">
                  {product.quantity} pcs
                </p>
                <div className="w-[120px]">
                  <ProductStatusBadge product={product} />
                </div>
                <div className="flex w-[100px] items-center justify-end gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg bg-cream text-forest-green hover:bg-cream/70"
                  >
                    <Link href={`/dashboard/inventory/edit-product/${product._id}`}>
                      <PenSquare className="size-4" />
                    </Link>
                  </Button>
                  <DeleteProductButton
                    product={{
                      productId: product._id,
                      productName: product.productName,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-between px-1">
          <p className="text-sm text-muted-sage">
            Showing 1-6 of {products.length} products
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="h-auto rounded-lg border-border-tan px-4 py-2 text-[13px] font-normal text-body-sage"
            >
              Previous
            </Button>
            <Button className="h-auto rounded-lg bg-forest-green px-4 py-2 text-[13px] font-bold text-white hover:bg-forest-green/90">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
