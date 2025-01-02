import { db } from "~/utils/db.server";
import { Fornitori } from "@prisma/client";

export async function getFornitori(): Promise<Fornitori[]> {
  return db.fornitori.findMany();
}

// Funzione per aggiungere un nuovo fornitore
export async function addFornitore(data: {
  nome: string;
  sitoWeb?: string;
  telefono?: string;
  email?: string;
}): Promise<Fornitori> {
  return db.fornitori.create({
    data,
  });
}

// Funzione per eliminare un fornitore
export async function deleteFornitore(id: number): Promise<Fornitori> {
  return db.fornitori.delete({
    where: { id },
    
  });
}