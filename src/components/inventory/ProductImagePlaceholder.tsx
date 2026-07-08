import { cn } from "@/lib/utils";

export function ProductImagePlaceholder({
  variant,
}: {
  variant: "desktop" | "mobile";
}) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-lg bg-cream",
        variant === "desktop"
          ? "size-12 border border-border-tan"
          : "size-14"
      )}
    />
  );
}
