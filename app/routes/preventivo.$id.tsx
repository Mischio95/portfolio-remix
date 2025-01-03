"use client";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPreventivoById } from "~/models/preventivo.server";
import { Preventivo } from "@prisma/client";
import { motion } from "framer-motion";
import pkg from "file-saver";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import { useState } from "react";
const { saveAs } = pkg;

type LoaderData = {
  preventivo: Preventivo;
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    throw new Response("ID non valido", { status: 400 });
  }
  const preventivo = await getPreventivoById(id);
  if (!preventivo) {
    throw new Response("Preventivo non trovato", { status: 404 });
  }
  return json<LoaderData>({ preventivo });
};

export default function DettaglioPreventivo() {
  const { preventivo } = useLoaderData<LoaderData>();
  const [isLoading, setIsLoading] = useState(false);

  const exportToPDF = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/genera-preventivo/${preventivo.id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Errore durante la generazione del PDF.");
      }

      const blob = await response.blob();
      const sanitizedClientName = preventivo.clientName
        ? preventivo.clientName.replace(/[^a-z0-9]/gi, "_")
        : "unknown_client";
      const sanitizedClientCognome = preventivo.clientCognome
        ? preventivo.clientCognome.replace(/[^a-z0-9]/gi, "_")
        : "unknown_client";

      saveAs(
        blob,
        `Preventivo_${sanitizedClientName}_${sanitizedClientCognome}.pdf`
      );
    } catch (error) {
      console.error("Errore durante l'esportazione del PDF:", error);
      alert(
        "Si è verificato un errore durante l'esportazione del PDF. Riprova."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dettagli Preventivo N:{preventivo.preventivoNumber} -{" "}
        {preventivo.clientName} {preventivo.clientCognome}
      </motion.h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[#111F43]">
          Dettagli Preventivo
        </h2>
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <tbody>
            {/* Sezione Cliente */}
            <tr>
              <th
                colSpan={2}
                className="py-2 px-4 border-b text-left text-[#fff] uppercase bg-[#111F43]  "
              >
                Riepilogo dati Cliente
              </th>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Nome
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.clientName}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Cognome
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.clientCognome}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Indirizzo
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.clientAddress}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Telefono
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.clientPhone}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Email
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.clientEmail}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Partita IVA
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.clientVat}
              </td>
            </tr>

            {/* Sezione Fornitore */}
            <tr>
              <th
                colSpan={2}
                className="py-2 px-4 border-b text-left text-[#fff] uppercase bg-[#111F43] "
              >
                Dettagli sul Fornitore
              </th>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Nome
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.providerName}
              </td>
            </tr>

            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Indirizzo
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.providerAddress}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Telefono
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.providerPhone}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Email
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.providerEmail}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Partita IVA
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.providerVat}
              </td>
            </tr>
            {/* Sezione Spese */}
            <tr>
              <th
                colSpan={2}
                className="py-2 px-4 border-b text-left text-[#fff] uppercase bg-[#111F43] "
              >
                Riepilogo Voci di Spesa
              </th>
            </tr>
            {preventivo.items.map((item, index) => (
              <tr key={index}>
                <th className="py-2 px-4 border-b text-left text-[#10172a]">
                  {item.description}
                </th>
                <td className="py-2 px-4 border-b text-[#10172a]">
                  {item.unitPrice.toFixed(2)} €
                </td>
              </tr>
            ))}

            {/* Sezione Dettagli Preventivo */}
            <tr>
              <th
                colSpan={2}
                className="py-2 px-4 border-b text-left text-[#fff] uppercase bg-[#111F43] "
              >
                Dettagli Preventivo
              </th>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Data Emissione
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.issueDate
                  ? new Date(preventivo.issueDate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Data Scadenza
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.dueDate
                  ? new Date(preventivo.dueDate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Termini di Pagamento
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.paymentTerms}
              </td>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Note
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.notes || "N/A"}
              </td>
            </tr>

            <tr>
              <th className="py-2 px-4 border-b text-left text-[#10172a]">
                Totale (€)
              </th>
              <td className="py-2 px-4 border-b text-[#10172a]">
                {preventivo.total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 flex space-x-2">
          <ButtonCustom href="/preventivi">Torna Indietro</ButtonCustom>
          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Esporta in PDF"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
