import { cn } from "@/lib/utils";

export function FeaturesHeading({ size }: { size: "sm" | "lg" }) {
  return (
    <>
      <p className="text-[11px] font-bold tracking-[1.8px] text-olive-lime">THE BASICS, DONE WELL</p>
      <h2
        className={cn(
          "leading-[1.15] text-forest-green",
          size === "sm" && "text-[28px] font-bold",
          size === "lg" && "text-[40px] font-extrabold"
        )}
      >
        Everything you need.
        <br />
        Nothing you don&apos;t.
      </h2>
    </>
  );
}

export function FeatureNumber({ number }: { number: number }) {
  return (
    <span className="flex size-9.5 shrink-0 items-center justify-center rounded-full bg-gold-yellow text-[16px] font-extrabold text-forest-green">
      {number}
    </span>
  );
}
