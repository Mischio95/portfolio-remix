"use client";

import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface ExpenseItem {
  id: number;
  description: string;
  cost: number;
  isVatIncluded: boolean;
  isMonthly: boolean;
}

export default function InvestmentPlan() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newExpense, setNewExpense] = useState<Omit<ExpenseItem, "id">>({
    description: "",
    cost: 0,
    isVatIncluded: false,
    isMonthly: false,
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch("/api/expenses");
      if (!res.ok) {
        throw new Error("Errore nel recupero delle spese");
      }
      const data: ExpenseItem[] = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error("Errore nel recupero delle spese:", error);
    }
  };

  const handleAddExpense = async () => {
    if (newExpense.description && newExpense.cost > 0) {
      try {
        const res = await fetch("/api/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newExpense),
        });
        if (!res.ok) {
          throw new Error("Errore nell'aggiunta della spesa");
        }
        const addedExpense: ExpenseItem = await res.json();
        setExpenses([...expenses, addedExpense]);
        setNewExpense({
          description: "",
          cost: 0,
          isVatIncluded: false,
          isMonthly: false,
        });
      } catch (error) {
        console.error("Errore nell'aggiunta della spesa:", error);
      }
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setExpenses(expenses.filter((expense) => expense.id !== id));
      } else {
        console.error("Errore nella cancellazione della spesa");
      }
    } catch (error) {
      console.error("Errore nella cancellazione della spesa:", error);
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

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Piano di Investimento
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="description" className="block text-gray-700 mb-2">
            Descrizione
          </Label>
          <Input
            id="description"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
            placeholder="Descrizione della spesa"
            className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-gray-500 bg-white"
          />
        </div>
        <div>
          <Label htmlFor="cost" className="block text-gray-700 mb-2">
            Costo (€)
          </Label>
          <Input
            id="cost"
            type="number"
            value={newExpense.cost}
            onChange={(e) =>
              setNewExpense({ ...newExpense, cost: parseFloat(e.target.value) })
            }
            placeholder="Costo della spesa"
            className="w-full p-2 border border-gray-300 rounded-md text-black placeholder-gray-500 bg-white"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="vat-included"
            checked={newExpense.isVatIncluded}
            onCheckedChange={(checked) =>
              setNewExpense({ ...newExpense, isVatIncluded: checked })
            }
          />
          <Label htmlFor="vat-included" className="text-gray-700">
            IVA inclusa
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is-monthly"
            checked={newExpense.isMonthly}
            onCheckedChange={(checked) =>
              setNewExpense({ ...newExpense, isMonthly: checked })
            }
          />
          <Label htmlFor="is-monthly" className="text-gray-700">
            Spesa mensile
          </Label>
        </div>
      </div>

      <Button onClick={handleAddExpense} className="mb-6">
        Aggiungi Spesa
      </Button>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Descrizione</TableHead>
            <TableHead>Costo (€)</TableHead>
            <TableHead>IVA (€)</TableHead>
            <TableHead>Totale (€)</TableHead>
            <TableHead>Tipologia Spesa</TableHead>
            <TableHead>Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="text-gray-800">
                {expense.description}
              </TableCell>
              <TableCell className="text-gray-800">
                €{expense.cost.toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-800">
                {expense.isVatIncluded
                  ? "Inclusa"
                  : calculateVAT(expense.cost).toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-800">
                {(expense.isVatIncluded
                  ? expense.cost
                  : expense.cost + calculateVAT(expense.cost)
                ).toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-800">
                {expense.isMonthly ? "Spesa Mensile" : "Spesa Finale"}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Elimina
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 bg-white p-4 rounded-md shadow-inner">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Totali</h2>
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-600">Totale Annuale:</span>
          <span className="font-medium text-gray-800">
            €{totalAnnual.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Totale Finito:</span>
          <span className="font-medium text-gray-800">
            €{totalFinal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
