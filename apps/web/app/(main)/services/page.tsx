import { CategoryList, Footer, Newsletter, PageHeader } from "@/components";
import { serviceCategories } from "@/constant";

export default function Services() {
  return (
    <main>
      <div className="w-[85%] mx-auto">
        <PageHeader
          title="Services"
          subtitle="We delivers machinery maintenance, consultancy, and turnkey project execution"
          image="/services.png"
        />
        <CategoryList categoryDataList={serviceCategories} />
      </div>
      <Newsletter />
      <Footer />
    </main>
  );
}
