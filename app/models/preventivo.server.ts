import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";

/**
 * Crea un nuovo preventivo nel database.
 *
 * @param data - I dati del preventivo da creare, conformi a Prisma.PreventivoCreateInput.
 * @returns Il preventivo creato.
 */
export async function createPreventivo(data: Prisma.PreventivoCreateInput) {
  return db.preventivo.create({
    data,
  });
}

/**
 * Recupera tutti i preventivi dal database.
 *
 * @returns Un array di preventivi.
 */
export async function getPreventivi() {
  return db.preventivo.findMany({
    include: { items: true },
  });
}

/**
 * Recupera un preventivo specifico per ID.
 *
 * @param id - L'ID del preventivo da recuperare.
 * @returns Il preventivo corrispondente o null se non trovato.
 */
export async function getPreventivoById(id: number) {
  return db.preventivo.findUnique({
    where: { id },
    include: { items: true },
  });
}

/**
 * Elimina un preventivo dal database.
 *
 * @param id - L'ID del preventivo da eliminare.
 * @returns Il preventivo eliminato.
 */
export async function deletePreventivo(id: number) {
  return db.preventivo.delete({
    where: { id },
  });
}