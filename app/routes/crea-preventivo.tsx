// import { useState } from "react";
// import { Form, useNavigate, redirect } from "@remix-run/react";
// import { ActionFunction, json } from "@remix-run/node";
// import { createPreventivo } from "~/models/preventivo.server";
// import ButtonCustom from "~/components/buttons/ButtonCustom";
// import { Input } from "~/components/ui/input";
// import { Textarea } from "~/components/ui/textarea";
// import { preventivoSchema } from "~/validations/validationPreventivoSchema";
// import { Prisma } from "@prisma/client";
// import { Label } from "~/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";
// import { Toggle } from "~/components/ui/toggle";
// import { Switch } from "~/components/ui/switch";

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();

//   // Converti formData in un oggetto
//   const data: Record<string, any> = Object.fromEntries(formData.entries());
//   const isVatIncluded = data.isVatIncluded === "on";

//   // Parsing e validazione dei dati
//   const parsedData = preventivoSchema.safeParse({
//     ...data,
//     items: extractItems(formData),
//     isVatIncluded, // Aggiungi questo campo
//   });

//   if (!parsedData.success) {
//     return json(
//       { success: false, errors: parsedData.error.errors },
//       { status: 400 }
//     );
//   }

//   const validatedData = parsedData.data;

//   // Conversione delle date in oggetti Date o null
//   const issueDate = validatedData.issueDate
//     ? new Date(validatedData.issueDate)
//     : null;
//   const dueDate = validatedData.dueDate
//     ? new Date(validatedData.dueDate)
//     : null;

//   // Calcolo dei totali
//   let subtotal = 0;
//   let totalVat = 0;

//   validatedData.items.forEach((item: any) => {
//     const cost =
//       item.quantity && item.unitPrice ? item.quantity * item.unitPrice : 0;
//     subtotal += cost;
//   });

//   if (isVatIncluded) {
//     totalVat = subtotal * 0.22;
//   }

//   const total = subtotal + totalVat;

//   try {
//     const preventivo = await createPreventivo({
//       preventivoNumber: validatedData.preventivoNumber || "",
//       clientName: validatedData.clientName || "",
//       clientCognome: validatedData.clientCognome || "",
//       clientAddress: validatedData.clientAddress || "",
//       clientPhone: validatedData.clientPhone || "",
//       clientEmail: validatedData.clientEmail || "",
//       clientVat: validatedData.clientVat || "",
//       providerName: validatedData.providerName || "",
//       providerAddress: validatedData.providerAddress || "",
//       providerPhone: validatedData.providerPhone || "",
//       providerEmail: validatedData.providerEmail || "",
//       providerVat: validatedData.providerVat || "",
//       issueDate: issueDate,
//       dueDate: dueDate,
//       paymentTerms: validatedData.paymentTerms || "",
//       notes: validatedData.notes || "",
//       items: {
//         create: validatedData.items.map((item: any) => ({
//           description: item.description || "",
//           quantity: item.quantity || 0,
//           unitPrice: item.unitPrice || 0,
//           vatIncluded: true, // Sempre incluso IVA
//           category: item.category || "",
//         })),
//       },
//       subtotal: subtotal || 0,
//       totalVat: totalVat || 0,
//       total: total || 0,
//     });

//     return redirect("/preventivi"); // Redirect su successo
//   } catch (error) {
//     console.error("Errore durante la creazione del preventivo:", error);
//     return json(
//       {
//         success: false,
//         message: "Errore interno del server.",
//         error: (error as Error).message,
//       },
//       { status: 500 }
//     );
//   }
// };

// // Funzione per estrarre gli items dal formData
// function extractItems(formData: FormData) {
//   const items: any[] = [];
//   const itemIndices = new Set<number>();

//   formData.forEach((value, key) => {
//     const match = key.match(/^item-(\w+)-(\d+)$/);
//     if (match) {
//       itemIndices.add(Number(match[2]));
//     }
//   });

