import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/Logo";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { SocialRow } from "@/components/marketing/SocialRow";

export function MobileClosing() {
  return (
    <>
      <ClosingCta size="sm" />
      <footer className="flex w-full flex-col items-start gap-5 bg-[#1a3f1a] px-6 py-9">
        <Logo tone="light" size="xl" />
        <p className="text-[13px] text-[#d6e0cc]">Inventory and sales for your sari-sari store.</p>
        <Separator className="bg-[#2e5430]" />
        <p className="text-[13px] font-medium text-[#d6e0cc]">tindera@gmail.com</p>
        <SocialRow className="text-[#d6e0cc]" />
        <Separator className="bg-[#2e5430]" />
        <p className="text-[11px] text-[#8a9a8a]">© 2026 Tindera. All rights reserved.</p>
      </footer>
    </>
  );
}
