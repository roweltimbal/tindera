"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryFilterChips } from "@/components/inventory/CategoryFilterChips";
import { ProductImagePlaceholder } from "@/components/inventory/ProductImagePlaceholder";
import { ProductSearchInput } from "@/components/inventory/ProductSearchInput";
import { recordSaleAction } from "@/app/dashboard/record-sale/actions";

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

interface CartItem {
  productId: string;
  productName: string;
  category: ProductCategories;
  quantity: number;
  availableStock: number;
}

interface RecordSaleMobileProps {
  products: Product[];
}

export function RecordSaleMobile({ products }: RecordSaleMobileProps) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [insufficientIds, setInsufficientIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product._id);
      if (existing) {
        if (existing.quantity >= product.quantity) return prev;
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      if (product.quantity < 1) return prev;
      return [
        ...prev,
        {
          productId: product._id,
          productName: product.productName,
          category: product.category,
          quantity: 1,
          availableStock: product.quantity,
        },
      ];
    });
  }

  function adjustQuantity(productId: string, delta: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(Math.max(item.quantity + delta, 1), item.availableStock) }
          : item
      )
    );
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }

  function clearSale() {
    setCart([]);
    setError(null);
    setInsufficientIds(new Set());
  }

  function handleRecordSale() {
    setError(null);
    setInsufficientIds(new Set());
    startTransition(async () => {
      const result = await recordSaleAction(
        cart.map((item) => ({ productId: item.productId, quantity: item.quantity }))
      );
      if (!result.success) {
        setError(result.error);
        if (result.insufficientStock) {
          setInsufficientIds(new Set(result.insufficientStock.map((item) => item.productId)));
        }
        return;
      }
      setCart([]);
      router.refresh();
    });
  }

  const totalItemsSold = cart.reduce((sum, item) => sum + item.quantity, 0);

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
              {products.map((product, index) => {
                const inCart = cart.find((item) => item.productId === product._id);
                const atCap = inCart
                  ? inCart.quantity >= product.quantity
                  : product.quantity < 1;

                return (
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
                      disabled={atCap}
                      onClick={() => addToCart(product)}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-yellow text-forest-green shadow-[0px_4px_6px_0px_rgba(240,192,60,0.19)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="text-base font-bold text-forest-green">
            Selected items ({cart.length})
          </p>

          {cart.length === 0 ? (
            <p className="text-sm text-muted-sage">No items added yet.</p>
          ) : (
            <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-white p-4 shadow-[0px_4px_6px_0px_rgba(36,84,36,0.06)]">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border bg-cream p-3",
                    insufficientIds.has(item.productId)
                      ? "border-destructive"
                      : "border-border-tan"
                  )}
                >
                  <div className="flex flex-1 flex-col gap-0.5">
                    <p className="text-[15px] font-bold text-forest-green">
                      {item.productName}
                    </p>
                    <p className="text-xs font-medium text-muted-sage">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() => adjustQuantity(item.productId, -1)}
                      className="flex size-7 items-center justify-center rounded-lg border border-border-tan bg-white text-base text-forest-green disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      −
                    </button>
                    <p className="w-6 text-center text-base font-bold text-forest-green">
                      {item.quantity}
                    </p>
                    <button
                      type="button"
                      disabled={item.quantity >= item.availableStock}
                      onClick={() => adjustQuantity(item.productId, 1)}
                      className="flex size-7 items-center justify-center rounded-lg border border-border-tan bg-white text-base text-forest-green disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId)}
                    className="flex size-7 items-center justify-center rounded-lg border border-border-tan bg-white text-sm font-semibold text-forest-green"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between px-1 py-2">
            <p className="text-sm font-medium text-body-sage">
              Total items sold
            </p>
            <p className="text-2xl font-extrabold text-forest-green">
              {totalItemsSold}
            </p>
          </div>

          {error && <p className="px-1 text-sm text-destructive">{error}</p>}

          <div className="flex w-full gap-3">
            <button
              type="button"
              disabled={cart.length === 0 || isPending}
              onClick={clearSale}
              className="flex h-[52px] flex-1 items-center justify-center rounded-[14px] border-[1.5px] border-forest-green text-base font-bold text-forest-green disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear Sale
            </button>
            <button
              type="button"
              disabled={cart.length === 0 || isPending}
              onClick={handleRecordSale}
              className="flex h-[52px] flex-1 items-center justify-center rounded-[14px] bg-gold-yellow text-base font-bold text-forest-green disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Recording..." : "Record Sale"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
