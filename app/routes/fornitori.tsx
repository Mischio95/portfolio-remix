import { useLoaderData, Form, redirect } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  getFornitori,
  addFornitore,
  deleteFornitore,
} from "~/models/fornitori.server";
import { Fornitori } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type LoaderData = {
  fornitori: Fornitori[];
};

export const loader = async () => {
  try {
    const fornitori = await getFornitori();
    console.log("Fornitori caricati:", fornitori); // Debug
    return { fornitori };
  } catch (error) {
    console.error("Errore nel loader:", error); // Debug
    throw new Response("Errore nel caricamento dei fornitori", { status: 500 });
  }
};

const fornitoriSchema = z.object({
  nome: z.string().min(1, "Nome è richiesto"),
  sitoWeb: z.string().url("Deve essere un URL valido").optional(),
  telefono: z.string().optional(),
  email: z.string().email("Deve essere un'email valida").optional(),
});
type FornitoreFormData = z.infer<typeof fornitoriSchema>;

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const data = Object.fromEntries(form.entries());

  console.log("Dati ricevuti nel form:", data); // Debug

  const result = fornitoriSchema.safeParse(data);
  if (!result.success) {
    console.log("Errori di validazione:", result.error.flatten()); // Debug
    return { errors: result.error.flatten() };
  }

  try {
    const nuovoFornitore = await addFornitore(result.data);
    console.log("Fornitore aggiunto:", nuovoFornitore); // Debug
    return redirect("/fornitori");
  } catch (error) {
    console.error("Errore nell'aggiunta del fornitore:", error); // Debug
    return { errors: { form: "Errore nell'aggiunta del fornitore" } };
  }
};

export default function FornitoriPage() {
  const data = useLoaderData<LoaderData>();
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<FornitoreFormData>({
    resolver: zodResolver(fornitoriSchema),
  });

  // RIMUOVI QUESTO HANDLER
  /* const onSubmit = (data: FornitoreFormData) => {
    // Submit handled by Remix's <Form>
    reset();
  }; */

  console.log("Fornitori ricevuti nel componente:", data.fornitori); // Debug

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Gestione Fornitori
      </h1>

      {/* Form Aggiungi Fornitore */}
      <Form
        method="post"
        // RIMUOVI ONSUBMIT
        /* onSubmit={handleSubmit(onSubmit)} */
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div>
            <Label htmlFor="nome" className="block text-gray-700 mb-2">
              Nome
            </Label>
            <Input
              id="nome"
              {...register("nome")}
              className={`w-full p-2 border ${
                errors.nome ? "border-red-500" : "border-gray-300"
              } rounded-md text-black`} // Assicurati che `text-black` sia presente
              placeholder="Nome del fornitore"
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
            )}
          </div>

          {/* Sito Web */}
          <div>
            <Label htmlFor="sitoWeb" className="block text-gray-700 mb-2">
              Sito Web
            </Label>
            <Input
              id="sitoWeb"
              {...register("sitoWeb")}
              className={`w-full p-2 border ${
                errors.sitoWeb ? "border-red-500" : "border-gray-300"
              } rounded-md  text-black`} // Assicurati che `text-black` sia presente
              placeholder="https://www.esempio.com"
            />
            {errors.sitoWeb && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sitoWeb.message}
              </p>
            )}
          </div>

          {/* Telefono */}
          <div>
            <Label htmlFor="telefono" className="block text-gray-700 mb-2">
              Telefono
            </Label>
            <Input
              id="telefono"
              {...register("telefono")}
              className={`w-full p-2 border ${
                errors.telefono ? "border-red-500" : "border-gray-300"
              } rounded-md  text-black`} // Assicurati che `text-black` sia presente
              placeholder="+39 333 3333 333"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm mt-1">
                {errors.telefono.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md  text-black`} // Assicurati che `text-black` sia presente
              placeholder="email@esempio.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Pulsante di invio */}
        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Aggiungi Fornitore
          </Button>
        </div>
      </Form>

      {/* Lista dei Fornitori */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Elenco Fornitori
        </h2>
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sito Web
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefono
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {data.fornitori.length > 0 ? (
              data.fornitori.map((fornitore) => (
                <TableRow key={fornitore.id} className="hover:bg-gray-100">
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {fornitore.nome}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-blue-600">
                    {fornitore.sitoWeb ? (
                      <a
                        href={fornitore.sitoWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {fornitore.sitoWeb}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {fornitore.telefono || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {fornitore.email || "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-center">
                    <Form
                      method="post"
                      action={`/fornitori/delete/${fornitore.id}`}
                    >
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-800"
                        onClick={(e) => {
                          if (
                            !confirm(
                              "Sei sicuro di voler eliminare questo fornitore?"
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
                  colSpan={5}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  Nessun fornitore trovato.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
