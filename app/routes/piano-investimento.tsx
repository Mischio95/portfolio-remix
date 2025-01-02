import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { stringify } from "csv-stringify/sync";
import * as XLSX from "xlsx";

interface ExpenseItem {
  description: string;
  cost: number;
  isVatIncluded: boolean;
  isMonthly: boolean;
}

export default function InvestmentPlan() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newExpense, setNewExpense] = useState<ExpenseItem>({
    description: "",
    cost: 0,
    isVatIncluded: false,
    isMonthly: false,
  });

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.cost > 0) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({
        description: "",
        cost: 0,
        isVatIncluded: false,
        isMonthly: false,
      });
    }
  };

  const calculateVAT = (cost: number) => cost * 0.22;

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => {
      let cost = expense.cost;
      if (!expense.isVatIncluded) {
        cost += calculateVAT(expense.cost);
      }
      return total + (expense.isMonthly ? cost * 12 : cost);
    }, 0);
  };

  const exportToCSV = () => {
    const csvData = stringify([
      ["Descrizione", "Costo (€)", "IVA (€)", "Totale (€)", "Tipo"],
      ...expenses.map((expense) => [
        expense.description,
        expense.cost.toFixed(2),
        expense.isVatIncluded
          ? "Inclusa"
          : calculateVAT(expense.cost).toFixed(2),
        (expense.isVatIncluded
          ? expense.cost
          : expense.cost + calculateVAT(expense.cost)
        ).toFixed(2),
        expense.isMonthly ? "Mensile" : "Totale",
      ]),
    ]);

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "piano_investimento.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Descrizione", "Costo (€)", "IVA (€)", "Totale (€)", "Tipo"],
      ...expenses.map((expense) => [
        expense.description,
        expense.cost,
        expense.isVatIncluded ? "Inclusa" : calculateVAT(expense.cost),
        expense.isVatIncluded
          ? expense.cost
          : expense.cost + calculateVAT(expense.cost),
        expense.isMonthly ? "Mensile" : "Totale",
      ]),
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Piano Investimento");
    XLSX.writeFile(wb, "piano_investimento.xlsx");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Piano di Investimento</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="description">Descrizione</Label>
          <Input
            id="description"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="cost">Costo (€)</Label>
          <Input
            id="cost"
            type="number"
            value={newExpense.cost}
            onChange={(e) =>
              setNewExpense({ ...newExpense, cost: parseFloat(e.target.value) })
            }
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
          <Label htmlFor="vat-included">IVA inclusa</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is-monthly"
            checked={newExpense.isMonthly}
            onCheckedChange={(checked) =>
              setNewExpense({ ...newExpense, isMonthly: checked })
            }
          />
          <Label htmlFor="is-monthly">Spesa mensile</Label>
        </div>
      </div>

      <Button onClick={handleAddExpense}>Aggiungi Spesa</Button>

      <div className="mt-4 space-x-2">
        <Button onClick={exportToCSV}>Esporta CSV</Button>
        <Button onClick={exportToExcel}>Esporta Excel</Button>
      </div>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Descrizione</TableHead>
            <TableHead>Costo (€)</TableHead>
            <TableHead>IVA (€)</TableHead>
            <TableHead>Totale (€)</TableHead>
            <TableHead>Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.cost.toFixed(2)}</TableCell>
              <TableCell>
                {expense.isVatIncluded
                  ? "Inclusa"
                  : calculateVAT(expense.cost).toFixed(2)}
              </TableCell>
              <TableCell>
                {(expense.isVatIncluded
                  ? expense.cost
                  : expense.cost + calculateVAT(expense.cost)
                ).toFixed(2)}
              </TableCell>
              <TableCell>{expense.isMonthly ? "Mensile" : "Totale"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 text-xl font-bold">
        Totale Annuale: €{calculateTotal().toFixed(2)}
      </div>
    </div>
  );
}
