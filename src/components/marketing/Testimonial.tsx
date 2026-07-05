import Image from "next/image";

const stats = [
  { value: "2 min", label: "to set up" },
  { value: "Free", label: "while in beta" },
  { value: "Mobile", label: "first design" },
];

export function Testimonial() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-cream px-6 py-12 md:py-20">
      <Image
        src="/assets/images/TinderaBGWebP.webp"
        alt=""
        fill
        aria-hidden="true"
        className="pointer-events-none -z-10 object-cover"
      />
      <div className="flex w-full max-w-215 flex-col items-center gap-12 md:max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-[11px] font-bold tracking-[1.8px] text-olive-lime">IN YOUR HANDS</p>
          <h2 className="text-[26px] leading-[1.18] font-bold text-forest-green md:text-[40px] md:leading-[1.15] md:font-extrabold">
            Made for owners
            <br />
            like Aling Rosa.
          </h2>
          <p className="max-w-215 text-[15px] text-[#3e4d3e] md:text-[18px]">
            Tindera is shaped by how real sari-sari stores work - fast to learn, easy to use mid-customer, and built for the small things that matter when every sale counts.
          </p>
        </div>
        <div className="flex w-full max-w-85.5 items-start justify-between md:max-w-215">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-start gap-1">
              <p className="text-[24px] font-extrabold text-forest-green">{stat.value}</p>
              <p className="text-[12px] font-medium text-[#3e4d3e] md:text-[14px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
