import { db } from "~/utils/db.server";
import { Competitor } from "@prisma/client";

export async function getCompetitori(): Promise<Competitor[]> {
  return db.competitor.findMany();
}

export async function addCompetitore(data: {
  nomeAzienda: string;
  sitoWeb: string;
  descrizioneProdottiVenduti?: string;
}): Promise<Competitor> {
  return db.competitor.create({
    data,
  });
}

export async function deleteCompetitore(id: number): Promise<Competitor> {
  return db.competitor.delete({
    where: { id },
  });
}