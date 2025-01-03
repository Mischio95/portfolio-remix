import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import * as XLSX from "xlsx";
import pkg from "file-saver";
const { saveAs } = pkg;

import { userSchema } from "../validations/validationSchemaPianoInvestimento";
import ButtonCustom from "~/components/buttons/ButtonCustom";

type ExpenseFormData = z.infer<typeof userSchema>;

const categories = [
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
];

interface ExpenseItem {
  id: number;
  description: string;
  cost: number;
  isVatIncluded: boolean;
  isMonthly: boolean;
  category: string;
}

export default function InvestmentPlan() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      description: "",
      cost: 0,
      isVatIncluded: false,
      isMonthly: false,
      category: "",
    },
  });

  // Osserva i valori delle checkbox
  const isVatIncluded = watch("isVatIncluded");
  const isMonthly = watch("isMonthly");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("/api/expenses");
        if (!response.ok) {
          throw new Error("Errore nel recupero delle spese");
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Errore nel recupero delle spese:", error);
      }
    };

    fetchExpenses();
  }, []);

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta della spesa");
      }

      const addedExpense: ExpenseItem = await response.json();
      setExpenses((prevExpenses) => [...prevExpenses, addedExpense]);

      reset({
        description: "",
        cost: 0,
        isVatIncluded: false,
        isMonthly: false,
        category: "",
      });

      alert("Spesa aggiunta con successo!");
    } catch (error) {
      console.error("Errore nell'aggiunta della spesa:", error);
      alert(
        "Si è verificato un errore durante l'aggiunta della spesa. Per favore, riprova."
      );
    }
  };

  const handleDeleteExpense = async (id: number) => {
    const conferma = window.confirm(
      "Sei sicuro di voler eliminare questa spesa?"
    );
    if (!conferma) return;

    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Errore durante l'eliminazione della spesa");
      }

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      alert("Spesa eliminata con successo!");
    } catch (error) {
      console.error("Errore nell'eliminazione della spesa:", error);
      alert(
        "Si è verificato un errore durante l'eliminazione della spesa. Per favore, riprova."
      );
    }
  };

  const calculateVAT = (cost: number) => cost * 0.22;

  const calculateTotals = () => {
    let totalAnnual = 0;
    let totalFinal = 0;

    expenses.forEach((expense) => {
      let cost = expense.cost;
      if (!expense.isVatIncluded) {
        cost += calculateVAT(expense.cost);
      }
      if (expense.isMonthly) {
        totalAnnual += cost * 12;
      } else {
        totalFinal += cost;
      }
    });

    return { totalAnnual, totalFinal };
  };

  const { totalAnnual, totalFinal } = calculateTotals();

  const exportToExcel = () => {
    try {
      const data = expenses.map((expense) => ({
        Descrizione: expense.description,
        Costo: expense.cost,
        "IVA Inclusa": expense.isVatIncluded ? "Sì" : "No",
        "Spesa Mensile": expense.isMonthly ? "Sì" : "No",
        Categoria: expense.category,
        "Parziale Annuale": expense.isMonthly
          ? (
              expense.cost * 12 +
              (expense.isVatIncluded ? 0 : calculateVAT(expense.cost * 12))
            ).toFixed(2)
          : "",
        Totale: expense.isVatIncluded
          ? expense.cost
          : expense.cost + calculateVAT(expense.cost),
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Piano di Investimento"
      );

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const file = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(file, "PianoDiInvestimento.xlsx");
    } catch (error) {
      console.error("Errore durante l'esportazione in Excel:", error);
      alert(
        "Si è verificato un errore durante l'esportazione. Per favore, riprova."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Piano di Investimento
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categoria */}
          <div className="col-span-1 md:col-span-2">
            <Label htmlFor="category" className="block text-gray-700 mb-2">
              Categoria
            </Label>
            <select
              id="category"
              {...register("category")}
              className={`w-full p-2 border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded-md text-black bg-white`}
            >
              <option value="" disabled>
                Seleziona una categoria
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category?.message}
              </p>
            )}
          </div>
          {/* Descrizione */}
          <div>
            <Label htmlFor="description" className="block text-gray-700 mb-2">
              Descrizione
            </Label>
            <Input
              id="description"
              type="text"
              {...register("description")}
              className={`w-full p-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md text-black bg-white`}
              placeholder="Descrizione della spesa"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description?.message}
              </p>
            )}
          </div>
          {/* Costo */}
          <div>
            <Label htmlFor="cost" className="block text-gray-700 mb-2">
              Costo (€)
            </Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              {...register("cost", { valueAsNumber: true })}
              className={`w-full p-2 border ${
                errors.cost ? "border-red-500" : "border-gray-300"
              } rounded-md text-black bg-white`}
              placeholder="Costo della spesa"
            />
            {errors.cost && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cost?.message}
              </p>
            )}
          </div>
          {/* IVA Inclusa */}
          <div className="flex items-center space-x-2">
            <input
              id="isVatIncluded"
              type="checkbox"
              {...register("isVatIncluded")}
              className="hidden peer"
              checked={isVatIncluded}
              onChange={(e) => setValue("isVatIncluded", e.target.checked)}
            />
            <label
              htmlFor="isVatIncluded"
              className="w-6 h-6 flex items-center justify-center border-2 border-[#111f43] rounded-full cursor-pointer peer-checked:bg-[#111f43]"
            >
              <svg
                className="hidden peer-checked:block w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </label>
            <Label htmlFor="isVatIncluded" className="text-gray-700">
              Indica se il prezzo è incluso d'IVA.
            </Label>
          </div>
          {/* Spesa Mensile */}
          <div className="flex items-center space-x-2">
            <input
              id="isMonthly"
              type="checkbox"
              {...register("isMonthly")}
              className="hidden peer"
              checked={isMonthly}
              onChange={(e) => setValue("isMonthly", e.target.checked)}
            />
            <label
              htmlFor="isMonthly"
              className="w-6 h-6 flex items-center justify-center border-2 border-[#111f43] rounded-full cursor-pointer peer-checked:bg-[#111f43]"
            >
              <svg
                className="hidden peer-checked:block w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </label>
            <Label htmlFor="isMonthly" className="text-gray-700">
              Indica se è una spesa mensile.
            </Label>
          </div>
        </div>
        {/* Pulsanti aggiuntivi */}
        <div className="flex space-x-4 mt-6">
          <ButtonCustom type="submit">Aggiungi Spesa</ButtonCustom>
          <ButtonCustom type="button" onClick={exportToExcel}>
            Esporta in Excel
          </ButtonCustom>
        </div>
      </form>

      {/* Tabella delle spese */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Elenco Spese ("Scrolling Laterale")
        </h2>
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrizione
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Costo (€)
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Totale + IVA(€)
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IVA Inclusa
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spesa Mensile
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parziale Annuale (€)
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <TableRow key={expense.id} className="hover:bg-gray-100">
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {expense.description}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    €{expense.cost.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {expense.isVatIncluded
                      ? expense.cost.toFixed(2)
                      : (expense.cost + calculateVAT(expense.cost)).toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {expense.isVatIncluded ? "Sì" : "No"}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {expense.isMonthly ? "Sì" : "No"}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {expense.category}
                  </TableCell>
                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {expense.isMonthly
                      ? (
                          expense.cost * 12 +
                          (expense.isVatIncluded
                            ? 0
                            : calculateVAT(expense.cost * 12))
                        ).toFixed(2)
                      : ""}
                  </TableCell>

                  <TableCell className="px-4 py-2 whitespace-nowrap text-center">
                    <Button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      Elimina
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  Nessuna spesa trovata.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Totali */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Totali</h2>
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-600">
            Totale Spese Annuali:
          </span>
          <span className="font-medium text-gray-800">
            €{totalAnnual.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">
            Totale Spese Finite:
          </span>
          <span className="font-medium text-gray-800">
            €{totalFinal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
