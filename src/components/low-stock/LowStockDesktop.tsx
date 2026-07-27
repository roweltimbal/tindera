import Link from "next/link";
import { cn } from "@/lib/utils";
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

export function LowStockDesktop({products, currentPage, totalPages, totalCount}: ProductProps) {
  const start = totalCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  return (
    <div className="flex flex-1 flex-col items-center overflow-x-hidden py-12">
      <div className="flex w-full max-w-[1176px] flex-col gap-8 px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-heading text-4xl font-extrabold text-forest-green">
              Low Stock
            </p>
            <p className="text-[15px] text-muted-sage">
              {totalCount} products need restocking
            </p>
          </div>

          <ProductSearchInput className="w-80" />
        </div>

        <CategoryFilterChips size="lg" />

        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0px_4px_24px_0px_rgba(36,84,36,0.1)]">
          <div className="flex items-start border-b border-border-tan bg-[#f9fbf9] px-5 py-3.5 text-[13px] font-bold text-muted-sage uppercase">
            <p className="flex-1">Product</p>
            <p className="w-[160px]">Remaining</p>
            <p className="w-[120px]">Status</p>
            <p className="w-[150px] text-center">Action</p>
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
                <p className="w-[160px] text-sm font-semibold text-forest-green">
                  {product.quantity} pcs
                </p>
                <div className="w-[120px]">
                  <ProductStatusBadge product={product} />
                </div>
                <div className="flex w-[150px] items-center justify-center">
                  <Link
                    href={`/dashboard/inventory/edit-product/${product._id}?from=low-stock`}
                    className="rounded-[10px] border-[1.5px] border-forest-green px-5 py-2 text-[13px] font-bold text-forest-green"
                  >
                    Restock
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-between px-1">
          <p className="text-sm text-muted-sage">
            Showing {start}-{end} of {totalCount} products
          </p>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
