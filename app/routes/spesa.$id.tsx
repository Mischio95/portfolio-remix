import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getSpeseById, updateSpesa, deleteSpesa } from "~/models/spese.server";
import type { Spese } from "@prisma/client";
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import ButtonCustom from "~/components/buttons/ButtonCustom";

type LoaderData = {
  spesa: Spese;
};

type ActionData = {
  errors?: {
    name?: string;
    amount?: string;
    reimbursementAmount?: string;
    date?: string;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    throw new Response("ID non valido", { status: 400 });
  }
  const spesa = await getSpeseById(id);
  if (!spesa) {
    throw new Response("Spesa non trovata", { status: 404 });
  }
  return { spesa };
};

export const action: ActionFunction = async ({ request, params }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return redirect("/spese-personali-index");
  }

  const formData = await request.formData();
  const _action = formData.get("_action");

  if (_action === "delete") {
    await deleteSpesa(id);
    return redirect("/spese-personali-index");
  }

  if (_action === "emesso") {
    await updateSpesa(id, {
      reimbursementReceived: true,
    });
    return redirect("/spese-personali-index");
  }

  const name = formData.get("name");
  const amount = formData.get("amount");
  const reimbursement = formData.get("reimbursement") === "on";
  const reimbursementAmount = formData.get("reimbursementAmount");
  const date = formData.get("date");

  // ... validazione esistente ...

  await updateSpesa(id, {
    name: String(name),
    amount: Number(amount),
    reimbursement,
    reimbursementAmount: reimbursement ? Number(reimbursementAmount) : null,
    reimbursementReceived: false, // Resetta sempre quando si modifica
    date: new Date(String(date)),
  });

  return redirect("/spese-personali-index");
};

export default function SpesaDetail() {
  const { spesa } = useLoaderData<LoaderData>();
  const transition = useNavigation();
  const [showReimbursementAmount, setShowReimbursementAmount] = useState(
    spesa.reimbursement
  );
  const isSubmitting = transition.state === "submitting";

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dettaglio Spesa</h1>
      <Form
        method="post"
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <div>
          <Label htmlFor="name">Nome della Spesa</Label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={spesa.name}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="amount">Importo (€)</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            step="0.01"
            defaultValue={spesa.amount}
            className="mt-1"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="reimbursement"
            id="reimbursement"
            defaultChecked={spesa.reimbursement}
            onChange={(e) => setShowReimbursementAmount(e.target.checked)}
            className="h-4 w-4 text-[#64FFDA] border-gray-300 rounded"
          />
          <Label htmlFor="reimbursement" className="ml-2">
            Rimborso Richiesto
          </Label>
        </div>

        {showReimbursementAmount && (
          <div>
            <Label htmlFor="reimbursementAmount">Importo Rimborso (€)</Label>
            <Input
              type="number"
              name="reimbursementAmount"
              id="reimbursementAmount"
              step="0.01"
              defaultValue={spesa.reimbursementAmount || 0}
              className="mt-1"
              required
            />
          </div>
        )}

        <div>
          <Label htmlFor="date">Data della Spesa</Label>
          <Input
            type="date"
            name="date"
            id="date"
            defaultValue={new Date(spesa.date).toISOString().split("T")[0]}
            className="mt-1"
            required
          />
        </div>

        <div className="flex space-x-4">
          <ButtonCustom type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salva Modifiche"}
          </ButtonCustom>

          <Form method="post">
            <ButtonCustom
              type="submit"
              name="_action"
              value="delete"
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isSubmitting ? "Eliminando..." : "Elimina Spesa"}
            </ButtonCustom>
          </Form>
        </div>
      </Form>

      {spesa.reimbursement && !spesa.reimbursementReceived && (
        <div className="mt-6">
          <Form method="post">
            <ButtonCustom
              type="submit"
              name="_action"
              value="emesso"
              className="bg-green-500 hover:bg-green-600"
            >
              Rimborso Emesso
            </ButtonCustom>
          </Form>
        </div>
      )}
    </div>
  );
}
