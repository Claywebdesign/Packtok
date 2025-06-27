import Image, { StaticImageData } from "next/image";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  image: StaticImageData | string;
};

export default function PageHeader({
  title,
  subtitle,
  image,
}: PageHeaderProps) {
  return (
    <div className="relative h-[45vh] w-full mt-20">
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-white/50 z-10" />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h1 className="font-bold md:text-6xl text-3xl text-shadow-lg">
          {title}
        </h1>
        <h2 className="text-shadow-md md:text-base text-sm text-center">
          {subtitle}
        </h2>
      </div>
    </div>
  );
}
