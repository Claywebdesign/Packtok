import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import api from "@/lib/axios";
import { MaintenanceFormData } from "@/schemas/maintenance-schema";
import { ConsultancyFormData } from "@/schemas/consultancy-schema";
import { TurnkeyProjectFormData } from "@/schemas/turnkey-project-schema";
import { CompanyAcquisitionFormData } from "@/schemas/company-acquisition-schema";
import { ManpowerHiringFormData } from "@/schemas/manpower-hiring-schema";
import { JobSeekerFormData } from "@/schemas/job-seeker-schema";

// Service Types
export type ServiceType = 
  | "MAINTENANCE"
  | "CONSULTANCY" 
  | "TURNKEY_PROJECT"
  | "COMPANY_ACQUISITION"
  | "MANPOWER_HIRING"
  | "JOB_SEEKER";

export type ServiceStatus = 
  | "SUBMITTED"
  | "AWAITING_ASSIGNMENT"
  | "IN_REVIEW"
  | "ACTION_REQUIRED"
  | "APPROVED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CLOSED"
  | "CANCELLED";

export interface ServiceRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  serviceType: ServiceType;
  status: ServiceStatus;
  userId: string;
  assignedToId?: string;
  
  // Service-specific data (one of these will be populated)
  maintenanceRequest?: any;
  consultancyRequest?: any;
  turnkeyProjectInquiry?: any;
  companyAcquisitionInquiry?: any;
  manpowerHiringRequest?: any;
  jobSeekerProfile?: any;
}

// Maintenance Service Hook
export const useMaintenanceSubmission = () => {
  return useMutation({
    mutationFn: async (data: MaintenanceFormData) => {
      const { data: response } = await api.post("/api/v1/services/maintenance", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Maintenance request submitted successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to submit maintenance request";
      toast.error(message);
    },
  });
};

// Consultancy Service Hook
export const useConsultancySubmission = () => {
  return useMutation({
    mutationFn: async (data: ConsultancyFormData) => {
      const { data: response } = await api.post("/api/v1/services/consultancy", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Consultancy request submitted successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to submit consultancy request";
      toast.error(message);
    },
  });
};

// Turnkey Project Hook
export const useTurnkeyProjectSubmission = () => {
  return useMutation({
    mutationFn: async (data: TurnkeyProjectFormData) => {
      const { data: response } = await api.post("/api/v1/services/turnkey-project", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Turnkey project inquiry submitted successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to submit turnkey project inquiry";
      toast.error(message);
    },
  });
};

// Company Acquisition Hook
export const useCompanyAcquisitionSubmission = () => {
  return useMutation({
    mutationFn: async (data: CompanyAcquisitionFormData) => {
      const { data: response } = await api.post("/api/v1/services/company-acquisition", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Company acquisition inquiry submitted successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to submit company acquisition inquiry";
      toast.error(message);
    },
  });
};

// Manpower Hiring Hook
export const useManpowerHiringSubmission = () => {
  return useMutation({
    mutationFn: async (data: ManpowerHiringFormData) => {
      const { data: response } = await api.post("/api/v1/services/manpower-hiring", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Manpower hiring request submitted successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to submit manpower hiring request";
      toast.error(message);
    },
  });
};

// Job Seeker Hook (with file upload)
export const useJobSeekerSubmission = () => {
  return useMutation({
    mutationFn: async (data: JobSeekerFormData) => {
      const formData = new FormData();

      // Add all text fields
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("postalCode", data.postalCode);
      formData.append("stateOfResidence", data.stateOfResidence);
      formData.append("phone", data.phone);
      if (data.alternatePhone)
        formData.append("alternatePhone", data.alternatePhone);
      formData.append("positionSought", data.positionSought);
      if (data.otherPosition)
        formData.append("otherPosition", data.otherPosition);
      formData.append("preferredWorkingMode", data.preferredWorkingMode);
      formData.append(
        "hasPreviouslyWorkedWithUs",
        data.hasPreviouslyWorkedWithUs.toString()
      );
      if (data.previousWorkEndDate)
        formData.append("previousWorkEndDate", data.previousWorkEndDate);

      // Add CV file
      if (data.cv) {
        formData.append("cv", data.cv);
      }

      const { data: response } = await api.post("/api/v1/services/jobseeker", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Job seeker profile submitted successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to submit job seeker profile";
      toast.error(message);
    },
  });
};

// Get My Service Requests Hook
export const useMyServiceRequests = () => {
  return useQuery({
    queryKey: ["myServiceRequests"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/services/my");
      return data.data as ServiceRequest[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
