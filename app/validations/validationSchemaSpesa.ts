import { z } from "zod";

export const speseSchema = z.object({
  name: z.string().min(1, "Nome della spesa è richiesto"),
  amount: z
    .number({ invalid_type_error: "Importo deve essere un numero" })
    .min(0.01, "L'importo deve essere maggiore di 0"),
  reimbursement: z.boolean().optional(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data della spesa non valida",
  }),
});
