import { prisma, Prisma, ServiceStatus, ServiceType } from "@packtok/db";

/*
 * Generic helper to attach the common include block so that frontend always
 * receives the specialised request details along with parent data.
 */
const requestInclude = {
  maintenanceRequest: true,
  consultancyRequest: true,
  turnkeyProjectInquiry: true,
  companyAcquisitionInquiry: true,
  manpowerHiringRequest: true,
  jobSeekerProfile: true,
};

export const createMaintenanceRequest = async (
  userId: string,
  data: Prisma.MaintenanceRequestUncheckedCreateWithoutServiceRequestInput
) => {
  return prisma.serviceRequest.create({
    data: {
      userId,
      serviceType: ServiceType.MAINTENANCE,
      status: ServiceStatus.SUBMITTED,
      maintenanceRequest: { create: data },
    },
    include: requestInclude,
  });
};

export const createConsultancyRequest = async (
  userId: string,
  data: Prisma.ConsultancyRequestUncheckedCreateWithoutServiceRequestInput
) => {
  return prisma.serviceRequest.create({
    data: {
      userId,
      serviceType: ServiceType.CONSULTANCY,
      status: ServiceStatus.SUBMITTED,
      consultancyRequest: { create: data },
    },
    include: requestInclude,
  });
};

export const createTurnkeyProjectInquiry = async (
  userId: string,
  data: Prisma.TurnkeyProjectInquiryUncheckedCreateWithoutServiceRequestInput
) => {
  return prisma.serviceRequest.create({
    data: {
      userId,
      serviceType: ServiceType.TURNKEY_PROJECT,
      status: ServiceStatus.SUBMITTED,
      turnkeyProjectInquiry: { create: data },
    },
    include: requestInclude,
  });
};

export const createCompanyAcquisitionInquiry = async (
  userId: string,
  data: Prisma.CompanyAcquisitionInquiryUncheckedCreateWithoutServiceRequestInput
) => {
  return prisma.serviceRequest.create({
    data: {
      userId,
      serviceType: ServiceType.COMPANY_ACQUISITION,
      status: ServiceStatus.SUBMITTED,
      companyAcquisitionInquiry: { create: data },
    },
    include: requestInclude,
  });
};

export const createManpowerHiringRequest = async (
  userId: string,
  data: Prisma.ManpowerHiringRequestUncheckedCreateWithoutServiceRequestInput
) => {
  return prisma.serviceRequest.create({
    data: {
      userId,
      serviceType: ServiceType.MANPOWER_HIRING,
      status: ServiceStatus.SUBMITTED,
      manpowerHiringRequest: { create: data },
    },
    include: requestInclude,
  });
};

export const createJobSeekerProfile = async (
  userId: string,
  data: Prisma.JobSeekerProfileUncheckedCreateWithoutServiceRequestInput
) => {
  return prisma.serviceRequest.create({
    data: {
      userId,
      serviceType: ServiceType.JOB_SEEKER_SUBMISSION,
      status: ServiceStatus.SUBMITTED,
      jobSeekerProfile: { create: data },
    },
    include: requestInclude,
  });
};

export const getUserServiceRequests = async (userId: string) => {
  return prisma.serviceRequest.findMany({
    where: { userId },
    include: requestInclude,
    orderBy: { createdAt: "desc" },
  });
};
