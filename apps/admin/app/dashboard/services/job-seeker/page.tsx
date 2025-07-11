import { fetchJson } from "../../../../lib/fetcher";
import { ServiceRequest, ServiceType } from "../../../../types/service";
import { ServicesTable } from "../_components/services-table";
import { ServicesStats } from "../_components/services-stats";

async function getJobSeekerServices(): Promise<ServiceRequest[]> {
  try {
    const response = await fetchJson<{ data: ServiceRequest[] }>(
      "/api/v1/admins/services",
    );
    return response.data.filter(
      (service) => service.serviceType === ServiceType.JOB_SEEKER_SUBMISSION,
    );
  } catch (error) {
    console.error("Failed to fetch job seeker services:", error);
    return [];
  }
}

export default async function JobSeekerServicesPage() {
  const services = await getJobSeekerServices();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Job Seeker Services
          </h1>
          <p className="text-muted-foreground">
            Manage job seeker profile submissions
          </p>
        </div>
      </div>

      <ServicesStats />
      <ServicesTable initialServices={services} />
    </div>
  );
}
