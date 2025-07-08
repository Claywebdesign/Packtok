import {
  Features,
  Hero,
  IndustrialPromo,
  NewArrivals,
  Newsletter,
  ShopNow,
} from "@/components";

export default function Home() {
  return (
    <main className="mt-16">
      <Hero />
      <ShopNow />
      <NewArrivals />
      <Features />
      <IndustrialPromo />
      <Newsletter />
    </main>
  );
}
