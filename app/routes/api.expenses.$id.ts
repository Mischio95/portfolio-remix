import { json, ActionFunction } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Action per gestire le richieste DELETE
export const action: ActionFunction = async ({ params }) => {
  const { id } = params;

  // Validazione dell'ID
  if (!id) {
    return json({ error: "ID mancante" }, { status: 400 });
  }

  const expenseId = parseInt(id, 10);

  if (isNaN(expenseId)) {
    return json({ error: "ID non valido" }, { status: 400 });
  }

  try {
    const deletedExpense = await prisma.expense.delete({
      where: { id: expenseId },
    });
    return json(deletedExpense, { status: 200 });
  } catch (error: unknown) {
    console.error("Errore nella cancellazione della spesa:", error);
    return json(
      { error: "Errore nella cancellazione della spesa" },
      { status: 500 }
    );
  }
};