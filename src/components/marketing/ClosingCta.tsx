import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ClosingCta({ size }: { size: "sm" | "lg" }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-4.5 bg-forest-green px-6 text-center",
        size === "sm" && "py-13",
        size === "lg" && "py-20"
      )}
    >
      <h2
        className={cn(
          "leading-[1.12] font-extrabold text-white",
          size === "sm" && "text-[30px]",
          size === "lg" && "max-w-215 text-[40px]"
        )}
      >
        Ready to stop
        <br /> guessing?
      </h2>
      <p
        className={cn(
          "text-[#c9d6cc]",
          size === "sm" && "text-[15px]",
          size === "lg" && "max-w-215 text-[16px]"
        )}
      >
        Tindera is free during early access. No credit card needed.
      </p>
      <Button
        className={cn(
          "h-14 rounded-[14px] bg-gold-yellow text-[17px] font-extrabold text-forest-green hover:bg-gold-yellow/90",
          size === "sm" && "w-full",
          size === "lg" && "w-65"
        )}
      >
        Get started
      </Button>
    </div>
  );
}
