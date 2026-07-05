import { DesktopNavbar } from "@/components/layout/DesktopNavbar";
import { MobileNavbar } from "@/components/layout/MobileNavbar";
import { DesktopHero } from "@/components/marketing/DesktopHero";
import { MobileHero } from "@/components/marketing/MobileHero";
import { PhotoBand } from "@/components/marketing/PhotoBand";
import { ImageBand } from "@/components/marketing/ImageBand";
import { DesktopFeatures } from "@/components/marketing/DesktopFeatures";
import { MobileFeatures } from "@/components/marketing/MobileFeatures";
import { Testimonial } from "@/components/marketing/Testimonial";
import { DesktopClosing } from "@/components/marketing/DesktopClosing";
import { MobileClosing } from "@/components/marketing/MobileClosing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-cream">
      {/* Mobile experience */}
      <div className="flex flex-col md:hidden">
        <MobileNavbar />
        <MobileHero />
        <PhotoBand src="/assets/images/tinderaHomeOneWebP.webp" alt="Sari-sari store shelves stocked with everyday goods" />
        <MobileFeatures />
        <PhotoBand src="/assets/images/tinderaHomeTwoWebP.webp" alt="Two sari-sari store owners going through inventory together" />
        <Testimonial />
        <MobileClosing />
      </div>

      {/* Desktop experience */}
      <div className="hidden md:flex md:flex-col">
        <DesktopNavbar />
        <DesktopHero />
        <DesktopFeatures />
        <ImageBand src="/assets/images/tinderaHomeOneWebP.webp" alt="Sari-sari store shelves stocked with everyday goods" />
        <Testimonial />
        <ImageBand src="/assets/images/tinderaHomeTwoWebP.webp" alt="Two sari-sari store owners going through inventory together" />
        <DesktopClosing />
      </div>
    </main>
  );
}
