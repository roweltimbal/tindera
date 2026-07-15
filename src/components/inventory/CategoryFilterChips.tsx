"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATEGORY_FILTERS } from "@/lib/data/sample-products";

export function CategoryFilterChips({ size }: { size: "sm" | "lg" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";

  return (
    <div className="flex flex-wrap items-start gap-2">
      {CATEGORY_FILTERS.map((filter) => {
        const isActive = filter.value === activeCategory;
        return (
          <button
            type="button"
            key={filter.value}
            className={cn(
              "rounded-full border font-medium whitespace-nowrap",
              size === "lg"
                ? "px-5 py-2.5 text-sm"
                : "px-4 py-2 text-[13px]",
              isActive
                ? "border-forest-green bg-forest-green text-white"
                : "border-border-tan bg-white text-body-sage"
            )}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              if (filter.value === "All") {
                params.delete("category");
              } else {
                params.set("category", filter.value);
              }
              router.push(`${pathname}?${params.toString()}`, { scroll: false });
            }}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
