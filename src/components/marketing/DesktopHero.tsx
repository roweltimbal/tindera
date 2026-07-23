import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroPill } from "@/components/marketing/HeroPill";

export function DesktopHero() {
  return (
    <section className="relative flex w-full flex-col items-start overflow-hidden px-20 bg-[url('/assets/images/TinderaBGWebP.webp')] bg-cover bg-center">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-16 px-6 py-20">
        <div className="flex max-w-140 flex-1 flex-col items-start gap-7">
          <HeroPill />
          <h1 className="text-[56px] leading-[1.1] font-extrabold text-forest-green">
            Don&rsquo;t miss a benta, with Tindera
          </h1>
          <p className="text-[18px] text-[#3e4d3e]">
            Track inventory, record sales, and know what&apos;s selling - right from your phone.
          </p>
          <Button
            asChild
            className="h-13.5 w-55 rounded-[14px] bg-olive-lime text-base font-bold text-white hover:bg-olive-lime/90"
          >
            <Link href="/sign-up">Get started - free</Link>
          </Button>
        </div>
        <div className="relative h-130 flex-1 overflow-hidden rounded-[24px]">
          <Image
            src="/assets/images/tinderaHeroPicWebP.webp"
            alt="Sari-sari store owner helping a customer while using Tindera"
            fill
            priority
            sizes="40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
