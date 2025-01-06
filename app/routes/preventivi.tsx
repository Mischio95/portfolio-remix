import { useLoaderData, Form, redirect, Link } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPreventivi, deletePreventivo } from "~/models/preventivo.server";
import { Preventivo } from "@prisma/client";
import { useState } from "react";
import { motion } from "framer-motion";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import { Input } from "~/components/ui/input";

type LoaderData = {
  preventivi: Preventivo[];
};

export const loader: LoaderFunction = async () => {
  const preventivi = await getPreventivi();
  return json<LoaderData>({ preventivi });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  if (typeof id === "string") {
    await deletePreventivo(Number(id));
  }
  return redirect("/preventivi");
};

export default function Preventivi() {
  const { preventivi } = useLoaderData<LoaderData>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Gestione Preventivi
      </motion.h1>

      <div className="flex justify-between mb-6">
        <ButtonCustom href="/crea-preventivo">
          Crea Nuovo Preventivo
        </ButtonCustom>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-[#111f43] text-center">
                Numero
              </th>
              <th className="py-2 px-4 border-b text-[#111f43] text-center">
                Cliente
              </th>
              <th className="py-2 px-4 border-b text-[#111f43] text-center">
                Data Emissione
              </th>
              <th className="py-2 px-4 border-b text-[#111f43] text-center">
                Data Scadenza
              </th>
              <th className="py-2 px-4 border-b text-[#111f43] text-center">
                Totale (€)
              </th>
              <th className="py-2 px-4 border-b text-[#111f43] text-center">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {preventivi.map((preventivo) => (
              <tr key={preventivo.id}>
                <td className="py-2 px-4 border-b text-[#111f43] text-center">
                  {preventivo.preventivoNumber || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-[#111f43] text-center">
                  {`${preventivo.clientName} ${
                    preventivo.clientCognome ?? ""
                  }` || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-[#111f43] text-center">
                  {preventivo.issueDate
                    ? new Date(preventivo.issueDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-red-700 text-center">
                  {preventivo.dueDate
                    ? new Date(preventivo.dueDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-[#111f43] text-center">
                  €{preventivo.total.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b text-[#111f43] text-center">
                  <div className="p-4">
                    <ButtonCustom href={`/preventivo/${preventivo.id}`}>
                      Visualizza
                    </ButtonCustom>
                    <Form method="post" className="inline p-4">
                      <Input type="hidden" name="id" value={preventivo.id} />
                      <ButtonCustom type="submit">Elimina</ButtonCustom>
                    </Form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
