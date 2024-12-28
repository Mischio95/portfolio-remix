import { json, ActionFunction } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Action per aggiornare le vite di un giocatore
export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  const method = request.method;

  if (method === "PUT") {
    try {
      const { lives } = await request.json();

      if (typeof lives !== "number") {
        return json({ error: "Dati non validi" }, { status: 400 });
      }

      const updatedPlayer = await prisma.player.update({
        where: { id: parseInt(id!, 10) },
        data: { lives },
      });

      return json(updatedPlayer, { status: 200 });
    } catch (error) {
      console.error("Errore nell'aggiornamento delle vite:", error);
      return json(
        { error: "Errore nell'aggiornamento delle vite" },
        { status: 500 }
      );
    }
  }

  if (method === "DELETE") {
    try {
      await prisma.player.delete({
        where: { id: parseInt(id!, 10) },
      });
      return json({ message: "Giocatore eliminato" });
    } catch (error) {
      console.error("Errore eliminazione:", error);
      return json({ error: "Errore eliminazione giocatore" }, { status: 500 });
    }
  }

  return json({ error: "Metodo non supportato" }, { status: 405 });
};
