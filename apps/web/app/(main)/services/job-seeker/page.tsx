import { PageHeader } from "@/components";
import Protected from "@/components/auth/protected";
import { JobSeekerForm } from "./components/job-seeker-form";

export default function JobSeekerPage() {
  return (
    <Protected>
      <main>
        <div className="w-[85%] mx-auto">
          <PageHeader
            title="Job Seeker Registration"
            subtitle="Submit your profile to find opportunities in the industrial sector."
            image="/services.png"
          />
          <div className="py-12">
            <JobSeekerForm />
          </div>
        </div>
      </main>
    </Protected>
  );
}
