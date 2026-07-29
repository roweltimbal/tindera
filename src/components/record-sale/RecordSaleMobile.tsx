import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryFilterChips } from "@/components/inventory/CategoryFilterChips";
import { ProductImagePlaceholder } from "@/components/inventory/ProductImagePlaceholder";
import { ProductSearchInput } from "@/components/inventory/ProductSearchInput";

type ProductCategories = "Food & Snacks" | "Beverages" | "Cleaning Products" | "Alcohol";

interface Product {
  _id: string;
  storeId: string;
  productName: string;
  category: ProductCategories;
  price: number;
  quantity: number;
  threshold: number;
}

interface RecordSaleMobileProps {
  products: Product[];
}

// static preview until cart/sale state is wired up
const SELECTED_ITEMS_PREVIEW = [
  { name: "Pancit Canton", category: "Food & Snacks", qty: 3 },
  { name: "Coca-Cola 12oz", category: "Beverages", qty: 4 },
];

export function RecordSaleMobile({ products }: RecordSaleMobileProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-16 w-full items-center justify-center bg-forest-green px-5">
        <p className="text-lg font-bold text-white">Record Sale</p>
      </div>

      <div className="flex w-full flex-col gap-6 px-5 pt-6 pb-6">
        <div className="flex w-full flex-col gap-4">
          <ProductSearchInput className="h-12 w-full rounded-[14px] px-3.5" />

          <CategoryFilterChips size="sm" />

          <div className="flex w-full flex-col gap-3">
            <p className="text-[11px] font-bold text-body-sage">TAP TO ADD</p>

            <div className="flex w-full flex-col rounded-2xl bg-white p-4 shadow-[0px_4px_6px_0px_rgba(36,84,36,0.06)]">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className={cn(
                    "flex w-full items-center gap-3 py-3",
                    index !== products.length - 1 && "border-b border-cream"
                  )}
                >
                  <ProductImagePlaceholder variant="mobile" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="truncate text-base font-bold text-forest-green">
                      {product.productName}
                    </p>
                    <p className="truncate text-xs font-medium text-muted-sage">
                      {product.category} · ₱{product.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-yellow text-forest-green shadow-[0px_4px_6px_0px_rgba(240,192,60,0.19)]"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="text-base font-bold text-forest-green">
            Selected items ({SELECTED_ITEMS_PREVIEW.length})
          </p>

          <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-white p-4 shadow-[0px_4px_6px_0px_rgba(36,84,36,0.06)]">
            {SELECTED_ITEMS_PREVIEW.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2.5 rounded-xl border border-border-tan bg-cream p-3"
              >
                <div className="flex flex-1 flex-col gap-0.5">
                  <p className="text-[15px] font-bold text-forest-green">
                    {item.name}
                  </p>
                  <p className="text-xs font-medium text-muted-sage">
                    {item.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex size-7 items-center justify-center rounded-lg border border-border-tan bg-white text-base text-forest-green"
                  >
                    −
                  </button>
                  <p className="w-6 text-center text-base font-bold text-forest-green">
                    {item.qty}
                  </p>
                  <button
                    type="button"
                    className="flex size-7 items-center justify-center rounded-lg border border-border-tan bg-white text-base text-forest-green"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="flex size-7 items-center justify-center rounded-lg border border-border-tan bg-white text-sm font-semibold text-forest-green"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between px-1 py-2">
            <p className="text-sm font-medium text-body-sage">
              Total items sold
            </p>
            <p className="text-2xl font-extrabold text-forest-green">
              {SELECTED_ITEMS_PREVIEW.reduce((sum, item) => sum + item.qty, 0)}
            </p>
          </div>

          <div className="flex w-full gap-3">
            <button
              type="button"
              className="flex h-[52px] flex-1 items-center justify-center rounded-[14px] border-[1.5px] border-forest-green text-base font-bold text-forest-green"
            >
              Clear Sale
            </button>
            <button
              type="button"
              className="flex h-[52px] flex-1 items-center justify-center rounded-[14px] bg-gold-yellow text-base font-bold text-forest-green"
            >
              Record Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
