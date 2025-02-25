-- AlterTable
ALTER TABLE "ExpenseItem" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "unitPrice" DROP NOT NULL,
ALTER COLUMN "vatIncluded" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Preventivo" ALTER COLUMN "clientName" DROP NOT NULL,
ALTER COLUMN "clientAddress" DROP NOT NULL,
ALTER COLUMN "clientPhone" DROP NOT NULL,
ALTER COLUMN "clientEmail" DROP NOT NULL,
ALTER COLUMN "clientVat" DROP NOT NULL,
ALTER COLUMN "providerName" DROP NOT NULL,
ALTER COLUMN "providerAddress" DROP NOT NULL,
ALTER COLUMN "providerPhone" DROP NOT NULL,
ALTER COLUMN "providerEmail" DROP NOT NULL,
ALTER COLUMN "providerVat" DROP NOT NULL,
ALTER COLUMN "preventivoNumber" DROP NOT NULL,
ALTER COLUMN "issueDate" DROP NOT NULL,
ALTER COLUMN "dueDate" DROP NOT NULL,
ALTER COLUMN "paymentTerms" DROP NOT NULL;
