import React, { useState } from "react";
import { useNavigate, useParams, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getPreventivoById } from "~/models/preventivo.server";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";

type LoaderData = {
  preventivo: any;
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

export default function ModificaPreventivo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { preventivo } = useLoaderData<LoaderData>();
  const [formData, setFormData] = useState(preventivo);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("item-")) {
      const [_, field, index] = name.split("-");
      setFormData((prev: { items: any[] }) => ({
        ...prev,
        items: prev.items.map((item: any, i: number) =>
          i === Number(index) ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const response = await fetch(`/api/update-preventivo/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate(`/preventivo/${id}`);
      } else {
        console.error("Errore nel salvataggio");
      }
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const addItem = () => {
    setFormData((prev: { items: any }) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          quantity: 0,
          unitPrice: 0,
          category: "",
          vatIncluded: true,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev: { items: any[] }) => ({
      ...prev,
      items: prev.items.filter((_: any, i: number) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Modifica Preventivo
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
        encType="multipart/form-data"
      >
        {/* Informazioni del Cliente */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
            Informazioni del Cliente
          </h2>
          <div className="h-px bg-gray-200 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="clientName">
                Nome Cliente
              </Label>
              <Input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="clientCognome"
              >
                Cognome Cliente
              </Label>
              <Input
                type="text"
                id="clientCognome"
                name="clientCognome"
                value={formData.clientCognome}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
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
                value={formData.clientAddress}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="clientPhone">
                Telefono Cliente
              </Label>
              <Input
                type="tel"
                id="clientPhone"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="clientEmail">
                Email Cliente
              </Label>
              <Input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="clientVat">
                Partita IVA / Codice Fiscale Cliente
              </Label>
              <Input
                type="text"
                id="clientVat"
                name="clientVat"
                value={formData.clientVat}
                onChange={handleChange}
                required
                className="text-[#111f43]"
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
                value={formData.providerName}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
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
                value={formData.providerAddress}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="providerPhone"
              >
                Telefono Fornitore
              </Label>
              <Input
                type="tel"
                id="providerPhone"
                name="providerPhone"
                value={formData.providerPhone}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
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
                value={formData.providerEmail}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="providerVat">
                Partita IVA / Codice Fiscale Fornitore
              </Label>
              <Input
                type="text"
                id="providerVat"
                name="providerVat"
                value={formData.providerVat}
                onChange={handleChange}
                required
                className="text-[#111f43]"
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
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="preventivoNumber"
              >
                Numero Preventivo
              </Label>
              <Input
                type="text"
                id="preventivoNumber"
                name="preventivoNumber"
                value={formData.preventivoNumber}
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="issueDate">
                Data di Emissione
              </Label>
              <Input
                type="date"
                id="issueDate"
                name="issueDate"
                value={
                  formData.issueDate
                    ? new Date(formData.issueDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label className="block text-gray-700 mb-2" htmlFor="dueDate">
                Data di Scadenza
              </Label>
              <Input
                type="date"
                id="dueDate"
                name="dueDate"
                value={
                  formData.dueDate
                    ? new Date(formData.dueDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                required
                className="text-[#111f43]"
              />
            </div>
            <div>
              <Label
                className="block text-gray-700 mb-2"
                htmlFor="paymentTerms"
              >
                Condizioni di Pagamento
              </Label>
              <Input
                type="text"
                id="paymentTerms"
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                placeholder="Es. 30 giorni dalla data di emissione"
                required
                className="text-[#111f43]"
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
            value={formData.notes}
            onChange={handleChange}
            placeholder="Aggiungi eventuali note o condizioni particolari"
            required
            className="text-[#111f43]"
          ></Textarea>
        </div>

        {/* Elenco delle Spese */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#111f43]">
            Elenco delle Spese
          </h2>

          <div className="h-px bg-gray-200 mb-4"></div>
          {formData.items.map((item: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4"
            >
              <div className="col-span-2">
                <Label
                  className="block text-gray-700 mb-2 font-semibold"
                  htmlFor={`item-description-${index}`}
                >
                  Descrizione Spesa #{index + 1}
                </Label>
                <Input
                  type="text"
                  id={`item-description-${index}`}
                  name={`item-description-${index}`}
                  value={item.description}
                  onChange={handleChange}
                  required
                  className="text-[#111f43]"
                />
              </div>
              <div>
                <Label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-quantity-${index}`}
                >
                  Quantità
                </Label>
                <Input
                  type="number"
                  id={`item-quantity-${index}`}
                  name={`item-quantity-${index}`}
                  value={item.quantity}
                  onChange={handleChange}
                  required
                  className="text-[#111f43]"
                />
              </div>
              <div>
                <Label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-unitPrice-${index}`}
                >
                  Prezzo Unitario (€)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  id={`item-unitPrice-${index}`}
                  name={`item-unitPrice-${index}`}
                  value={item.unitPrice}
                  onChange={handleChange}
                  required
                  className="text-[#111f43]"
                />
              </div>
              <div>
                <Label
                  className="block text-gray-700 mb-2"
                  htmlFor={`item-category-${index}`}
                >
                  Categoria
                </Label>
                <select
                  id={`item-category-${index}`}
                  name={`item-category-${index}`}
                  value={item.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-[#111f43] bg-white"
                  required
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
              onClick={() => removeItem(formData.items.length - 1)}
              disabled={formData.items.length === 1}
            >
              Rimuovi Spesa
            </ButtonCustom>
          </div>
        </div>

        {/* Pulsanti Invia e Annulla */}
        <div className="flex justify-end space-x-4">
          <ButtonCustom type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salva Modifiche"}
          </ButtonCustom>
          <ButtonCustom
            type="button"
            onClick={() => navigate(`/preventivo/${id}`)}
          >
            Annulla
          </ButtonCustom>
        </div>
      </form>
    </div>
  );
}
