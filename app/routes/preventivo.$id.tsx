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
import { useNavigate } from "@remix-run/react";
import { Label } from "~/components/ui/label";

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
  const [logo, setLogo] = useState<string | null>(null);
  const [isLoadingGenerico, setIsLoadingGenerico] = useState(false);

  const navigate = useNavigate();

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

  // Funzione per gestire l'upload del logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Funzione per esportare il PDF generico con il logo
  const exportToPDFGenerico = async () => {
    setIsLoadingGenerico(true);
    console.log("Logo:", logo);

    try {
      const response = await fetch(
        `/api/genera-preventivo-generico/${preventivo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preventivo, logo }),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante la generazione del PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `preventivo-${preventivo.id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      // Gestisci l'errore (ad es. mostrare una notifica all'utente)
    } finally {
      setIsLoadingGenerico(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dettagli Preventivo #{preventivo.preventivoNumber} -{" "}
        {preventivo.clientName} {preventivo.clientCognome}
      </motion.h1>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-6 overflow-x-auto">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-[#111F43]">
          Dettagli Preventivo
        </h2>
        <div className="overflow-x-auto">
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
                    {item.unitPrice.toFixed(2)} € * {item.quantity}
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
                <td className="py-2 px-4 border-b text-red-600">
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
        </div>
        {/* Sezione di upload del logo
        <div className="mb-4">
          <Label htmlFor="logo" className="block text-gray-700 mb-2">
            Inserisci logo per preventivo generico
          </Label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div> */}

        <div className="mt-4 flex flex-col md:flex-row gap-2 md:space-x-2">
          <ButtonCustom href="/preventivi">Torna Indietro</ButtonCustom>
          <button
            type="button"
            className="w-full md:w-auto px-4 py-2 bg-emerald-800 text-white rounded-lg hover:scale-105"
            onClick={() => navigate(`/modifica-preventivo/${preventivo.id}`)}
          >
            Modifica Preventivo
          </button>

          <button
            onClick={exportToPDF}
            className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
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
              "Esporta in PDF con logo"
            )}
          </button>

          <button
            onClick={exportToPDFGenerico}
            className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:scale-105"
            disabled={isLoadingGenerico}
          >
            {isLoadingGenerico ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
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
              "Esporta in PDF senza logo"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
