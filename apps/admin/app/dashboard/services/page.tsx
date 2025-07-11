import { fetchJson } from "../../../lib/fetcher";
import { ServiceRequest } from "../../../types/service";
import { ServicesStats } from "./_components/services-stats";
import { ServicesTable } from "./_components/services-table";

async function getServices(): Promise<ServiceRequest[]> {
  try {
    const response = await fetchJson<{ data: ServiceRequest[] }>(
      "/api/v1/admins/services",
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Service Requests
          </h1>
          <p className="text-muted-foreground">
            Manage and track all service requests
          </p>
        </div>
      </div>

      <ServicesStats />
      <ServicesTable initialServices={services} />
    </div>
  );
}
