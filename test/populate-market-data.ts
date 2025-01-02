// filepath: /Users/mischio/Desktop/micheletrombone.it/portfolio-remix/test/populate-market-data.ts
import { fetchMarketData } from '../app/models/market.server.js'; // Aggiungi l'estensione .js

async function populate() {
  try {
    const data = await fetchMarketData();
    console.log("Market data saved:", data);
  } catch (error) {
    console.error("Failed to populate market data:", error);
  }
}

populate();