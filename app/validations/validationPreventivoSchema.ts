import { z } from "zod";

export const preventivoSchema = z.object({
  preventivoNumber: z.string().min(1, "Numero Preventivo richiesto"),
  clientName: z.string().min(1, "Nome Cliente richiesto"),
  clientCognome: z.string().min(1, "Cognome Cliente richiesto"),
  clientAddress: z.string().optional(),
  clientPhone: z.string().min(1, "Telefono Cliente richiesto"),
  clientEmail: z.string().email("Email non valida"),
  clientVat: z.string().optional(),
  providerName: z.string().min(1, "Nome Fornitore richiesto"),
  providerAddress: z.string().min(1, "Indirizzo Fornitore richiesto"),
  providerPhone: z.string().min(1, "Telefono Fornitore richiesto"),
  providerEmail: z.string().email("Email non valida"),
  providerVat: z.string().min(1, "Partita IVA Fornitore richiesta"),
  issueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data di emissione non valida",
  }),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data di scadenza non valida",
  }),
  paymentTerms: z.string().min(1, "Termini di Pagamento richiesti"),
  notes: z.string().optional(),
  isVatIncluded: z.boolean().optional(),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Descrizione richiesta"),
        quantity: z
          .number({ invalid_type_error: "Quantità deve essere un numero" })
          .min(1, "La quantità deve essere maggiore di 0")
          .int("La quantità deve essere un numero intero"),
        unitPrice: z
          .number({ invalid_type_error: "Prezzo Unitario deve essere un numero" })
          .min(0.01, "Il prezzo unitario deve essere maggiore di 0"),
        vatIncluded: z.boolean(),
        category: z.string().min(1, "Categoria richiesta"),
      })
    )
    .min(1, "Almeno un elemento è richiesto"),
});