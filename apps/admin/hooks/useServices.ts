import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import {
  ServiceRequest,
  UpdateServiceStatusRequest,
  AssignServiceRequest,
  ServiceStatsResponse,
  ServiceStatus,
} from "../types/service";
import { QK } from "../utils/queryKeys";

// Services API functions
const servicesApi = {
  // Get all service requests
  getServices: async (): Promise<ServiceRequest[]> => {
    const { data } = await api.get("/api/v1/admins/services");
    return data.data || data;
  },

  // Get single service request
  getService: async (id: string): Promise<ServiceRequest> => {
    const { data } = await api.get(`/api/v1/admins/services/${id}`);
    return data.data || data;
  },

  // Update service status
  updateServiceStatus: async (
    id: string,
    request: UpdateServiceStatusRequest,
  ): Promise<ServiceRequest> => {
    const { data } = await api.put(
      `/api/v1/admins/services/${id}/status`,
      request,
    );
    return data.data || data;
  },

  // Assign service to admin
  assignService: async (
    id: string,
    request: AssignServiceRequest,
  ): Promise<ServiceRequest> => {
    const { data } = await api.put(
      `/api/v1/admins/services/${id}/assign`,
      request,
    );
    return data.data || data;
  },

  // Delete service (SUPER_ADMIN only)
  deleteService: async (id: string): Promise<void> => {
    await api.delete(`/api/v1/admins/services/${id}`);
  },

  // Get service statistics
  getServiceStats: async (): Promise<ServiceStatsResponse> => {
    const { data } = await api.get("/api/v1/admins/services/stats");
    return data.data || data;
  },
};

// Custom hooks
export const useServices = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: filters ? [...QK.services, filters] : QK.services,
    queryFn: servicesApi.getServices,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => servicesApi.getService(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useServiceStats = () => {
  return useQuery({
    queryKey: ["services", "stats"],
    queryFn: servicesApi.getServiceStats,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useUpdateServiceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ServiceStatus }) =>
      servicesApi.updateServiceStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QK.services });
      queryClient.invalidateQueries({ queryKey: ["services", "stats"] });
    },
  });
};

export const useAssignService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, adminId }: { id: string; adminId: string }) =>
      servicesApi.assignService(id, { adminId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QK.services });
      queryClient.invalidateQueries({ queryKey: ["services", "stats"] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => servicesApi.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QK.services });
      queryClient.invalidateQueries({ queryKey: ["services", "stats"] });
    },
  });
};

// Export all service-related hooks and utilities
export default {
  useServices,
  useService,
  useServiceStats,
  useUpdateServiceStatus,
  useAssignService,
  useDeleteService,
};
