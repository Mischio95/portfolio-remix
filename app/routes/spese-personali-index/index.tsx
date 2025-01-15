import { useLoaderData, Link, useSearchParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getSpese } from "~/models/spese.server";
import type { Spese } from "@prisma/client";
import { useMemo, useState } from "react";
import ExportPDFButton from "~/components/spese/ExportPDFButton";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import { Label } from "~/components/ui/label";
import saveAs from "file-saver";

type LoaderData = {
  spese: Spese[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const month = url.searchParams.get("month");
  const year = url.searchParams.get("year");

  let filter: any = {};

  if (month && year) {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );
    filter.date = {
      gte: startDate,
      lte: endDate,
    };
  }

  const spese = await getSpese(filter);
  return json<LoaderData>({ spese });
};

export default function Spese() {
  const { spese } = useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const exportToPDF = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/spese-genera-pdf`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Errore durante la generazione del PDF.");
      }

      const blob = await response.blob();

      saveAs(blob, `Lista-Spese-${new Date().getFullYear()}.pdf`);
    } catch (error) {
      console.error("Errore durante l'esportazione del PDF:", error);
      alert(
        "Si è verificato un errore durante l'esportazione del PDF. Riprova."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const month = formData.get("month") as string;
    const year = formData.get("year") as string;

    const params: any = {};
    if (month) params.month = month;
    if (year) params.year = year;

    setSearchParams(params);
  };

  const speseByMonth = useMemo(() => {
    const groups: Record<string, Spese[]> = {};

    spese.forEach((spesa) => {
      const dateObj = new Date(spesa.date);
      const monthYear = dateObj.toLocaleString("it-IT", {
        month: "long",
        year: "numeric",
      });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(spesa);
    });

    return groups;
  }, [spese]);

  const monthlyTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    spese.forEach((spesa) => {
      const dateObj = new Date(spesa.date);
      const monthYear = dateObj.toLocaleString("it-IT", {
        month: "long",
        year: "numeric",
      });

      if (!totals[monthYear]) {
        totals[monthYear] = 0;
      }

      totals[monthYear] += spesa.amount;
      // Sottrai solo se il rimborso è stato emesso
      if (spesa.reimbursementReceived && spesa.reimbursementAmount) {
        totals[monthYear] -= spesa.reimbursementAmount;
      }
    });

    return totals;
  }, [spese]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-black">Riepilogo Spese</h1>
        <div className="">
          <ButtonCustom href="/nuova-spesa">Aggiungi nuova spesa</ButtonCustom>
        </div>

        <form className="pt-4 mb-6" onSubmit={handleFilter}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
            <div>
              <Label htmlFor="month">Mese</Label>
              <select
                name="month"
                id="month"
                className="mt-1 block w-full p-2 bg-white border border-slate-300 rounded-md text-slate-700"
                defaultValue={searchParams.get("month") || ""}
              >
                <option value="">Tutti i mesi</option>
                <option value="01">Gennaio</option>
                <option value="02">Febbraio</option>
                <option value="03">Marzo</option>
                <option value="04">Aprile</option>
                <option value="05">Maggio</option>
                <option value="06">Giugno</option>
                <option value="07">Luglio</option>
                <option value="08">Agosto</option>
                <option value="09">Settembre</option>
                <option value="10">Ottobre</option>
                <option value="11">Novembre</option>
                <option value="12">Dicembre</option>
              </select>
            </div>
            <div>
              <Label htmlFor="year">Anno</Label>
              <input
                type="number"
                name="year"
                id="year"
                min="2000"
                max="2100"
                className="mt-1 block w-full p-2 bg-white border border-slate-300 rounded-md text-slate-700"
                placeholder="es. 2024"
                defaultValue={searchParams.get("year") || ""}
              />
            </div>
            <div className="flex items-end">
              <ButtonCustom type="submit">Filtra</ButtonCustom>
            </div>
          </div>
        </form>

        {Object.keys(speseByMonth).length === 0 ? (
          <p className="text-center text-slate-400">Nessuna spesa trovata.</p>
        ) : (
          Object.keys(speseByMonth).map((month) => (
            <div key={month} className="mb-8 overflow-x-auto">
              <h2 className="text-2xl font-semibold mb-4 uppercase text-[#111f43]">
                {month}
              </h2>

              <table className="w-full table-auto text-center border-collapse text-[#10172A]">
                <thead className="bg-[#111F43] text-white">
                  <tr>
                    <th className="border p-2">Nome Spesa</th>
                    <th className="border p-2">Importo (€)</th>
                    <th className="border p-2">Rimborso Richiesto</th>
                    <th className="border p-2">Rimborso Emesso (€)</th>
                    <th className="border p-2">Data</th>
                    <th className="border p-2">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {speseByMonth[month].map((spesa) => (
                    <tr key={spesa.id}>
                      <td className="border p-2">{spesa.name}</td>
                      <td className="border p-2">{spesa.amount.toFixed(2)}</td>
                      <td className="border p-2">
                        {spesa.reimbursement ? "Sì" : "No"}
                      </td>
                      <td className="border p-2">
                        {spesa.reimbursement && spesa.reimbursementAmount
                          ? spesa.reimbursementReceived
                            ? spesa.reimbursementAmount.toFixed(2)
                            : "In attesa"
                          : "0.00"}
                      </td>
                      <td className="border p-2">
                        {new Date(spesa.date).toLocaleDateString("it-IT")}
                      </td>
                      <td className="border p-2">
                        <Link
                          to={`/spesa/${spesa.id}`}
                          className="text-red-800 underline"
                        >
                          Dettagli
                        </Link>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="border p-2 text-red-800">Totale</td>
                    <td className="border p-2 text-red-800">
                      {monthlyTotals[month].toFixed(2)}
                    </td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                  </tr>
                  {/* Divider Blu Aggiunto */}
                  <div className="border-t-2 border-[#111f43] my-4"></div>
                </tbody>
              </table>
            </div>
          ))
        )}
        {spese.length > 0 && (
          <div className="mt-6 flex justify-end">
            {/* <ExportPDFButton /> */}

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
                "Esporta in PDF"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
