import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  try {
    const players = await prisma.player.findMany();
    return json(players);
  } catch (error: unknown) {
    const typedError = error as Error;
    console.error("Errore API:", typedError);
    return json({ error: "Errore database" }, { status: 500 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const method = request.method;

  if (method === "POST") {
    const formData = await request.formData();
    const name = formData.get("name");
    const lives = formData.get("lives");

    if (!name || !lives) {
      return json({ error: "Dati mancanti" }, { status: 400 });
    }

    try {
      const newPlayer = await prisma.player.create({
        data: {
          name: name.toString().trim(),
          lives: parseInt(lives.toString(), 10),
        },
      });
      return json(newPlayer, { status: 201 });
    } catch (error) {
      console.error("Errore nell'aggiunta del giocatore:", error);
      return json(
        { error: "Errore nell'aggiunta del giocatore" },
        { status: 500 }
      );
    }
  }

  if (method === "DELETE") {
    try {
      await prisma.player.deleteMany();
      return json({ message: "Lista dei giocatori cancellata" });
    } catch (error) {
      return json({ error: "Errore nella cancellazione" }, { status: 500 });
    }
  }

  return json({ error: "Metodo non supportato" }, { status: 405 });
};
