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
    <main>
      <Hero />
      <ShopNow />
      <NewArrivals />
      <Features />
      <IndustrialPromo />
      <Newsletter />
    </main>
  );
}
