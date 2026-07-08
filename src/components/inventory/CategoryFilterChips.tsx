import { cn } from "@/lib/utils";
import { CATEGORY_FILTERS } from "@/lib/data/sample-products";

export function CategoryFilterChips({ size }: { size: "sm" | "lg" }) {
  return (
    <div className="flex flex-wrap items-start gap-2">
      {CATEGORY_FILTERS.map((filter) => {
        const isActive = filter.value === "All";
        return (
          <div
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
          >
            {filter.label}
          </div>
        );
      })}
    </div>
  );
}
