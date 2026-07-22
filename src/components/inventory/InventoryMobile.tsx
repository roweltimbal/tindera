import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { CategoryFilterChips } from "./CategoryFilterChips";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";
import { ProductSearchInput } from "./ProductSearchInput";
import { DeleteProductButton } from "./DeleteProductButton";
import { PaginationControls } from "./PaginationControls";
import { ITEMS_PER_PAGE } from "@/lib/products/product-service";

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
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export function InventoryMobile({ products, currentPage, totalPages, totalCount }: ProductProps) {
  const start = totalCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  return (
    <div className="flex w-full flex-col">
      <div className="flex h-16 w-full items-center justify-center bg-forest-green px-5">
        <p className="text-lg font-bold text-white">Inventory</p>
      </div>

      <div className="flex w-full flex-col gap-5 px-5 pt-6">
        <ProductSearchInput className="h-12 w-full rounded-[14px] px-3.5" />

        <CategoryFilterChips size="sm" />

        <Link
          href="/dashboard/inventory/add-product"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gold-yellow shadow-[0px_8px_8px_0px_rgba(240,192,60,0.19)]"
        >
          <Plus className="size-5 text-forest-green" />
          <span className="text-base font-bold text-forest-green">
            Add Product
          </span>
        </Link>

        <div className="flex w-full items-baseline justify-between">
          <p className="text-[11px] font-bold text-body-sage">
            YOUR PRODUCTS
          </p>
          <p className="text-[13px] font-bold text-forest-green">
            View Analytics
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          {products.map((product) => (
            <div
              key={product._id}
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
                <Link
                  href={`/dashboard/inventory/edit-product/${product._id}`}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-tan bg-cream"
                >
                  <Pencil className="size-4 text-forest-green" />
                </Link>
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

        <div className="flex w-full flex-col items-center gap-3 pb-6">
          <p className="text-[13px] text-muted-sage">
            Showing {start}-{end} of {totalCount} products
          </p>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
