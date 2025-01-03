-- CreateTable
CREATE TABLE "Competitor" (
    "id" SERIAL NOT NULL,
    "nomeAzienda" TEXT NOT NULL,
    "sitoWeb" TEXT NOT NULL,
    "descrizioneProdottiVenduti" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("id")
);
