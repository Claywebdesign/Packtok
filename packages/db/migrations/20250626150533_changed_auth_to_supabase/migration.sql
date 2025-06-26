/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `otps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `refresh_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "otps" DROP CONSTRAINT "otps_userId_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_userId_fkey";

-- DropIndex
DROP INDEX "users_phone_number_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "verified";

-- DropTable
DROP TABLE "otps";

-- DropTable
DROP TABLE "refresh_tokens";
