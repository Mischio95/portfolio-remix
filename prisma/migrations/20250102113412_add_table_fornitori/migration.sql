/*
  Warnings:

  - You are about to alter the column `sitoWeb` on the `Fornitori` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `telefono` on the `Fornitori` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `email` on the `Fornitori` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Fornitori" ALTER COLUMN "sitoWeb" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "telefono" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);
