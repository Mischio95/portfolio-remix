import puppeteer from "puppeteer";
import type { Spese } from "@prisma/client";

export async function generatePDFSpese(spese: Spese[]): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Genera il contenuto HTML
  const htmlContent = generateHTML(spese);

  // Imposta il contenuto della pagina
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // Genera il PDF
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  // Chiudi il browser
  await browser.close();

  return Buffer.from(pdfBuffer);
}

function generateHTML(spese: Spese[]): string {
  const currentYear = new Date().getFullYear();

  // Raggruppa le spese per mese
  const groupedSpese = spese.reduce((acc, spesa) => {
    const month = new Date(spesa.date).toLocaleString("it-IT", {
      month: "long",
    });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(spesa);
    return acc;
  }, {} as { [key: string]: Spese[] });

  // Calcola il totale per ogni mese
  const monthlyTotals: { [key: string]: number } = {};
  Object.keys(groupedSpese).forEach((month) => {
    monthlyTotals[month] = groupedSpese[month].reduce((sum, spesa) => {
      let amount = spesa.amount;
      if (spesa.reimbursementReceived) {
        amount -= spesa.amount;
      }
      return sum + amount;
    }, 0);
  });

  // Calcola il totale annuale
  const annualTotal = Object.values(monthlyTotals).reduce(
    (acc, monthTotal) => acc + monthTotal,
    0
  );

  return `
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <title>Riepilogo Spese</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet">
        <style>
          body { 
            font-family: 'Inter', sans-serif; 
            padding: 20px; 
            margin: 0; 
            color: #333; 
            line-height: 1.6; 
          }
          .header {
            background-color: #111f43;
            padding: 40px;
            margin-bottom: 50px;
            text-align: center;
            color: white;
          }
          .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            text-align: center;
            padding: 12px;
            border-bottom: 1px solid #eee;
          }
          th {
            color: #7BA5A5;
            font-weight: 600;
          }
          tr:nth-child(even) { background-color: #f2f2f2; }
          tr:hover { background-color: #ddd; }
          .total {
            font-weight: bold;
            background-color: #f8f9fa;
          }
          .monthly-total {
            font-weight: bold;
            background-color: #d1f0ea;
            color: #a9181e !important;
          }
          h2 {
            color: #111f43;
            margin-top: 40px;
          }
          .annual-total {
            font-weight: bold;
            font-size: 20px;
            text-align: right;
            margin-top: 30px;
            color: #a9181e;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <svg
            width="80px"
            height="52.4668185px"
            viewBox="0 0 100 52.4668185"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="cropped-logoparticles"
                fill="#FFFFFF"
                fillRule="nonzero"
              >
                <path
                 <path
              d="M0,24.9614637 C0.132378711,24.7452717 0.294104883,24.6392857 0.392274805,24.4911711 C0.944484961,23.6580383 1.35470488,22.6892363 2.0431582,21.994407 C8.79963105,15.1753347 15.5679107,8.36710447 22.4102377,1.6344574 C24.5781496,-0.498706466 27.8593033,-0.552964669 30.0274461,1.52531072 C33.0795973,4.45095408 36.0222787,7.49071346 39.0174687,10.4759554 C39.5844609,11.0410672 40.1780338,11.5795146 40.851152,12.2172486 C41.0505861,12.0298306 41.3051396,11.8031215 41.5458262,11.5625392 C44.9513883,8.15848221 48.368767,4.76606893 51.7519652,1.33991209 C52.9806793,0.0955995891 55.3204715,0.0831197063 56.5486312,1.24924744 C57.9647602,2.59385818 57.9810262,4.81907244 56.6890656,6.13069939 C52.716434,10.163806 48.7856061,14.2452906 44.6596057,18.1173097 C42.3289926,20.3044664 39.1464531,20.1002371 36.7322416,17.7991728 C33.5422695,14.7587101 30.4450572,11.6208951 27.312234,8.52062225 C27.1852016,8.39490701 27.108866,8.219574 26.99669,8.0769699 C26.5476078,7.50604685 26.1799752,7.53157244 25.6420523,8.07370662 C19.8698863,13.891108 14.0697152,19.6807246 8.27718672,25.4779172 C7.44192383,26.3138543 7.42753828,26.3283263 8.24039941,27.1273982 C10.0110121,28.867967 11.8086234,30.5811178 13.5751619,32.3257576 C16.042842,34.7628486 18.4950619,37.2156273 20.9484338,39.6671664 C22.5484506,41.2659836 24.1379381,42.8753387 25.7344604,44.4776666 C25.9354174,44.6793568 26.1505307,44.8669445 26.4005572,45.0996709 C30.1519334,41.3379144 33.8225604,37.6494597 37.5015736,33.9693855 C48.2229918,23.2448797 58.943516,12.519474 69.6745516,1.80459881 C72.0042408,-0.521590255 75.4583299,-0.512613692 77.7671396,1.78719275 C84.7067953,8.69980271 91.6392625,15.6198424 98.5271871,22.5838105 C99.1502881,23.2137871 99.4323432,24.1810721 99.9363898,24.9312113 C100,25.7216703 100,26.5726279 100,27.5143367 C99.8777867,27.6317965 99.6527852,27.6467691 99.6482016,27.6869099 C99.4737326,29.2152117 98.3889699,30.1815521 97.429043,31.1915588 C95.9779918,32.7183199 94.4464982,34.1684054 92.9574848,35.6593621 C89.5623684,39.0588951 86.1829102,42.474134 82.7758193,45.861609 C80.9964418,47.6307344 79.2295934,49.4195652 77.3526967,51.0816109 C75.2516746,52.9421162 72.0469416,52.897383 70.0123072,50.9855043 C67.7993357,48.9060472 65.6999289,46.7057418 63.5507762,44.5583652 C62.2022986,43.2110082 60.8478189,41.8695818 59.5074594,40.514208 C58.9870631,39.9879943 58.7100805,40.457506 58.4067643,40.7603871 C55.0221205,44.1401672 51.643926,47.5264023 48.2618004,50.9087037 C46.7774809,52.3931037 44.5676117,52.3021769 43.3017998,50.843824 C42.0052648,49.3500662 41.9309795,47.5862931 43.3540135,46.1237799 C47.2792447,42.0896482 51.2103141,38.0544375 55.3000092,34.1899644 C57.3157668,32.2852146 60.7064844,32.2976422 62.842542,34.3275916 C65.1590883,36.5290652 67.4295187,38.7792539 69.7096229,41.018815 C70.8948314,42.1829533 72.0664203,43.3613431 73.2255398,44.5514332 C73.6290633,44.9657392 73.7551033,45.1013039 74.3012369,44.5183765 C76.3042867,42.3803818 78.4710168,40.396459 80.5582166,38.3363853 C82.2975516,36.6196465 84.0155422,34.8811935 85.7360959,33.1455361 C87.4949037,31.3712846 89.2414451,29.5848679 91.0022676,27.812634 C91.4199828,27.3922217 91.9083953,27.0368379 92.2882795,26.5873115 C92.3990607,26.4562111 92.3427045,26.0071021 92.2011732,25.8657228 C89.5444035,23.2117336 86.8465781,20.598815 84.1921031,17.9425697 C81.7660629,15.5149232 79.3850959,13.0422871 76.976633,10.5969918 C76.0782361,9.68486189 75.1389443,8.81234822 74.2572605,7.88473904 C73.8840281,7.49207244 73.572302,7.4919115 73.2280492,7.84218728 C70.7984984,10.3142303 68.3954357,12.8126961 65.9425975,15.2613443 C63.8489604,17.3514049 61.6776109,19.3635951 59.5826148,21.4523357 C57.7107131,23.3186494 55.9173645,25.2636474 54.0499627,27.1346074 C52.4131238,28.7745666 50.7021309,30.3403926 49.0598439,31.9750857 C47.5223422,33.5054826 46.0479437,35.0991617 44.5160807,36.6353762 C43.2061672,37.9490209 41.8337912,39.2004621 40.5266463,40.5167592 C39.2705471,41.7816471 38.0781322,43.109591 36.8295252,44.382156 C35.4714752,45.7662652 34.1026188,47.1412849 32.6976746,48.4773707 C31.5796256,49.5406162 30.4783195,50.6485234 29.2300314,51.5415381 C27.2679121,52.9452097 24.3129879,52.7330053 22.59451,51.033051 C15.4688447,43.9842056 8.38738301,36.8904066 1.33559902,29.7676635 C0.756734961,29.1829775 0.523065039,28.2565367 0.0645003906,27.546991 C0,26.7541301 0,25.9031724 0,24.9614637 Z"
              id="Path"
                ></path>
              </g>
            </g>
          </svg>
          <h1>Riepilogo Spese ${currentYear}</h1>
        </div>
        
        ${Object.keys(groupedSpese)
          .map(
            (month) => `
          <h2>${month.charAt(0).toUpperCase() + month.slice(1)}</h2>
          <table>
            <thead>
              <tr>
                <th>Nome Spesa</th>
                <th>Importo (€)</th>
                <th>Rimborso Richiesto</th>
                <th>Rimborso Ricevuto</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              ${groupedSpese[month]
                .map(
                  (spesa) => `
                <tr>
                  <td>${spesa.name}</td>
                  <td>€${spesa.amount.toFixed(2)}</td>
                  <td>${spesa.reimbursement ? "Sì" : "No"}</td>
                  <td>${spesa.reimbursementReceived ? "Sì" : "No"}</td>
                  <td>${new Date(spesa.date).toLocaleDateString("it-IT")}</td>
                </tr>
              `
                )
                .join("")}
              <tr class="monthly-total">
                <td colspan="1">Totale ${
                  month.charAt(0).toUpperCase() + month.slice(1)
                }</td>
                <td>€${monthlyTotals[month].toFixed(2)}</td>
                <td colspan="3"></td>
              </tr>
            </tbody>
          </table>
        `
          )
          .join("")}
        
        <div class="annual-total">
          Totale Spese Annuali: €${annualTotal.toFixed(2)}
        </div>
      </body>
      </html>
    `;
}