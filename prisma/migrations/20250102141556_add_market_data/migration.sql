-- CreateTable
CREATE TABLE "MarketData" (
    "id" SERIAL NOT NULL,
    "marketSize" DOUBLE PRECISION NOT NULL,
    "growthRate" DOUBLE PRECISION NOT NULL,
    "demographics" JSONB NOT NULL,
    "trends" JSONB NOT NULL,
    "swot" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketData_pkey" PRIMARY KEY ("id")
);