//   itemIndices.forEach((index) => {
//     const description = formData.get(`item-description-${index}`) as string;
//     const quantity = formData.get(`item-quantity-${index}`);
//     const unitPrice = formData.get(`item-unitPrice-${index}`);
//     const category = formData.get(`item-category-${index}`) as string;

//     items.push({
//       description: description || "",
//       quantity: quantity ? Number(quantity) : 0,
//       unitPrice: unitPrice ? Number(unitPrice) : 0,
//       vatIncluded: false, // Sempre incluso IVA
//       category: category || "",
//     });
//   });

//   return items;
// }

// export default function CreaPreventivo() {
//   const navigate = useNavigate();
//   const [itemCount, setItemCount] = useState(1);
//   const [isVatIncluded, setIsVatIncluded] = useState(false); // Aggiungi stato per IVA

//   // Aggiungi state per items
//   const [items, setItems] = useState([
//     {
//       description: "",
//       quantity: 0,
//       unitPrice: 0,
//       category: "",
//       vatIncluded: false,
//     },
//   ]);

//   const handleChange = (e: { target: { name: string; value: string } }) => {
//     const { name, value } = e.target;

//     if (name.startsWith("item-category-")) {
//       const index = Number(name.split("-")[2]);
//       setItems((prev) =>
//         prev.map((item, i) =>
//           i === index ? { ...item, category: value } : item
//         )
//       );
//     }
//   };
//   // Dati predefiniti del fornitore
//   const [providerData, setProviderData] = useState({
//     providerName: "Michele Trombone",
//     providerAddress: "Via Simone Martini 76, Napoli(NA), 80128",
//     providerPhone: "+39 328 4813626",
//     providerEmail: "michele.trombone95@gmail.com",
//     providerVat: "TRMMHL95L27F839E",
//     notes:
//       "Per procedere con l'inizio del lavoro, sarà necessario versare un acconto pari al 50% dell'importo totale indicato. Il saldo del restante 50% dovrà essere corrisposto al completamento del lavoro.",
//   });

//   const addItem = () => {
//     setItemCount((prev) => prev + 1);
//   };

