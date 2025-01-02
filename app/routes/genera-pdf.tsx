import { ActionFunction } from "@remix-run/node";
import puppeteer from "puppeteer";
import { getFornitori } from "~/models/fornitori.server";
import { getExpenses } from "~/routes/api.expenses";

export const action: ActionFunction = async ({ request }) => {
  try {
    console.log("Inizio generazione PDF");

    const fornitori = await getFornitori();
    console.log("Fornitori recuperati:", fornitori);

    const expenses = await getExpenses();
    console.log("Spese recuperate:", expenses);

    const totalAnnual = expenses.reduce((acc, expense) => {
      const cost = expense.isVatIncluded
        ? expense.cost
        : expense.cost + expense.cost * 0.22;
      return expense.isMonthly ? acc + cost * 12 : acc;
    }, 0);

    const totalFinal = expenses.reduce((acc, expense) => {
      const cost = expense.isVatIncluded
        ? expense.cost
        : expense.cost + expense.cost * 0.22;
      return !expense.isMonthly ? acc + cost : acc;
    }, 0);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="it">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Report Fornitori e Spese</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 1200px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            h1 {
              color: #2c3e50;
              text-align: center;
              margin-top: 40px;
              margin-bottom: 20px;
              font-size: 28px;
              border-bottom: 2px solid #111f43;
              padding-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              margin-bottom: 40px;
              background-color: #fff;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              overflow: hidden;
            }
            th, td {
              padding: 12px 15px;
              text-align: left;
              border-bottom: 1px solid #e0e0e0;
            }
            th {
              background-color: #111f43;
              color: #fff;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 14px;
              letter-spacing: 0.5px;
            }
            tr:last-child td {
              border-bottom: none;
            }
            tr:nth-child(even) {
              background-color: #f8f9fa;
            }
            td {
              font-size: 14px;
            }
            .logo {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo img {
              max-width: 100px;
              height: auto;
            }
            .report-date {
              text-align: right;
              font-style: italic;
              margin-bottom: 20px;
              color: #7f8c8d;
            }
            .total-row {
              font-weight: bold;
              background-color: #ecf0f1 !important;
            }
          </style>
        </head>
        <body>
          <div class="logo">
            <!-- Sostituisci con il percorso del tuo logo -->
            <img src="https://micheletrombone.it/sticker.webp" alt="Logo Azienda">
          </div>
          <div class="report-date">
            Generato il: ${new Date().toLocaleDateString("it-IT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          
          <h1>Report Fornitori</h1>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sito Web</th>
                <th>Telefono</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              ${fornitori
                .map(
                  (fornitore) => `
                <tr>
                  <td>${fornitore.nome}</td>
                  <td>${fornitore.sitoWeb || "N/A"}</td>
                  <td>${fornitore.telefono || "N/A"}</td>
                  <td>${fornitore.email || "N/A"}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <h1>Report Spese</h1>
          <table>
            <thead>
              <tr>
                <th>Descrizione</th>
                <th>Costo (€)</th>
                <th>IVA Inclusa</th>
                <th>Spesa Mensile</th>
                <th>Categoria</th>
                <th>Totale (€)</th>
              </tr>
            </thead>
            <tbody>
              ${expenses
                .map(
                  (expense) => `
                <tr>
                  <td>${expense.description}</td>
                  <td>€${expense.cost.toFixed(2)}</td>
                  <td>${expense.isVatIncluded ? "Sì" : "No"}</td>
                  <td>${expense.isMonthly ? "Sì" : "No"}</td>
                  <td>${expense.category}</td>
                  <td>€${
                    expense.isVatIncluded
                      ? expense.cost.toFixed(2)
                      : (expense.cost + expense.cost * 0.22).toFixed(2)
                  }</td>
                </tr>
              `
                )
                .join("")}
              <tr class="total-row">
                <td colspan="5">Totale Annuale Spese Mensili</td>
                <td>€${totalAnnual.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td colspan="5">Totale Spese Finali</td>
                <td>€${totalFinal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    console.log("HTML content generato");

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--single-process",
        "--no-zygote",
      ],
    });
    console.log("Browser avviato");

    const page = await browser.newPage();
    console.log("Nuova pagina creata");

    await page.setContent(htmlContent);
    console.log("Contenuto HTML impostato");

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    console.log("PDF generato");

    await browser.close();
    console.log("Browser chiuso");

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=report.pdf",
      },
    });
  } catch (error) {
    console.error("Errore durante la generazione del PDF:", error);
    return new Response("Errore durante la generazione del PDF", {
      status: 500,
    });
  }
};
