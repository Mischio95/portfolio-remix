import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { updatePreventivo } from "~/models/preventivo.server";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const id = Number(params.id);

  try {
    const data = Object.fromEntries(formData);
    const items = extractItems(formData);
    
    // Rimuovi i campi degli item dal data object
    Object.keys(data).forEach(key => {
      if (key.startsWith('item-')) {
        delete data[key];
      }
    });

    // Converti le date in formato ISO
    const issueDate = data.issueDate ? new Date(data.issueDate as string).toISOString() : null;
    const dueDate = data.dueDate ? new Date(data.dueDate as string).toISOString() : null;

    // Prima elimina tutti gli items esistenti
    await db.expenseItem.deleteMany({
      where: {
        preventivoId: id
      }
    });

    // Poi aggiorna il preventivo e crea nuovi items
    const updatedPreventivo = await db.preventivo.update({
      where: { id },
      data: {
        ...data,
        issueDate,
        dueDate,
        items: {
          create: items.map(item => ({
            description: item.description,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
            category: item.category,
            vatIncluded: true
          }))
        }
      },
      include: {
        items: true
      }
    });

    return json({ success: true, preventivo: updatedPreventivo });
  } catch (error) {
    console.error("Errore durante l'aggiornamento:", error);
    return json({ error: "Errore durante l'aggiornamento" }, { status: 500 });
  }
};

function extractItems(formData: FormData) {
  const items: any[] = [];
  const itemIndices = new Set<number>();

  formData.forEach((value, key) => {
    const match = key.match(/^item-(\w+)-(\d+)$/);
    if (match) {
      itemIndices.add(Number(match[2]));
    }
  });

  itemIndices.forEach((index) => {
    items.push({
      description: formData.get(`item-description-${index}`),
      quantity: Number(formData.get(`item-quantity-${index}`)),
      unitPrice: Number(formData.get(`item-unitPrice-${index}`)),
      category: formData.get(`item-category-${index}`)
    });
  });

  return items;
}