import HeroCarousel from "./hero-carousel";

export default function Hero() {
  return (
    <section className="noise">
      <HeroCarousel />
      <div className="flex md:flex-row flex-col justify-between items-center py-8 w-[85%] mx-auto">
        <h1 className="md:text-5xl text-2xl md:leading-16 md:w-auto w-full">
          Built for Industry, <br /> Backed by Expertise.
        </h1>
        <p className="text-gray-500">
          <span className="font-bold md:w-auto w-full">PackTok</span> is specialized in factory
          machinery, spare parts, and <br />
          industrial maintenance <span className="md:inline hidden">- trusted by manufacturers for <br /> reliable
          performance and expert support.</span>
        </p>
      </div>
    </section>
  );
}
