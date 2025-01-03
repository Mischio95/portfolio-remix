import { useState } from "react";
import { Form, useNavigate, redirect } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { createPreventivo } from "~/models/preventivo.server";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { preventivoSchema } from "~/validations/validationPreventivoSchema";
import { Prisma } from "@prisma/client";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Converti formData in un oggetto
  const data: Record<string, any> = Object.fromEntries(formData.entries());

  // Parsing e validazione dei dati
  const parsedData = preventivoSchema.safeParse({
    ...data,
    items: extractItems(formData),
  });

  if (!parsedData.success) {
    return json(
      { success: false, errors: parsedData.error.errors },
      { status: 400 }
    );
  }

  const validatedData = parsedData.data;

  // Conversione delle date in oggetti Date o null
  const issueDate = validatedData.issueDate
    ? new Date(validatedData.issueDate)
    : null;
  const dueDate = validatedData.dueDate
    ? new Date(validatedData.dueDate)
    : null;

  // Calcolo dei totali
  let subtotal = 0;
  let totalVat = 0;

  validatedData.items.forEach((item: any) => {
    const cost =
      item.quantity && item.unitPrice ? item.quantity * item.unitPrice : 0;
    subtotal += cost;
  });

  const total = subtotal + totalVat;

  try {
    const preventivo = await createPreventivo({
      preventivoNumber: validatedData.preventivoNumber || "",
      clientName: validatedData.clientName || "",
      clientAddress: validatedData.clientAddress || "",
      clientPhone: validatedData.clientPhone || "",
      clientEmail: validatedData.clientEmail || "",
      clientVat: validatedData.clientVat || "",
      providerName: validatedData.providerName || "",
      providerAddress: validatedData.providerAddress || "",
      providerPhone: validatedData.providerPhone || "",
      providerEmail: validatedData.providerEmail || "",
      providerVat: validatedData.providerVat || "",
      issueDate: issueDate,
      dueDate: dueDate,
      paymentTerms: validatedData.paymentTerms || "",
      notes: validatedData.notes || "",
      items: {
        create: validatedData.items.map((item: any) => ({
          description: item.description || "",
          quantity: item.quantity || 0,
          unitPrice: item.unitPrice || 0,
          vatIncluded: true, // Sempre incluso IVA
          category: item.category || "",
        })),
      },
      subtotal: subtotal || 0,
      totalVat: totalVat || 0,
      total: total || 0,
    });

    return redirect("/preventivi"); // Redirect su successo
  } catch (error) {
    console.error("Errore durante la creazione del preventivo:", error);
    return json(
      {
        success: false,
        message: "Errore interno del server.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};

// Funzione per estrarre gli items dal formData
function extractItems(formData: FormData) {
  const items: any[] = [];
  const itemIndices = new Set<number>();

  formData.forEach((value, key) => {
    const match = key.match(/^item-(\w+)-(\d+)$/);
    if (match) {
      itemIndices.add(Number(match[2]));
    }
  });

  itemIndices.forEach((index) => {
    const description = formData.get(`item-description-${index}`) as string;
    const quantity = formData.get(`item-quantity-${index}`);
    const unitPrice = formData.get(`item-unitPrice-${index}`);
    const category = formData.get(`item-category-${index}`) as string;

    items.push({
      description: description || "",
      quantity: quantity ? Number(quantity) : 0,
      unitPrice: unitPrice ? Number(unitPrice) : 0,
      vatIncluded: true, // Sempre incluso IVA
      category: category || "",
    });
  });

  return items;
}

export default function CreaPreventivo() {
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState(1);

  // Dati predefiniti del fornitore
  const [providerData, setProviderData] = useState({
    providerName: "Michele Trombone",
    providerAddress: "Via Simone Martini 76, Napoli(NA), 80128",
    providerPhone: "+39 328 4813626",
    providerEmail: "michele.trombone95@gmail.com",
    providerVat: "TRMMHL95L27F839E",
  });

  const addItem = () => {
    setItemCount((prev) => prev + 1);
  };

  const removeItem = () => {
    if (itemCount > 1) setItemCount((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Crea Nuovo Preventivo
      </h1>
      <Form method="post" className="bg-white p-6 rounded-lg shadow-lg">
        {/* Informazioni del Cliente */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
            Informazioni del Cliente
          </h2>
          <div className="h-px bg-gray-200 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="clientName">
                Nome Cliente
              </label>
              <Input
                type="text"
                id="clientName"
                name="clientName"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="clientAddress"
              >
                Indirizzo Cliente
              </label>
              <Input
                type="text"
                id="clientAddress"
                name="clientAddress"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="clientPhone">
                Telefono Cliente
              </label>
              <Input
                type="text"
                id="clientPhone"
                name="clientPhone"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="clientEmail">
                Email Cliente
              </label>
              <Input
                type="email"
                id="clientEmail"
                name="clientEmail"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="clientVat">
                Partita IVA / Codice Fiscale Cliente
              </label>
              <Input
                type="text"
                id="clientVat"
                name="clientVat"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
          </div>
        </div>

        {/* Informazioni del Fornitore */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
            Informazioni del Fornitore
          </h2>
          <div className="h-px bg-gray-200 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="providerName"
              >
                Nome Fornitore
              </label>
              <Input
                type="text"
                id="providerName"
                name="providerName"
                defaultValue={providerData.providerName}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="providerAddress"
              >
                Indirizzo Fornitore
              </label>
              <Input
                type="text"
                id="providerAddress"
                name="providerAddress"
                defaultValue={providerData.providerAddress}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="providerPhone"
              >
                Telefono Fornitore
              </label>
              <Input
                type="text"
                id="providerPhone"
                name="providerPhone"
                defaultValue={providerData.providerPhone}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="providerEmail"
              >
                Email Fornitore
              </label>
              <Input
                type="email"
                id="providerEmail"
                name="providerEmail"
                defaultValue={providerData.providerEmail}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="providerVat">
                Partita IVA Fornitore
              </label>
              <Input
                type="text"
                id="providerVat"
                name="providerVat"
                defaultValue={providerData.providerVat}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
          </div>
        </div>

        {/* Dettagli del Preventivo */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
            Dettagli del Preventivo
          </h2>
          <div className="h-px bg-gray-200 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="preventivoNumber"
              >
                Numero Preventivo
              </label>
              <Input
                type="text"
                id="preventivoNumber"
                name="preventivoNumber"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="issueDate">
                Data di Emissione
              </label>
              <Input
                type="date"
                id="issueDate"
                name="issueDate"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="dueDate">
                Data di Scadenza
              </label>
              <Input
                type="date"
                id="dueDate"
                name="dueDate"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="paymentTerms"
              >
                Termini di Pagamento
              </label>
              <Input
                type="text"
                id="paymentTerms"
                name="paymentTerms"
                placeholder="Es. 30 giorni dalla data di emissione"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
            </div>
          </div>
        </div>

        {/* Note Aggiuntive */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
            Note Aggiuntive
          </h2>
          <div className="h-px bg-gray-200 mb-4"></div>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
            placeholder="Aggiungi eventuali note o condizioni particolari"
          ></Textarea>
        </div>

        {/* Elenco delle Spese */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
            Elenco delle Spese
          </h2>
          <div className="h-px bg-gray-200 mb-4"></div>
          {[...Array(itemCount)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4"
            >
              <div className="col-span-2">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-description-${index}`}
                >
                  Descrizione
                </label>
                <Input
                  type="text"
                  id={`item-description-${index}`}
                  name={`item-description-${index}`}
                  className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-quantity-${index}`}
                >
                  Quantità
                </label>
                <Input
                  type="number"
                  id={`item-quantity-${index}`}
                  name={`item-quantity-${index}`}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-unitPrice-${index}`}
                >
                  Prezzo Unitario (€)
                </label>
                <Input
                  type="number"
                  id={`item-unitPrice-${index}`}
                  name={`item-unitPrice-${index}`}
                  step="0.01"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-category-${index}`}
                >
                  Categoria
                </label>
                <select
                  id={`item-category-${index}`}
                  name={`item-category-${index}`}
                  className="w-full p-2 border border-gray-300 rounded-md text-black bg-white"
                >
                  <option value="">Seleziona una categoria</option>
                  {[
                    "Costi di Sviluppo",
                    "Costi di Marketing",
                    "Costi per la Brand Identity",
                    "Costi Operativi",
                    "Costi Legali e Amministrativi",
                    "Costi di Personale",
                    "Costi di Logistica",
                    "Costi Tecnologici e Strumenti",
                    "Costi per il Lancio",
                    "Costi di Scalabilità",
                    "Contingenze",
                  ].map((category, idx) => (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Pulsanti per aggiungere o rimuovere spese */}
          <div className="flex space-x-4 mb-6">
            <ButtonCustom type="button" onClick={addItem}>
              Aggiungi Spesa
            </ButtonCustom>
            <ButtonCustom
              type="button"
              onClick={removeItem}
              disabled={itemCount === 1}
            >
              Rimuovi Spesa
            </ButtonCustom>
          </div>
        </div>

        {/* Pulsanti Invia e Annulla */}
        <div className="flex justify-end space-x-4">
          <ButtonCustom type="submit">Salva Preventivo</ButtonCustom>
          <ButtonCustom type="button" onClick={() => navigate(-1)}>
            Annulla
          </ButtonCustom>
        </div>
      </Form>
    </div>
  );
}
