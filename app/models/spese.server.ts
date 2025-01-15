import { db } from "~/utils/db.server";
import type { Spese } from "@prisma/client";

export async function getSpese(filter: any = {}) {
  return db.spese.findMany({
    where: filter,
    orderBy: { date: "desc" },
  });
}

export async function getSpeseById(id: number) {
  return db.spese.findUnique({
    where: { id },
  });
}

export async function createSpesa(
  data: Omit<Spese, "id" | "createdAt" | "updatedAt">
) {
  return db.spese.create({
    data,
  });
}

export async function updateSpesa(
  id: number,
  data: Partial<{
    name: string;
    amount: number;
    reimbursement: boolean;
    reimbursementAmount: number | null;
    reimbursementReceived: boolean;
    date: Date;
  }>
) {
  return db.spese.update({
    where: { id },
    data,
  });
}

export async function deleteSpesa(id: number) {
  return db.spese.delete({
    where: { id },
  });
}
