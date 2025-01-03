-- DropForeignKey
ALTER TABLE "ExpenseItem" DROP CONSTRAINT "ExpenseItem_preventivoId_fkey";

-- AddForeignKey
ALTER TABLE "ExpenseItem" ADD CONSTRAINT "ExpenseItem_preventivoId_fkey" FOREIGN KEY ("preventivoId") REFERENCES "Preventivo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
