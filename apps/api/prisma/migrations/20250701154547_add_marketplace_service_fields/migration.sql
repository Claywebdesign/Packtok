-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('MACHINERY', 'SPARE_PARTS', 'CONSUMABLES', 'RAW_MATERIALS');

-- CreateEnum
CREATE TYPE "ProductCondition" AS ENUM ('NEW', 'USED');

-- CreateEnum
CREATE TYPE "MarketplaceProductStatus" AS ENUM ('AVAILABLE', 'OUT_OF_STOCK', 'SOLD');

-- CreateEnum
CREATE TYPE "UserSubmissionStatus" AS ENUM ('PENDING_APPROVAL', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'REVIEWED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('MAINTENANCE', 'CONSULTANCY', 'TURNKEY_PROJECT', 'BUSINESS_ACQUISITION', 'UNUSED_RAW_MATERIALS', 'EMPLOYMENT');

-- CreateEnum
CREATE TYPE "ServiceInquiryStatus" AS ENUM ('SUBMITTED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "MachineType" AS ENUM ('MONO_CARTON', 'MASTER_CARTON', 'BOTH', 'OTHER');

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketplace_products" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "productType" "ProductType" NOT NULL,
    "machineType" "MachineType",
    "images" TEXT[],
    "pdfUrl" TEXT,
    "specifications" JSONB NOT NULL,
    "condition" "ProductCondition" NOT NULL,
    "status" "MarketplaceProductStatus" NOT NULL DEFAULT 'AVAILABLE',
    "additionalInfo" TEXT,
    "manufacturer" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "categoryId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "submissionStatus" "UserSubmissionStatus",

    CONSTRAINT "marketplace_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_requests" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "status" "QuoteStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_inquiries" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "details" TEXT NOT NULL,
    "address" TEXT,
    "machineType" "MachineType",
    "productType" "ProductType",
    "quantity" INTEGER,
    "peopleCount" INTEGER,
    "budget" DECIMAL(12,2),
    "additionalInfo" TEXT,
    "status" "ServiceInquiryStatus" NOT NULL DEFAULT 'SUBMITTED',
    "userId" TEXT NOT NULL,

    CONSTRAINT "service_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "marketplace_products" ADD CONSTRAINT "marketplace_products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace_products" ADD CONSTRAINT "marketplace_products_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_productId_fkey" FOREIGN KEY ("productId") REFERENCES "marketplace_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_inquiries" ADD CONSTRAINT "service_inquiries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
