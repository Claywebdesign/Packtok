/*
  Warnings:

  - The values [MANAGE_CONSULTANCY,MANAGE_MANPOWER] on the enum `Permission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Permission_new" AS ENUM ('MANAGE_SERVICES', 'MANAGE_MARKETPLACE', 'MANAGE_BIDDING', 'MANAGE_VENDORS', 'MANAGE_USERS', 'MANAGE_PAYMENTS', 'CREATE_ADMINS');
ALTER TABLE "admin_permissions" ALTER COLUMN "permission" TYPE "Permission_new" USING ("permission"::text::"Permission_new");
ALTER TYPE "Permission" RENAME TO "Permission_old";
ALTER TYPE "Permission_new" RENAME TO "Permission";
DROP TYPE "Permission_old";
COMMIT;
