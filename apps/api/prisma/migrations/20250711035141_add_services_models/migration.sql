/*
  Warnings:

  - The values [BUSINESS_ACQUISITION,UNUSED_RAW_MATERIALS,EMPLOYMENT] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `service_inquiries` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('SUBMITTED', 'AWAITING_ASSIGNMENT', 'IN_REVIEW', 'ACTION_REQUIRED', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MaintenanceRequestType" AS ENUM ('PREVENTIVE', 'CORRECTIVE', 'PREDICTIVE', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "IndustryType" AS ENUM ('MANUFACTURING', 'AUTOMOTIVE', 'FOOD_PROCESSING', 'PHARMACEUTICALS', 'AGRICULTURE', 'CHEMICALS', 'PETROCHEMICALS', 'TEXTILE', 'PLASTICS_PACKAGING', 'ELECTRONICS', 'OTHER');

-- CreateEnum
CREATE TYPE "ConsultancyServiceType" AS ENUM ('MACHINE_OPTIMIZATION', 'AUTOMATION_INTEGRATION', 'MAINTENANCE_SUPPORT', 'PROCESS_IMPROVEMENT', 'CUSTOM_MACHINE_DESIGN', 'OPERATOR_TECHNICIAN_TRAINING', 'PREDICTIVE_MAINTENANCE_SETUP', 'TECHNOLOGY_INTEGRATION_AI_IOT_ROBOTICS', 'ENERGY_EFFICIENCY_SUSTAINABILITY', 'OTHER');

-- CreateEnum
CREATE TYPE "ConsultancyProjectGoal" AS ENUM ('INCREASE_MACHINE_PRODUCTIVITY', 'REDUCE_DOWNTIME', 'UPGRADE_OLD_MACHINERY', 'IMPROVE_WORKER_TRAINING', 'ENHANCE_ENERGY_EFFICIENCY', 'INTEGRATE_AUTOMATION_AI', 'COMPLY_WITH_INDUSTRY_STANDARDS', 'OTHER');

-- CreateEnum
CREATE TYPE "TurnkeyFacilityType" AS ENUM ('NEW_PRODUCTION_PLANT', 'EXPANSION_OF_EXISTING_FACILITY', 'MODERNIZATION_AUTOMATION', 'OTHER');

-- CreateEnum
CREATE TYPE "TurnkeyTimeline" AS ENUM ('MONTHS_0_6', 'MONTHS_6_12', 'YEARS_1_2', 'FLEXIBLE_TO_BE_DISCUSSED');

-- CreateEnum
CREATE TYPE "SiteAvailability" AS ENUM ('YES', 'NO', 'IN_PLANNING');

-- CreateEnum
CREATE TYPE "TurnkeyServiceNeeded" AS ENUM ('FEASIBILITY_STUDY', 'PLANT_DESIGN_ENGINEERING', 'EQUIPMENT_PROCUREMENT', 'MACHINERY_INSTALLATION', 'AUTOMATION_SOFTWARE_INTEGRATION', 'PROCESS_OPTIMIZATION', 'EMPLOYEE_TRAINING', 'MAINTENANCE_AFTER_SALES_SUPPORT', 'REGULATORY_COMPLIANCE_SETUP', 'OTHER');

-- CreateEnum
CREATE TYPE "TurnkeyBudget" AS ENUM ('UNDER_1M', 'M1_5', 'M5_10', 'OVER_10M', 'TO_BE_DISCUSSED');

-- CreateEnum
CREATE TYPE "FundingStatus" AS ENUM ('FULLY_FUNDED', 'PARTIALLY_FUNDED', 'SEEKING_FINANCING', 'OTHER');

-- CreateEnum
CREATE TYPE "InquirerType" AS ENUM ('BUYER', 'SELLER', 'ADVISOR_CONSULTANT');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('ASSET_SALE', 'STOCK_SHARE_SALE', 'MERGER', 'ACQUISITION_TAKEOVER', 'NOT_SURE');

-- CreateEnum
CREATE TYPE "LegalStructure" AS ENUM ('SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'PUBLIC', 'LLP', 'OTHER');

-- CreateEnum
CREATE TYPE "ManpowerType" AS ENUM ('MACHINE_OPERATORS', 'TECHNICIANS', 'MAINTENANCE_WORKERS', 'SUPERVISORS', 'OTHER');

-- CreateEnum
CREATE TYPE "HiringDuration" AS ENUM ('PERMANENT', 'CONTRACT');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('MAINTENANCE', 'CONSULTANCY', 'TURNKEY_PROJECT', 'COMPANY_ACQUISITION', 'MANPOWER_HIRING', 'JOB_SEEKER_SUBMISSION');
ALTER TABLE "service_inquiries" ALTER COLUMN "serviceType" TYPE "ServiceType_new" USING ("serviceType"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "service_inquiries" DROP CONSTRAINT "service_inquiries_userId_fkey";

-- DropTable
DROP TABLE "service_inquiries";

-- DropEnum
DROP TYPE "ServiceInquiryStatus";

-- CreateTable
CREATE TABLE "service_requests" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "status" "ServiceStatus" NOT NULL DEFAULT 'SUBMITTED',
    "userId" TEXT NOT NULL,
    "assignedToId" TEXT,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_action_logs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "notes" TEXT,
    "requestId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,

    CONSTRAINT "service_action_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_requests" (
    "id" TEXT NOT NULL,
    "maintenanceType" "MaintenanceRequestType" NOT NULL,
    "companyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "machineName" TEXT NOT NULL,
    "machineIdOrSerialNumber" TEXT NOT NULL,
    "locationInFacility" TEXT NOT NULL,
    "manufacturer" TEXT,
    "installationDate" TIMESTAMP(3),
    "checklistDetails" JSONB,
    "partsReplaced" JSONB,
    "technicianNotes" TEXT,
    "supervisorApprovalName" TEXT,
    "serviceRequestId" TEXT NOT NULL,

    CONSTRAINT "maintenance_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultancy_requests" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "industryType" "IndustryType" NOT NULL,
    "industryOther" TEXT,
    "employeesOperatingMachines" INTEGER,
    "machineTypesInUse" TEXT NOT NULL,
    "yearsInOperation" INTEGER,
    "servicesRequired" "ConsultancyServiceType"[],
    "currentChallenges" TEXT NOT NULL,
    "projectGoals" "ConsultancyProjectGoal"[],
    "preferredStartDate" TIMESTAMP(3),
    "expectedCompletionDate" TIMESTAMP(3),
    "estimatedBudget" TEXT,
    "additionalNotes" TEXT,
    "serviceRequestId" TEXT NOT NULL,

    CONSTRAINT "consultancy_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turnkey_project_inquiries" (
    "id" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT,
    "industry" "IndustryType"[],
    "facilityType" "TurnkeyFacilityType" NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "targetProductionCapacity" TEXT NOT NULL,
    "completionTimeline" "TurnkeyTimeline" NOT NULL,
    "siteAvailableStatus" "SiteAvailability" NOT NULL,
    "servicesNeeded" "TurnkeyServiceNeeded"[],
    "powerSupplyAvailable" TEXT,
    "utilitiesAvailable" BOOLEAN NOT NULL,
    "machineryPreferences" TEXT,
    "estimatedBudget" "TurnkeyBudget" NOT NULL,
    "fundingStatus" "FundingStatus" NOT NULL,
    "requiresOngoingSupport" BOOLEAN NOT NULL,
    "interestedInFutureUpgrades" BOOLEAN NOT NULL,
    "specialRequirements" TEXT,
    "serviceRequestId" TEXT NOT NULL,

    CONSTRAINT "turnkey_project_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_acquisition_inquiries" (
    "id" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "inquirerType" "InquirerType" NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "intendedOutcome" TEXT,
    "sellerBusinessDescription" TEXT,
    "sellerLegalStructure" "LegalStructure",
    "sellerIndustrySector" TEXT,
    "sellerYearEstablished" INTEGER,
    "sellerAnnualRevenue" TEXT,
    "sellerEbitda" TEXT,
    "sellerKeyAssets" TEXT,
    "buyerPreferredBusinessType" TEXT,
    "buyerTargetSize" TEXT,
    "buyerGeographicPreference" TEXT,
    "buyerOwnershipInterest" TEXT,
    "advisorsEngaged" TEXT[],
    "isValued" BOOLEAN,
    "hasOngoingLitigation" BOOLEAN,
    "litigationDetails" TEXT,
    "hasChangeOfControlClauses" BOOLEAN,
    "wantsNda" BOOLEAN NOT NULL,
    "additionalNotes" TEXT,
    "serviceRequestId" TEXT NOT NULL,

    CONSTRAINT "company_acquisition_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manpower_hiring_requests" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "industryType" "IndustryType" NOT NULL,
    "machineryInvolved" TEXT NOT NULL,
    "workLocation" TEXT NOT NULL,
    "workingHours" TEXT NOT NULL,
    "manpowerType" "ManpowerType"[],
    "skilledWorkersRequired" INTEGER NOT NULL DEFAULT 0,
    "semiSkilledWorkersRequired" INTEGER NOT NULL DEFAULT 0,
    "unskilledWorkersRequired" INTEGER NOT NULL DEFAULT 0,
    "hiringDuration" "HiringDuration" NOT NULL,
    "contractDurationDetails" TEXT,
    "requiredCertsAndExp" TEXT,
    "expectedJoiningDate" TIMESTAMP(3) NOT NULL,
    "hiringUrgency" "UrgencyLevel" NOT NULL,
    "additionalNotes" TEXT,
    "serviceRequestId" TEXT NOT NULL,

    CONSTRAINT "manpower_hiring_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_seeker_profiles" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "stateOfResidence" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "alternatePhone" TEXT,
    "positionSought" TEXT NOT NULL,
    "otherPosition" TEXT,
    "preferredWorkingMode" TEXT NOT NULL,
    "hasPreviouslyWorkedWithUs" BOOLEAN NOT NULL,
    "previousWorkEndDate" TIMESTAMP(3),
    "cvUrl" TEXT NOT NULL,
    "serviceRequestId" TEXT NOT NULL,

    CONSTRAINT "job_seeker_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_requests_serviceRequestId_key" ON "maintenance_requests"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "consultancy_requests_serviceRequestId_key" ON "consultancy_requests"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "turnkey_project_inquiries_serviceRequestId_key" ON "turnkey_project_inquiries"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "company_acquisition_inquiries_serviceRequestId_key" ON "company_acquisition_inquiries"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "manpower_hiring_requests_serviceRequestId_key" ON "manpower_hiring_requests"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "job_seeker_profiles_serviceRequestId_key" ON "job_seeker_profiles"("serviceRequestId");

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_action_logs" ADD CONSTRAINT "service_action_logs_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_action_logs" ADD CONSTRAINT "service_action_logs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultancy_requests" ADD CONSTRAINT "consultancy_requests_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turnkey_project_inquiries" ADD CONSTRAINT "turnkey_project_inquiries_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_acquisition_inquiries" ADD CONSTRAINT "company_acquisition_inquiries_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manpower_hiring_requests" ADD CONSTRAINT "manpower_hiring_requests_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_seeker_profiles" ADD CONSTRAINT "job_seeker_profiles_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
