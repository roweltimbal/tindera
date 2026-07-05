import Image from "next/image";

export function PhotoBand({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-60 w-full">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  );
}