//   const removeItem = () => {
//     if (itemCount > 1) setItemCount((prev) => prev - 1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">
//         Crea Nuovo Preventivo
//       </h1>
//       <Form method="post" className="bg-white p-6 rounded-lg shadow-lg">
//         {/* Informazioni del Cliente */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
//             Informazioni del Cliente
//           </h2>
//           <div className="h-px bg-gray-200 mb-4"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <Label className="block text-gray-700 mb-2" htmlFor="clientName">
//                 Nome Cliente
//               </Label>
//               <Input
//                 type="text"
//                 id="clientName"
//                 name="clientName"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label className="block text-gray-700 mb-2" htmlFor="clientName">
//                 Cognome Cliente
//               </Label>
//               <Input
//                 type="text"
//                 id="clientCognome"
//                 name="clientCognome"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="clientAddress"
//               >
//                 Indirizzo Cliente
//               </Label>
//               <Input
//                 type="text"
//                 id="clientAddress"
//                 name="clientAddress"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label className="block text-gray-700 mb-2" htmlFor="clientPhone">
//                 Telefono Cliente
//               </Label>
//               <Input
//                 type="text"
//                 id="clientPhone"
//                 name="clientPhone"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label className="block text-gray-700 mb-2" htmlFor="clientEmail">
//                 Email Cliente
//               </Label>
//               <Input
//                 type="email"
//                 id="clientEmail"
//                 name="clientEmail"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label className="block text-gray-700 mb-2" htmlFor="clientVat">
//                 Partita IVA / Codice Fiscale Cliente
//               </Label>
//               <Input
//                 type="text"
//                 id="clientVat"
//                 name="clientVat"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Informazioni del Fornitore */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
//             Informazioni del Fornitore
//           </h2>
//           <div className="h-px bg-gray-200 mb-4"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <Label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="providerName"
//               >
//                 Nome Fornitore
//               </Label>
//               <Input
//                 type="text"
//                 id="providerName"
//                 name="providerName"
//                 defaultValue={providerData.providerName}
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="providerAddress"
//               >
//                 Indirizzo Fornitore
//               </Label>
//               <Input
//                 type="text"
//                 id="providerAddress"
//                 name="providerAddress"
//                 defaultValue={providerData.providerAddress}
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="providerPhone"
//               >
//                 Telefono Fornitore
//               </Label>
//               <Input
//                 type="text"
//                 id="providerPhone"
//                 name="providerPhone"
//                 defaultValue={providerData.providerPhone}
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="providerEmail"
//               >
//                 Email Fornitore
//               </Label>
//               <Input
//                 type="email"
//                 id="providerEmail"
//                 name="providerEmail"
//                 defaultValue={providerData.providerEmail}
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label className="block text-gray-700 mb-2" htmlFor="providerVat">
//                 Partita IVA Fornitore
//               </Label>
//               <Input
//                 type="text"
//                 id="providerVat"
//                 name="providerVat"
//                 defaultValue={providerData.providerVat}
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Dettagli del Preventivo */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
//             Dettagli del Preventivo
//           </h2>
//           <div className="h-px bg-gray-200 mb-4"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <Label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="preventivoNumber"
//               >
//                 Numero Preventivo
//               </Label>
//               <Input
//                 type="text"
//                 id="preventivoNumber"
//                 name="preventivoNumber"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label className="block text-gray-700 mb-2" htmlFor="issueDate">
//                 Data di Emissione
//               </Label>
//               <Input
//                 type="date"
//                 id="issueDate"
//                 name="issueDate"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label className="block text-gray-700 mb-2" htmlFor="dueDate">
//                 Data di Scadenza
//               </Label>
//               <Input
//                 type="date"
//                 id="dueDate"
//                 name="dueDate"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//             <div>
//               <Label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="paymentTerms"
//               >
//                 Termini di Pagamento
//               </Label>
//               <Input
//                 type="text"
//                 id="paymentTerms"
//                 name="paymentTerms"
//                 placeholder="Es. 30 giorni dalla data di emissione"
//                 className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Note Aggiuntive */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
//             Note Aggiuntive
//           </h2>
//           <div className="h-px bg-gray-200 mb-4"></div>
//           <Textarea
//             id="notes"
//             name="notes"
//             defaultValue={providerData.notes}
//             rows={4}
//             className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//             placeholder="Aggiungi eventuali note o condizioni particolari"
//           ></Textarea>
//         </div>

//         {/* Elenco delle Spese */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
//             Elenco delle Spese
//           </h2>
//           <div className="h-px bg-gray-200 mb-4"></div>
//           {[...Array(itemCount)].map((_, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4"
//             >
//               <div className="col-span-2">
//                 <Label
//                   className="block text-gray-700 mb-2"
//                   htmlFor={`item-description-${index}`}
//                 >
//                   Descrizione
//                 </Label>
//                 <Input
//                   type="text"
//                   id={`item-description-${index}`}
//                   name={`item-description-${index}`}
//                   className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//                 />
//               </div>
//               <div>
//                 <Label
//                   className="block text-gray-700 mb-2"
//                   htmlFor={`item-quantity-${index}`}
//                 >
//                   Quantità
//                 </Label>
//                 <Input
//                   type="number"
//                   id={`item-quantity-${index}`}
//                   name={`item-quantity-${index}`}
//                   min="0"
//                   className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//                 />
//               </div>
//               <div>
//                 <Label
//                   className="block text-gray-700 mb-2"
//                   htmlFor={`item-unitPrice-${index}`}
//                 >
//                   Prezzo Unitario (€)
//                 </Label>
//                 <Input
//                   type="number"
//                   id={`item-unitPrice-${index}`}
//                   name={`item-unitPrice-${index}`}
//                   step="0.01"
//                   min="0"
//                   className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
//                 />
//               </div>
//               <div>
//                 <Label
//                   className="block text-gray-700 mb-2"
//                   htmlFor={`item-category-${index}`}
//                 >
//                   Categoria
//                 </Label>
//                 <Select
//                   name={`item-category-${index}`}
//                   onValueChange={(value) =>
//                     handleChange({
//                       target: {
//                         name: `item-category-${index}`,
//                         value,
//                       },
//                     })
//                   }
//                 >
//                   <SelectTrigger className="w-full text-[#111f43]">
//                     <SelectValue placeholder="Seleziona una categoria" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[
//                       "Costi di Sviluppo",
//                       "Costi di Marketing",
//                       "Costi per la Brand Identity",
//                       "Costi Operativi",
//                       "Costi Legali e Amministrativi",
//                       "Costi di Personale",
//                       "Costi di Logistica",
//                       "Costi Tecnologici e Strumenti",
//                       "Costi per il Lancio",
//                       "Costi di Scalabilità",
//                       "Contingenze",
//                     ].map((category, idx) => (
//                       <SelectItem key={idx} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           ))}

