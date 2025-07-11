import { PageHeader } from "@/components";
import Protected from "@/components/auth/protected";
import { ManpowerHiringForm } from "./components/manpower-hiring-form";

export default function ManpowerHiringPage() {
  return (
    <Protected>
      <main>
        <div className="w-[85%] mx-auto">
          <PageHeader
            title="Manpower Hiring"
            subtitle="Find skilled workers and technicians for your industrial operations."
            image="/services.png"
          />
          <div className="py-12">
            <ManpowerHiringForm />
          </div>
        </div>
      </main>
    </Protected>
  );
}
