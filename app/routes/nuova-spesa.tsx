import { Form, useActionData, redirect } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { createSpesa } from "~/models/spese.server";
import { json } from "@remix-run/node";
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import { speseSchema } from "~/validations/validationSchemaSpesa";

type ActionData = {
  errors?: {
    name?: string;
    amount?: string;
    date?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Estrai i dati del form
  const name = formData.get("name");
  const amount = formData.get("amount");
  const date = formData.get("date");

  // Prepara i dati per la validazione
  const data = {
    name: typeof name === "string" ? name : "",
    amount: typeof amount === "string" ? parseFloat(amount) : 0,
    reimbursement: false,
    reimbursementAmount: 0, // Initialize reimbursement amount
    date: typeof date === "string" ? date : "",
  };

  // Valida i dati usando Zod
  const result = speseSchema.safeParse(data);

  if (!result.success) {
    const errors: ActionData["errors"] = {};

    result.error.errors.forEach((err) => {
      if (err.path.length > 0) {
        const fieldName = err.path[0] as keyof ActionData["errors"];
        errors[fieldName] = err.message;
      }
    });

    return json<ActionData>({ errors }, { status: 400 });
  }

  // Se la validazione è riuscita, crea la spesa
  await createSpesa({
    name: result.data.name,
    amount: result.data.amount,
    reimbursement: result.data.reimbursement,
    reimbursementAmount: result.data.reimbursementAmount,
    date: new Date(result.data.date),
  });

  return redirect("/spese");
};

export default function NewSpesa() {
  const actionData = useActionData<ActionData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg text-black shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Aggiungi Nuova Spesa
        </h1>
        <Form
          method="post"
          className="space-y-4"
          onSubmit={() => setIsSubmitting(true)}
        >
          <div>
            <Label htmlFor="name">Nome della Spesa</Label>
            <Input
              type="text"
              name="name"
              id="name"
              className="mt-1 text-black placeholder-black"
              required
              placeholder="Inserisci il nome della spesa"
            />
            {actionData?.errors?.name && (
              <p className="text-red-500 text-sm">{actionData.errors.name}</p>
            )}
          </div>
          <div>
            <Label htmlFor="amount">Importo (€)</Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              step="0.01"
              className="mt-1 text-black placeholder-black"
              required
              placeholder="Inserisci l'importo"
            />
            {actionData?.errors?.amount && (
              <p className="text-red-500 text-sm">{actionData.errors.amount}</p>
            )}
          </div>
          <div>
            <Label htmlFor="date">Data della Spesa</Label>
            <Input
              type="date"
              name="date"
              id="date"
              className="mt-1 text-black placeholder-black"
              required
            />
            {actionData?.errors?.date && (
              <p className="text-red-500 text-sm">{actionData.errors.date}</p>
            )}
          </div>
          <div>
            <ButtonCustom type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salva Spesa"}
            </ButtonCustom>
          </div>
        </Form>
      </div>
    </div>
  );
}
