-- CreateTable
CREATE TABLE "Fornitori" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sitoWeb" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fornitori_pkey" PRIMARY KEY ("id")
);
