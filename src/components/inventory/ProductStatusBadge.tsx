import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { isLowStock, type Product } from "@/lib/data/sample-products";

export function ProductStatusBadge({
  product,
  size = "lg",
}: {
  product: Pick<Product, "quantity" | "threshold">;
  size?: "sm" | "lg";
}) {
  const low = isLowStock(product);

  return (
    <Badge
      variant="outline"
      className={cn(
        "shrink-0 rounded-md border-transparent text-[11px] font-bold text-forest-green uppercase",
        size === "lg" ? "px-2.5 py-1" : "px-2 py-1",
        low ? "bg-status-low" : "bg-status-in-stock"
      )}
    >
      {low ? "Low" : "In stock"}
    </Badge>
  );
}
