import { Pencil, Plus, Search } from "lucide-react";
import { sampleProducts } from "@/lib/data/sample-products";
import { CategoryFilterChips } from "./CategoryFilterChips";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function InventoryMobile() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-16 w-full items-center justify-center bg-forest-green px-5">
        <p className="text-lg font-bold text-white">Inventory</p>
      </div>

      <div className="flex w-full flex-col gap-5 px-5 pt-6">
        <div className="flex h-12 w-full items-center gap-2 rounded-[14px] border border-border-tan bg-white px-3.5">
          <Search className="size-4 text-muted-sage" />
          <span className="flex-1 text-[15px] text-muted-sage">
            Search products...
          </span>
        </div>

        <CategoryFilterChips size="sm" />

        <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gold-yellow shadow-[0px_8px_8px_0px_rgba(240,192,60,0.19)]">
          <Plus className="size-5 text-forest-green" />
          <span className="text-base font-bold text-forest-green">
            Add Product
          </span>
        </button>

        <div className="flex w-full items-baseline justify-between">
          <p className="text-[11px] font-bold text-body-sage">
            YOUR PRODUCTS
          </p>
          <p className="text-[13px] font-bold text-forest-green">
            View Analytics
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          {sampleProducts.map((product) => (
            <div
              key={product.productName}
              className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-[0px_4px_6px_0px_rgba(36,84,36,0.06)]"
            >
              <ProductImagePlaceholder variant="mobile" />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="truncate text-base font-bold text-forest-green">
                  {product.productName}
                </p>
                <p className="truncate text-[13px] font-medium text-body-sage">
                  {product.category} · ₱{product.price}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ProductStatusBadge product={product} size="sm" />
                <button className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-tan bg-cream">
                  <Pencil className="size-4 text-forest-green" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
