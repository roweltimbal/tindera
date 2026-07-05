import Image from "next/image";

export function ImageBand({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-106.25 w-full mb-22">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
    </div>
  );
}
