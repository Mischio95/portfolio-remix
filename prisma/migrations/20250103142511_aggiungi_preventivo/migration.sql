/*
  Warnings:

  - Added the required column `subtotal` to the `Preventivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Preventivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalVat` to the `Preventivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preventivo" ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalVat" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;
