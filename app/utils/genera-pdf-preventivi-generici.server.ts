import puppeteer from "puppeteer";
import { Preventivo as PrismaPreventivo } from "@prisma/client";

interface PreventivoItem {
  description: string;
  quantity: number;
  unitPrice: number;
  category: string;
}

// Estendi l'interfaccia Preventivo di Prisma per includere gli items
interface ExtendedPreventivo extends PrismaPreventivo {
  items: PreventivoItem[];
  clientName: string;
  logo?: string; // Aggiungi questa linea
}

export async function generatePDFgenerico(preventivo: ExtendedPreventivo): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Per ambienti server senza sandboxing
  });
  const page = await browser.newPage();

  // Genera il contenuto HTML
  const htmlContent = generateHTML(preventivo);

  // Imposta il contenuto della pagina
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // Genera il PDF
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true, // Include gli sfondi
    
  });

  // Chiudi il browser
  await browser.close();

  return Buffer.from(pdfBuffer);
}

function generateHTML(preventivo: ExtendedPreventivo): string {
  return `
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8">
    <title>Preventivo ${preventivo.preventivoNumber}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Inter', sans-serif;
        padding: 0;
        margin: 0;
        color: #333;
        line-height: 1.6;
      }
      .header {
        background-color: #111f43;
        padding: 40px;
        margin-bottom: 50px;
        text-align: center;
      }

      .header h1 {
        font-family: 'Playfair Display', serif;
        color: white;
        font-size: 32px;
        margin: 0;
      }
      .header p {
        color: white;
        font-size: 14px;
        margin: 0;
        opacity: 0.9;
      }

    .footer {
      background-color: #111f43;
      padding: 20px;
      margin: 0;
      text-align: center;
      font-size: 14px;
      width: 101vw;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      box-sizing: border-box;
    }


      .footer p
      {
        color:#fff !important;
        line-height: 1.1;

      }

      .footer a
      {
        color:#fff !important;
      }

      .content {
        padding: 0 40px;
        text-align: center ;
        max-width: 900px;
        margin: 0 auto;
      }
      .grid {
        background-color: #f8f9fa;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 20px;
        padding: 20px;
        border-radius: 20px;
        ine-height: 1.1;

      }
      .section-title {
        font-size: 24px;
        color: #111f43;
        margin-bottom: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      table th, table td {
        text-align: left;
        padding: 12px;
        border-bottom: 1px solid #eee;
      }
      table th {
        color: #111f43;
        font-weight: 600;
      }
      .total-box {
        background-color: #f8f9fa;
        padding: 20px;
        border-left: 4px solid #111f43;
        margin-bottom: 40px;
        border-radius: 20px;
      }
      .total-box p {
        margin: 0;
      }
      .total-box .total {
        font-size: 24px;
        color: #111f43;
        font-weight: 800;
      }
      .note {
        color: #a9181e;
        margin-bottom: 40px;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 20px;
        border-left: 4px solid #a9181e !important;
      }
      
    </style>
  </head>
  <body>
    <div class="header">
      <h1>${preventivo.providerName}</h1>
    </div>
    
    <div class="content">
      <div class="grid">
        <div>
          <h3>DATI FORNITORE</h3>
          <p>${preventivo.providerName}</p>
          <p>${preventivo.providerAddress}</p>
          <p>Tel: ${preventivo.providerPhone}</p>
          <p>Email: ${preventivo.providerEmail}</p>
          <p>P.IVA / CF: ${preventivo.providerVat}</p>
        </div>
        
        <div>
          <h3>DATI CLIENTE</h3>
          <p>${preventivo.clientName} ${preventivo.clientCognome}</p>
          <p>${preventivo.clientAddress}</p>
          <p>Tel: ${preventivo.clientPhone}</p>
          <p>Email: ${preventivo.clientEmail}</p>
          <p>P.IVA / CF: ${preventivo.clientVat}</p>
        </div>
      </div>
      
      <div>
        <div class="section-title">
          PREVENTIVO # ${preventivo.preventivoNumber}
        </div>
        <p>
          <span style="color: #111f43;">Data: ${preventivo.issueDate ? new Date(preventivo.issueDate).toLocaleDateString('it-IT') : "N/A"}</span> - 
          <span style="color: #a9181e; font-weight: bold;">Valido fino a: ${preventivo.dueDate ? new Date(preventivo.dueDate).toLocaleDateString('it-IT') : "N/A"}</span>
        </p>
      </div>
      
      <div>
        <h3>OGGETTO DEL SERVIZIO: Prodotti/Servizio offerti</h3>
        <table>
          <thead>
            <tr>
              <th>Descrizione</th>
              <th>Quantità</th>
              <th>Prezzo</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            ${preventivo.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>€${item.unitPrice.toFixed(2)}</td>
                <td>${item.category}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="total-box">
        <p style="font-weight: bold; font-size: 16px;">IMPORTO TOTALE:</p>
        <p class="total">€ ${preventivo.total.toFixed(2)}</p>
      </div>
      
      <div class="note">
        <h3>NOTA BENE</h3>
        <p>${preventivo.notes || "Nessuna nota aggiuntiva"}</p>
        <p style="font-weight: bold;">Corrispettivo Acconto: ${(preventivo.total/2).toFixed(2)} €</p>
        <p>Termini di pagamento: ${preventivo.paymentTerms}</p>
      </div>
      
      <div class="footer">
        <p>${preventivo.providerName}</p>
        <p>${preventivo.providerAddress}</p>
        <p>Codice Fiscale: ${preventivo.providerVat}</p>
      </div>
    </div>
  </body>
</html>
  `;
}