import { cn } from "@/lib/utils";
import { StoreMark } from "@/components/icons/StoreMark";

export function Logo({
  tone,
  size = "sm",
}: {
  tone: "light" | "dark";
  size?: "sm" | "md" | "xl";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-extrabold",
        tone === "light" ? "text-white" : "text-forest-green",
        size === "sm" && "gap-2 text-lg",
        size === "md" && "gap-3 text-3xl",
        size === "xl" && "gap-4 text-4xl"
      )}
    >
      <StoreMark
        className={cn(
          "shrink-0",
          size === "sm" && "size-7",
          size === "md" && "size-10",
          size === "xl" && "size-14"
        )}
      />
      Tindera
    </span>
  );
}
