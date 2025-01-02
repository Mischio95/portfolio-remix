import { z } from "zod";

export const userSchema = z.object({
    description: z.string().min(1, "Descrizione richiesta"),
    cost: z.number().min(0.01, "Il costo deve essere maggiore di 0"),
    isVatIncluded: z.boolean(),
    isMonthly: z.boolean(),
    category: z.string().min(1, "Seleziona una categoria"),
});