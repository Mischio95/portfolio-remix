-- CreateTable
CREATE TABLE "Preventivo" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientAddress" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientVat" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "providerAddress" TEXT NOT NULL,
    "providerPhone" TEXT NOT NULL,
    "providerEmail" TEXT NOT NULL,
    "providerVat" TEXT NOT NULL,
    "preventivoNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Preventivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseItem" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "vatIncluded" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "preventivoId" INTEGER NOT NULL,

    CONSTRAINT "ExpenseItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpenseItem" ADD CONSTRAINT "ExpenseItem_preventivoId_fkey" FOREIGN KEY ("preventivoId") REFERENCES "Preventivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
