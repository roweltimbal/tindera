import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroPill } from "@/components/marketing/HeroPill";

export function MobileHero() {
  return (
    <section className="flex w-full flex-col items-start gap-4.5 px-6 pt-10 pb-9 bg-[url('/assets/images/TinderaBGWebP.webp')] bg-cover bg-center">
      <HeroPill />
      <h1 className="text-[32px] leading-[1.12] font-extrabold text-forest-green">
        Don&rsquo;t miss a benta, with Tindera
      </h1>
      <p className="text-[16px] text-[#3e4d3e]">
        Track inventory, record sales, and know what&apos;s selling - right from your phone.
      </p>
      <Button
        asChild
        className="h-[54px] w-full rounded-[14px] bg-olive-lime text-base font-bold text-white hover:bg-olive-lime/90"
      >
        <Link href="/sign-up">Get started - free</Link>
      </Button>
    </section>
  );
}
