import Link from "next/link";
import { CategoryFilterChips } from "@/components/inventory/CategoryFilterChips";
import { ProductStatusBadge } from "@/components/inventory/ProductStatusBadge";
import { ProductImagePlaceholder } from "@/components/inventory/ProductImagePlaceholder";
import { ProductSearchInput } from "@/components/inventory/ProductSearchInput";
import { PaginationControls } from "@/components/inventory/PaginationControls";
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

export function LowStockMobile({ products, currentPage, totalPages, totalCount }: ProductProps) {
  const start = totalCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  return (
    <div className="flex w-full flex-col">
      <div className="flex h-16 w-full items-center justify-center bg-forest-green px-5">
        <p className="text-lg font-bold text-white">Low Stock</p>
      </div>

      <div className="flex w-full flex-col gap-5 px-5 pt-6">
        <ProductSearchInput className="h-12 w-full rounded-[14px] px-3.5" />

        <CategoryFilterChips size="sm" />

        <p className="text-[11px] font-bold text-body-sage">
          {totalCount} PRODUCTS NEED RESTOCKING
        </p>

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
                  {product.quantity} pcs left
                </p>
                <ProductStatusBadge product={product} size="sm" />
              </div>
              <Link
                href={`/dashboard/inventory/edit-product/${product._id}?from=low-stock`}
                className="shrink-0 rounded-xl border-[1.5px] border-forest-green px-3.5 py-2 text-[13px] font-bold text-forest-green"
              >
                Restock
              </Link>
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
