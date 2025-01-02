// filepath: /Users/mischio/Desktop/micheletrombone.it/portfolio-remix/app/routes/api.expenses.ts
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Funzione per ottenere le spese
export async function getExpenses() {
  return prisma.expense.findMany();
}


// Loader per gestire le richieste GET
export const loader: LoaderFunction = async () => {
  try {
    const expenses = await prisma.expense.findMany();
    return json(expenses);
  } catch (error: unknown) {
    const typedError = error as Error;
    console.error("Errore API:", typedError);
    return json({ error: "Errore nel recupero delle spese" }, { status: 500 });
  }
};

// Action per gestire le richieste POST
export const action: ActionFunction = async ({ request }) => {
  try {
    const { description, cost, isVatIncluded, isMonthly, category } = await request.json();

    // Validazione dei dati
    if (
      typeof description !== "string" ||
      typeof cost !== "number" ||
      typeof isVatIncluded !== "boolean" ||
      typeof isMonthly !== "boolean" ||
      typeof category !== "string" // Validazione della categoria
    ) {
      return json({ error: "Dati non validi" }, { status: 400 });
    }

    const newExpense = await prisma.expense.create({
      data: { description, cost, isVatIncluded, isMonthly, category }, // Inclusione della categoria
    });

    return json(newExpense, { status: 201 });
  } catch (error: unknown) {
    console.error("Errore nell'aggiunta della spesa:", error);
    return json({ error: "Errore nell'aggiunta della spesa" }, { status: 500 });
  }
};