import { Badge } from "@/components/ui/badge";

export function HeroPill() {
  return (
    <Badge className="h-auto gap-2 rounded-full border border-[#c0cc9c] bg-white px-3 py-1.5 text-[12px] font-semibold text-forest-green">
      <span className="size-1.5 shrink-0 rounded-full bg-olive-lime" />
      Made for sari-sari owners
    </Badge>
  );
}
