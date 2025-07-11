import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { MaintenanceFormData } from "@/schemas/maintenance-schema";
import { ConsultancyFormData } from "@/schemas/consultancy-schema";
import { TurnkeyProjectFormData } from "@/schemas/turnkey-project-schema";
import { CompanyAcquisitionFormData } from "@/schemas/company-acquisition-schema";
import { ManpowerHiringFormData } from "@/schemas/manpower-hiring-schema";
import { JobSeekerFormData } from "@/schemas/job-seeker-schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
      const response = await fetch(
        `${API_BASE_URL}/api/v1/services/maintenance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit maintenance request");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Maintenance request submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit maintenance request");
    },
  });
};

// Consultancy Service Hook
export const useConsultancySubmission = () => {
  return useMutation({
    mutationFn: async (data: ConsultancyFormData) => {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/services/consultancy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit consultancy request");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Consultancy request submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit consultancy request");
    },
  });
};

// Turnkey Project Hook
export const useTurnkeyProjectSubmission = () => {
  return useMutation({
    mutationFn: async (data: TurnkeyProjectFormData) => {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/services/turnkey-project`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit turnkey project request");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Turnkey project inquiry submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit turnkey project inquiry");
    },
  });
};

// Company Acquisition Hook
export const useCompanyAcquisitionSubmission = () => {
  return useMutation({
    mutationFn: async (data: CompanyAcquisitionFormData) => {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/services/company-acquisition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit company acquisition inquiry");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Company acquisition inquiry submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to submit company acquisition inquiry"
      );
    },
  });
};

// Manpower Hiring Hook
export const useManpowerHiringSubmission = () => {
  return useMutation({
    mutationFn: async (data: ManpowerHiringFormData) => {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/services/manpower-hiring`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit manpower hiring request");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Manpower hiring request submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit manpower hiring request");
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

      const response = await fetch(
        `${API_BASE_URL}/api/v1/services/jobseeker`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit job seeker profile");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Job seeker profile submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit job seeker profile");
    },
  });
};

// Get My Service Requests Hook
export const useMyServiceRequests = () => {
  return useQuery({
    queryKey: ["myServiceRequests"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/v1/services/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch service requests");
      }

      const result = await response.json();
      return result.data as ServiceRequest[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
