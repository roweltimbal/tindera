import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/Logo";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { SocialRow } from "@/components/marketing/SocialRow";

export function DesktopClosing() {
  return (
    <footer className="flex w-full flex-col items-center bg-forest-green">
      <ClosingCta size="lg" />
      <div className="flex w-full max-w-7xl flex-col items-center gap-8 px-6 pb-16">
        <Logo tone="light" size="md" />
        <Separator className="bg-white/15" />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6 text-[14px] whitespace-nowrap text-white/90">
            <span>© 2026 Tindera. All rights reserved.</span>
            <a className="underline underline-offset-2 hover:text-white" href="#">Privacy Policy</a>
            <a className="underline underline-offset-2 hover:text-white" href="#">Terms of Service</a>
            <a className="underline underline-offset-2 hover:text-white" href="#">Cookies Settings</a>
          </div>
          <SocialRow className="text-white" />
        </div>
      </div>
    </footer>
  );
}
