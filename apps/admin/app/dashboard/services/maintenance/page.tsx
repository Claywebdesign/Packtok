import { fetchJson } from "../../../../lib/fetcher";
import { ServiceRequest, ServiceType } from "../../../../types/service";
import { ServicesTable } from "../_components/services-table";
import { ServicesStats } from "../_components/services-stats";

async function getMaintenanceServices(): Promise<ServiceRequest[]> {
  try {
    const response = await fetchJson<{ data: ServiceRequest[] }>("/api/v1/admins/services");
    return response.data.filter(service => service.serviceType === ServiceType.MAINTENANCE);
  } catch (error) {
    console.error("Failed to fetch maintenance services:", error);
    return [];
  }
}

export default async function MaintenanceServicesPage() {
  const services = await getMaintenanceServices();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Services</h1>
          <p className="text-muted-foreground">
            Manage machine maintenance requests
          </p>
        </div>
      </div>

      <ServicesStats services={services} />
      <ServicesTable initialServices={services} />
    </div>
  );
}