//           {/* Pulsanti per aggiungere o rimuovere spese */}
//           <div className="flex space-x-4 mb-6">
//             <ButtonCustom type="button" onClick={addItem}>
//               Aggiungi Spesa
//             </ButtonCustom>
//             <ButtonCustom
//               type="button"
//               onClick={removeItem}
//               disabled={itemCount === 1}
//             >
//               Rimuovi Spesa
//             </ButtonCustom>
//           </div>
//         </div>

//         {/* Pulsanti Invia e Annulla */}
//         <div className="flex justify-end space-x-4">
//           <ButtonCustom type="submit">Salva Preventivo</ButtonCustom>
//           <ButtonCustom type="button" onClick={() => navigate(-1)}>
//             Annulla
//           </ButtonCustom>
//         </div>
//         {/* Toggle per IVA */}
//         <div className="mb-4 flex items-center">
//           <Switch
//             id="vat-toggle"
//             name="isVatIncluded"
//             checked={isVatIncluded}
//             onCheckedChange={(checked) => setIsVatIncluded(checked)}
//             className="mr-2"
//           />
//           <Label htmlFor="vat-toggle" className="text-gray-700">
//             Il prezzo totale è compreso d'IVA
//           </Label>
//         </div>
//       </Form>
//     </div>
//   );
// }

import { useState } from "react";
import { Form, useNavigate, useActionData } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { createPreventivo } from "~/models/preventivo.server";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { preventivoSchema } from "~/validations/validationPreventivoSchema";
import { Prisma } from "@prisma/client";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";

