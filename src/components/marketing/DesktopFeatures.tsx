import { FeaturesHeading, FeatureNumber } from "@/components/marketing/FeaturesHeading";
import { features } from "@/components/marketing/features-data";

export function DesktopFeatures() {
  return (
    <section id="features" className="flex w-full flex-col items-center bg-cream px-6 py-20">
      <div className="flex w-full max-w-7xl flex-col items-center gap-16">
        <div className="flex max-w-215 flex-col items-center gap-4 text-center">
          <FeaturesHeading size="lg" />
          <p className="text-[18px] text-[#3e4d3e]">
            Tindera gives you what you need without the clutter. Real-time tracking, instant updates, and a workspace that doesn&apos;t slow you down.
          </p>
        </div>
        <div className="grid w-full grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.number} className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-3.5">
                <FeatureNumber number={feature.number} />
                <span className="text-[18px] font-bold text-forest-green">{feature.title}</span>
              </div>
              <p className="text-[15px] text-[#3e4d3e]">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
