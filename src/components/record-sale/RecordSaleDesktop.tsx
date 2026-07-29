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

interface RecordSaleDesktopProps {
  products: Product[];
}

// static preview until cart/sale state is wired up
const SELECTED_ITEMS_PREVIEW = [
  { name: "Pancit Canton", category: "Food & Snacks", qty: 3 },
  { name: "Coca-Cola 12oz", category: "Beverages", qty: 4 },
];

export function RecordSaleDesktop({ products }: RecordSaleDesktopProps) {
  return (
    <div className="flex flex-1 flex-col items-center overflow-x-hidden py-12">
      <div className="flex w-full max-w-[1176px] flex-col gap-8 px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-heading text-4xl font-extrabold text-forest-green">
              Record Sale
            </p>
            <p className="text-[15px] text-muted-sage">
              Add items sold — quantities deduct from inventory
            </p>
          </div>

          <ProductSearchInput className="w-80" />
        </div>

        <div className="flex w-full items-start gap-6">
          <div className="flex w-[720px] flex-col gap-6">
            <CategoryFilterChips size="lg" />

            <div className="flex w-full flex-col gap-3">
              <p className="text-[11px] font-bold text-body-sage uppercase">
                Tap a product to add it to the sale
              </p>

              <div className="flex w-full flex-col items-start rounded-2xl bg-white px-5 py-2 shadow-[0px_4px_12px_0px_rgba(36,84,36,0.1)]">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className={cn(
                      "flex w-full items-center gap-4 py-4",
                      index !== products.length - 1 && "border-b border-cream"
                    )}
                  >
                    <ProductImagePlaceholder variant="desktop" />
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-base font-bold text-forest-green">
                        {product.productName}
                      </p>
                      <p className="text-sm font-medium text-muted-sage">
                        {product.category} · ₱{product.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-[10px] bg-gold-yellow px-4 py-2.5 text-sm font-bold text-forest-green shadow-[0px_4px_6px_0px_rgba(240,192,60,0.19)]"
                    >
                      <Plus className="size-3.5" />
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-[0px_4px_24px_0px_rgba(36,84,36,0.1)]">
            <div className="flex items-center justify-between border-b border-border-tan bg-[#f9fbf9] px-5 py-4">
              <p className="text-base font-extrabold text-forest-green">
                Current Sale
              </p>
              <div className="rounded-md bg-status-in-stock px-2.5 py-1">
                <p className="text-xs font-bold text-forest-green">
                  {SELECTED_ITEMS_PREVIEW.length} items
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5">
              {SELECTED_ITEMS_PREVIEW.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 rounded-2xl border border-border-tan bg-cream p-4"
                >
                  <div className="flex flex-1 flex-col gap-0.5">
                    <p className="text-[15px] font-bold text-forest-green">
                      {item.name}
                    </p>
                    <p className="text-[13px] font-medium text-muted-sage">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-lg border border-border-tan bg-white text-lg text-forest-green"
                    >
                      −
                    </button>
                    <p className="w-6 text-center text-base font-bold text-forest-green">
                      {item.qty}
                    </p>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-lg border border-border-tan bg-white text-lg text-forest-green"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-lg border border-border-tan bg-white text-base font-semibold text-forest-green"
                  >
                    ×
                  </button>
                </div>
              ))}

              <div className="flex flex-col gap-5 pt-5">
                <div className="h-px w-full bg-border-tan" />
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-medium text-body-sage">
                    Total items sold
                  </p>
                  <p className="text-[28px] font-extrabold text-forest-green">
                    {SELECTED_ITEMS_PREVIEW.reduce((sum, item) => sum + item.qty, 0)}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="flex h-[52px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-forest-green text-base font-bold text-forest-green"
                  >
                    Clear Sale
                  </button>
                  <button
                    type="button"
                    className="flex h-[52px] w-full items-center justify-center rounded-[14px] bg-gold-yellow text-base font-bold text-forest-green shadow-[0px_8px_8px_0px_rgba(240,192,60,0.19)]"
                  >
                    Record Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
