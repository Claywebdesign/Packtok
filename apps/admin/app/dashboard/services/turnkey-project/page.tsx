import { fetchJson } from "../../../../lib/fetcher";
import { ServiceRequest, ServiceType } from "../../../../types/service";
import { ServicesTable } from "../_components/services-table";
import { ServicesStats } from "../_components/services-stats";

async function getTurnkeyServices(): Promise<ServiceRequest[]> {
  try {
    const response = await fetchJson<{ data: ServiceRequest[] }>(
      "/api/v1/admins/services",
    );
    return response.data.filter(
      (service) => service.serviceType === ServiceType.TURNKEY_PROJECT,
    );
  } catch (error) {
    console.error("Failed to fetch turnkey services:", error);
    return [];
  }
}

export default async function TurnkeyServicesPage() {
  const services = await getTurnkeyServices();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Turnkey Project Services
          </h1>
          <p className="text-muted-foreground">
            Manage turnkey project inquiries
          </p>
        </div>
      </div>

      <ServicesStats />
      <ServicesTable initialServices={services} />
    </div>
  );
}
