import { useLoaderData, Form, redirect } from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import {
  getCompetitori,
  addCompetitore,
  deleteCompetitore,
} from "~/models/competitor.server";
import pkg from "file-saver";
import { Competitor } from "@prisma/client";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
const { saveAs } = pkg;

type LoaderData = {
  competitor: Competitor[];
};

// Funzione per esportare i dati in CSV
function exportcompetitor(competitor: Competitor[]) {
  const csvHeader = "ID,Nome Azienda,Sito Web,Descrizione Prodotti Venduti\n";
  const csvRows = competitor
    .map(
      (competitore) =>
        `${competitore.id},"${competitore.nomeAzienda}","${
          competitore.sitoWeb
        }","${competitore.descrizioneProdottiVenduti ?? ""}"`
    )
    .join("\n");
  const csvData = new Blob([csvHeader + csvRows], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(csvData, "competitor.csv");
}

export const loader: LoaderFunction = async () => {
  try {
    const competitor = await getCompetitori();
    console.log("competitor caricati:", competitor); // Debug
    return { competitor };
  } catch (error) {
    console.error("Errore nel loader:", error); // Debug
    throw new Response("Errore nel caricamento dei competitor", {
      status: 500,
    });
  }
};

const competitorSchema = z.object({
  nomeAzienda: z.string().min(1, "Nome Azienda è richiesto"),
  sitoWeb: z.string().url("Deve essere un URL valido"),
  descrizioneProdottiVenduti: z.string().optional(),
});

type CompetitorFormData = z.infer<typeof competitorSchema>;

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const intent = form.get("intent");
  const id = form.get("id");

  if (intent === "delete" && id) {
    try {
      await deleteCompetitore(Number(id));
      return redirect("/lista-competitor");
    } catch (error) {
      console.error("Errore nell'eliminazione del competitor:", error);
      return { errors: { form: "Errore nell'eliminazione del competitor" } };
    }
  }

  const data = Object.fromEntries(form.entries());

  console.log("Dati ricevuti nel form:", data); // Debug

  const result = competitorSchema.safeParse(data);
  if (!result.success) {
    console.log("Errori di validazione:", result.error.flatten()); // Debug
    return { errors: result.error.flatten() };
  }

  try {
    const nuovoCompetitore = await addCompetitore(result.data);
    console.log("Competitore aggiunto:", nuovoCompetitore); // Debug
    return redirect("/lista-competitor");
  } catch (error) {
    console.error("Errore nell'aggiunta del competitor:", error);
    return { errors: { form: "Errore nell'aggiunta del competitor" } };
  }
};

export default function ListaCompetitorPage() {
  const data = useLoaderData<LoaderData>();
  const { competitor } = useLoaderData<LoaderData>();
  if (!competitor) {
    throw new Error("Dati dei competitor non trovati");
  }
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<CompetitorFormData>({
    resolver: zodResolver(competitorSchema),
  });

  console.log("competitor ricevuti nel componente:", data.competitor); // Debug

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Gestione competitor
      </h1>

      {/* Form Aggiungi Competitor */}
      <Form method="post" className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome Azienda */}
          <div>
            <Label
              htmlFor="nomeAzienda"
              className="block text-gray-700 mb-2 bg-white"
            >
              Nome Azienda
            </Label>
            <Input
              id="nomeAzienda"
              {...register("nomeAzienda")}
              className={`w-full p-2 border ${
                errors.nomeAzienda ? "border-red-500" : "border-gray-300"
              } rounded-md text-black`}
              placeholder="Nome dell'azienda"
            />
            {errors.nomeAzienda && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nomeAzienda.message}
              </p>
            )}
          </div>

          {/* Sito Web */}
          <div>
            <Label
              htmlFor="sitoWeb"
              className="block text-gray-700 mb-2 bg-white"
            >
              Sito Web
            </Label>
            <Input
              id="sitoWeb"
              {...register("sitoWeb")}
              className={`w-full p-2 border ${
                errors.sitoWeb ? "border-red-500" : "border-gray-300"
              } rounded-md text-black`}
              placeholder="https://www.esempio.com"
            />
            {errors.sitoWeb && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sitoWeb.message}
              </p>
            )}
          </div>

          {/* Descrizione Prodotti Venduti */}
          <div>
            <Label
              htmlFor="descrizioneProdottiVenduti"
              className="block text-gray-700 mb-2 bg-white"
            >
              Descrizione Prodotti Venduti
            </Label>
            <Input
              id="descrizioneProdottiVenduti"
              {...register("descrizioneProdottiVenduti")}
              className={`w-full p-2 border ${
                errors.descrizioneProdottiVenduti
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md text-black`}
              placeholder="Descrizione dei prodotti venduti"
            />
            {errors.descrizioneProdottiVenduti && (
              <p className="text-red-500 text-sm mt-1">
                {errors.descrizioneProdottiVenduti.message}
              </p>
            )}
          </div>
        </div>
        {/* Pulsanti di azione */}
        <div className="flex space-x-4 mt-6">
          <ButtonCustom type="submit">Aggiungi Competitor</ButtonCustom>
          <ButtonCustom
            type="button"
            onClick={() => exportcompetitor(competitor)}
            disabled={competitor.length === 0}
          >
            Esporta CSV
          </ButtonCustom>
        </div>
      </Form>

      {/* Lista dei competitor */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Elenco competitor
        </h2>
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome Azienda
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sito Web
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrizione Prodotti Venduti
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {competitor.length > 0 ? (
              competitor.map((competitore) => (
                <TableRow key={competitore.id} className="hover:bg-gray-100">
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {competitore.nomeAzienda}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-[#111f43]">
                    <a
                      href={competitore.sitoWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {competitore.sitoWeb}
                    </a>
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {competitore.descrizioneProdottiVenduti || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-center">
                    <Form method="post">
                      <input type="hidden" name="id" value={competitore.id} />
                      <input type="hidden" name="intent" value="delete" />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          if (
                            !confirm(
                              "Sei sicuro di voler eliminare questo competitor?"
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Elimina
                      </button>
                    </Form>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  Nessun competitor trovato.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
