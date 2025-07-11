import { notFound } from "next/navigation";
import { fetchJson } from "../../../../lib/fetcher";
import { ServiceRequest } from "../../../../types/service";
import { ServiceDetailView } from "../_components/service-detail-view";

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

async function getService(id: string): Promise<ServiceRequest | null> {
  try {
    const response = await fetchJson<{ data: ServiceRequest }>(`/api/v1/admins/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await getService(params.id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}