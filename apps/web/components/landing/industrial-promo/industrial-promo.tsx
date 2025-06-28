import industrial from "@/assets/industrial.png";
import SplitSection from "@/components/split-section/split-section";

export default function IndustrialPromo() {
  return (
    <div className="w-full mx-auto py-8">
      <SplitSection
        image={industrial}
        title="Industrial products now at lower prices!"
        description="It’s the perfect time to upgrade your factory with high-performance machines, spare parts, and maintenance tools, all at unmatched value."
      />
    </div>
  );
}