// Tipizzazione per ActionData
type ActionData = {
  success: boolean;
  errors: {
    path: (string | number)[];
    message: string;
  }[];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Converti formData in un oggetto
  const data: Record<string, any> = Object.fromEntries(formData.entries());
  const isVatIncluded = data.isVatIncluded === "on";

  // Parsing e validazione dei dati
  const parsedData = preventivoSchema.safeParse({
    ...data,
    items: extractItems(formData),
    isVatIncluded, // Aggiungi questo campo
  });

  if (!parsedData.success) {
    return json<ActionData>(
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

  if (isVatIncluded) {
    totalVat = subtotal * 0.22;
  }

  const total = subtotal + totalVat;

  try {
    const preventivo = await createPreventivo({
      preventivoNumber: validatedData.preventivoNumber || "",
      clientName: validatedData.clientName || "",
      clientCognome: validatedData.clientCognome || "",
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
    return json<ActionData>(
      {
        success: false,
        errors: [
          {
            path: ["form"],
            message: "Errore interno del server.",
          },
        ],
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
      vatIncluded: false, // Sempre incluso IVA
      category: category || "",
    });
  });

  return items;
}

export default function CreaPreventivo() {
  const navigate = useNavigate();
  const actionData = useActionData<ActionData>();
  const [itemCount, setItemCount] = useState(1);
  const [isVatIncluded, setIsVatIncluded] = useState(false); // Aggiungi stato per IVA

  // Aggiungi state per items
  const [items, setItems] = useState([
    {
      description: "",
      quantity: 0,
      unitPrice: 0,
      category: "",
      vatIncluded: false,
    },
  ]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    if (name.startsWith("item-category-")) {
      const index = Number(name.split("-")[2]);
      setItems((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, category: value } : item
        )
      );
    }
  };

  // Dati predefiniti del fornitore
  const [providerData, setProviderData] = useState({
    providerName: "Michele Trombone",
    providerAddress: "Via Simone Martini 76, Napoli(NA), 80128",
    providerPhone: "+39 328 4813626",
    providerEmail: "michele.trombone95@gmail.com",
    providerVat: "TRMMHL95L27F839E",
    notes:
      "Per procedere con l'inizio del lavoro, sarà necessario versare un acconto pari al 50% dell'importo totale indicato. Il saldo del restante 50% dovrà essere corrisposto al completamento del lavoro.",
  });

  const addItem = () => {
    setItemCount((prev) => prev + 1);
    setItems((prev) => [
      ...prev,
      {
        description: "",
        quantity: 0,
        unitPrice: 0,
        category: "",
        vatIncluded: false,
      },
    ]);
  };

  const removeItem = () => {
    if (itemCount > 1) {
      setItemCount((prev) => prev - 1);
      setItems((prev) => prev.slice(0, prev.length - 1));
    }
  };

  // Funzione helper per ottenere il messaggio di errore per un campo
  const getErrorMessage = (path: (string | number)[]) => {
    if (!actionData?.errors) return null;
    const error = actionData.errors.find(
      (err) =>
        err.path.length === path.length &&
        err.path.every((value, index) => value === path[index])
    );
    return error?.message;
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
              <Label className="block text-gray-700 mb-2" htmlFor="clientName">
                Nome Cliente*
              </Label>
              <Input
                type="text"
                id="clientName"
                name="clientName"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["clientName"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["clientName"])}
                </p>
              )}
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="clientCognome"
              >
                Cognome Cliente*
              </Label>
              <Input
                type="text"
                id="clientCognome"
                name="clientCognome"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["clientCognome"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["clientCognome"])}
                </p>
              )}
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="clientAddress"
              >
                Indirizzo Cliente
              </Label>
              <Input
                type="text"
                id="clientAddress"
                name="clientAddress"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["clientAddress"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["clientAddress"])}
                </p>
              )}
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="clientPhone">
                Telefono Cliente*
              </Label>
              <Input
                type="text"
                id="clientPhone"
                name="clientPhone"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["clientPhone"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["clientPhone"])}
                </p>
              )}
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="clientEmail">
                Email Cliente*
              </Label>
              <Input
                type="email"
                id="clientEmail"
                name="clientEmail"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["clientEmail"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["clientEmail"])}
                </p>
              )}
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="clientVat">
                Partita IVA / Codice Fiscale Cliente
              </Label>
              <Input
                type="text"
                id="clientVat"
                name="clientVat"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["clientVat"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["clientVat"])}
                </p>
              )}
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
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="providerName"
              >
                Nome Fornitore
              </Label>
              <Input
                type="text"
                id="providerName"
                name="providerName"
                defaultValue={providerData.providerName}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["providerName"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["providerName"])}
                </p>
              )}
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="providerAddress"
              >
                Indirizzo Fornitore
              </Label>
              <Input
                type="text"
                id="providerAddress"
                name="providerAddress"
                defaultValue={providerData.providerAddress}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["providerAddress"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["providerAddress"])}
                </p>
              )}
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="providerPhone"
              >
                Telefono Fornitore
              </Label>
              <Input
                type="text"
                id="providerPhone"
                name="providerPhone"
                defaultValue={providerData.providerPhone}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["providerPhone"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["providerPhone"])}
                </p>
              )}
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="providerEmail"
              >
                Email Fornitore
              </Label>
              <Input
                type="email"
                id="providerEmail"
                name="providerEmail"
                defaultValue={providerData.providerEmail}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["providerEmail"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["providerEmail"])}
                </p>
              )}
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="providerVat">
                Partita IVA Fornitore
              </Label>
              <Input
                type="text"
                id="providerVat"
                name="providerVat"
                defaultValue={providerData.providerVat}
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["providerVat"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["providerVat"])}
                </p>
              )}
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
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="preventivoNumber"
              >
                Numero Preventivo*
              </Label>
              <Input
                type="text"
                id="preventivoNumber"
                name="preventivoNumber"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["preventivoNumber"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["preventivoNumber"])}
                </p>
              )}
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="issueDate">
                Data di Emissione*
              </Label>
              <Input
                type="date"
                id="issueDate"
                name="issueDate"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["issueDate"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["issueDate"])}
                </p>
              )}
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="dueDate">
                Data di Scadenza*
              </Label>
              <Input
                type="date"
                id="dueDate"
                name="dueDate"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["dueDate"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["dueDate"])}
                </p>
              )}
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="paymentTerms"
              >
                Termini di Pagamento*
              </Label>
              <Input
                type="text"
                id="paymentTerms"
                name="paymentTerms"
                placeholder="Es. 30 giorni dalla data di emissione"
                className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
              />
              {getErrorMessage(["paymentTerms"]) && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(["paymentTerms"])}
                </p>
              )}
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
            defaultValue={providerData.notes}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
            placeholder="Aggiungi eventuali note o condizioni particolari"
          ></Textarea>
          {getErrorMessage(["notes"]) && (
            <p className="text-red-500 text-sm">{getErrorMessage(["notes"])}</p>
          )}
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
                <Label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-description-${index}`}
                >
                  Descrizione*
                </Label>
                <Input
                  type="text"
                  id={`item-description-${index}`}
                  name={`item-description-${index}`}
                  className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
                />
                {getErrorMessage(["items", index, "description"]) && (
                  <p className="text-red-500 text-sm">
                    {getErrorMessage(["items", index, "description"])}
                  </p>
                )}
              </div>
              <div>
                <Label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-quantity-${index}`}
                >
                  Quantità*
                </Label>
                <Input
                  type="number"
                  id={`item-quantity-${index}`}
                  name={`item-quantity-${index}`}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
                />
                {getErrorMessage(["items", index, "quantity"]) && (
                  <p className="text-red-500 text-sm">
                    {getErrorMessage(["items", index, "quantity"])}
                  </p>
                )}
              </div>
              <div>
                <Label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-unitPrice-${index}`}
                >
                  Prezzo Unitario*
                </Label>
                <Input
                  type="number"
                  id={`item-unitPrice-${index}`}
                  name={`item-unitPrice-${index}`}
                  step="0.01"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-black"
                />
                {getErrorMessage(["items", index, "unitPrice"]) && (
                  <p className="text-red-500 text-sm">
                    {getErrorMessage(["items", index, "unitPrice"])}
                  </p>
                )}
              </div>
              <div>
                <Label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-category-${index}`}
                >
                  Categoria*
                </Label>
                <Select
                  name={`item-category-${index}`}
                  onValueChange={(value) =>
                    handleChange({
                      target: {
                        name: `item-category-${index}`,
                        value,
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-full text-[#111f43]">
                    <SelectValue placeholder="Seleziona una categoria" />
                  </SelectTrigger>
                  <SelectContent>
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
                      <SelectItem key={idx} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getErrorMessage(["items", index, "category"]) && (
                  <p className="text-red-500 text-sm">
                    {getErrorMessage(["items", index, "category"])}
                  </p>
                )}
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

        {/* Toggle per IVA */}
        <div className="mb-4 flex items-center">
          <Switch
            id="vat-toggle"
            name="isVatIncluded"
            checked={isVatIncluded}
            onCheckedChange={(checked) => setIsVatIncluded(checked)}
            className="mr-2"
          />
          <Label htmlFor="vat-toggle" className="text-gray-700">
            Il prezzo totale è compreso d'IVA
          </Label>
          {getErrorMessage(["isVatIncluded"]) && (
            <p className="text-red-500 text-sm">
              {getErrorMessage(["isVatIncluded"])}
            </p>
          )}
        </div>

        {/* Errore Generale del Form */}
        {getErrorMessage(["form"]) && (
          <p className="text-red-500 text-sm mb-4">
            {getErrorMessage(["form"])}
          </p>
        )}
      </Form>
    </div>
  );
}
