import { Card } from "@/components/ui/card";
import { FeaturesHeading, FeatureNumber } from "@/components/marketing/FeaturesHeading";
import { features } from "@/components/marketing/features-data";

export function MobileFeatures() {
  return (
    <section id="features" className="flex w-full flex-col items-start gap-4.5 bg-white px-6 py-13">
      <FeaturesHeading size="sm" />
      {features.map((feature) => (
        <Card key={feature.number} className="w-full gap-3 rounded-2xl bg-[#f7efd9] p-5 ring-0">
          <div className="flex items-center gap-3.5">
            <FeatureNumber number={feature.number} />
            <span className="text-[18px] font-bold text-forest-green">{feature.title}</span>
          </div>
          <p className="text-[15px] text-[#3e4d3e]">{feature.body}</p>
        </Card>
      ))}
    </section>
  );
}
