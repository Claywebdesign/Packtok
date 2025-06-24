import Footer from "@/components/footer/footer";
import { Hero } from "@/components/index";
import Features from "@/components/landing/features/features";
import IndustrialPromo from "@/components/landing/industrial-promo/industrial-promo";
import NewArrivals from "@/components/landing/new-arrivals/new-arrivals";
import Newsletter from "@/components/landing/newsletter/newsletter";
import ShopNow from "@/components/landing/shop-now/shop-now";

export default function Home() {
  return (
    <main>
      <Hero />
      <ShopNow/> 
      <NewArrivals/>
      <Features/>
      <IndustrialPromo/>
      <Newsletter/>
      <Footer/>
    </main>
  );
}
