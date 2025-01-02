// import fetch from "node-fetch";
// import googleTrends from "google-trends-api";

// type MarketData = {
//   marketSize: number;
//   growthRate: number;
//   demographics: {
//     age: number[];
//     gender: { male: number; female: number };
//     income: number[];
//     location: string[];
//   };
//   trends: string[];
//   swot: {
//     strengths: string[];
//     weaknesses: string[];
//     opportunities: string[];
//     threats: string[];
//   };
// };

// export async function fetchMarketData(keyword: string): Promise<MarketData> {
//   try {
//     // 1. Recupera il GDP (PIL) dall'API della World Bank
//     const gdpResponse = await fetch(
//       "https://api.worldbank.org/v2/country/IT/indicator/NY.GDP.MKTP.CD?format=json"
//     );
//     const gdpData = await gdpResponse.json();

//     if (!Array.isArray(gdpData) || !gdpData[1] || !gdpData[1][0]?.value) {
//       throw new Error("Struttura dei dati GDP non valida");
//     }

//     const gdpInUsd = gdpData[1][0].value;
//     const exchangeRate = 0.85; // Tasso di cambio approssimativo da USD a EUR
//     const marketSize = (gdpInUsd * exchangeRate) / 1e9; // Converti in miliardi di euro e arrotonda

//     const growthRate = 3.5; // Dato statico: tasso di crescita previsto

//     // 2. Dati demografici dinamici (esempio statico, da sostituire con API reali)
//     const demographics = await fetchDemographicsData(keyword);

//     // 3. Recupera i trend da Google Trends
//     const trendsData = await fetchGoogleTrends(keyword);
//     const trends = trendsData.map((item: any) => item.formattedValue[0]);

//     // 4. Analisi SWOT dinamica
//     const swot = await fetchDynamicSWOT(keyword);

//     return {
//       marketSize,
//       growthRate,
//       demographics,
//       trends,
//       swot,
//     };
//   } catch (error) {
//     console.error("Errore nel recupero dei dati di mercato:", error);
//     throw error;
//   }
// }

// async function fetchDemographicsData(keyword: string) {
//   // Esempio di dati demografici dinamici basati sulla keyword
//   // Sostituisci con chiamate API reali per ottenere dati demografici specifici
//   return {
//     age: [25, 35, 30, 10], // Esempio statico
//     gender: { male: 55, female: 45 }, // Esempio statico
//     income: [10, 20, 40, 30], // Esempio statico
//     location: ["Nord", "Centro", "Sud", "Isole"], // Esempio statico
//   };
// }

// async function fetchGoogleTrends(keyword: string) {
//   try {
//     const results = await googleTrends.interestOverTime({ keyword });
//     const parsedResults = JSON.parse(results);
//     return parsedResults.default.timelineData;
//   } catch (error) {
//     console.error(`Errore nel recupero dei trend per la keyword ${keyword}:`, error);
//     return [];
//   }
// }

// async function fetchNewsData(keyword: string) {
//   const apiKey = "6d0de895b7b64d8aabed86f27aea98e7"; // La tua API key di News API
//   const response = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`);
//   const data = await response.json();
//   return data.articles.map((article: any) => article.title);
// }

// function generateSWOTAnalysis(trends: any[], newsData: string[]) {
//   // Esempio di generazione di un'analisi SWOT basata sui dati raccolti
//   const strengths = ["Brand forte", "Ampia gamma di prodotti"];
//   const weaknesses = ["Dipendenza da pochi fornitori", "Costi elevati"];
//   const opportunities = ["Espansione internazionale", "Nuovi canali di distribuzione"];
//   const threats = ["Concorrenza intensa", "Regolamentazioni stringenti"];

//   // Analizza i dati delle tendenze e delle notizie per identificare ulteriori punti SWOT
//   if (trends.length > 0) {
//     opportunities.push("Aumento dell'interesse per il settore");
//   }
//   if (newsData.length > 0) {
//     threats.push("Notizie negative sul settore");
//   }

//   return {
//     strengths,
//     weaknesses,
//     opportunities,
//     threats,
//   };
// }

// async function fetchDynamicSWOT(keyword: string) {
//   try {
//     // 1. Google Trends API per ottenere dati sulle tendenze di ricerca
//     const trendsData = await fetchGoogleTrends(keyword);
//     const trends = trendsData.map((item: any) => item.formattedValue[0]);

//     // 2. News API per raccogliere notizie recenti sul settore
//     const newsData = await fetchNewsData(keyword);

//     // 3. Genera l'analisi SWOT basata sui dati raccolti
//     const swotData = generateSWOTAnalysis(trends, newsData);

//     return swotData;
//   } catch (error) {
//     console.error("Errore nel recupero dei dati SWOT dinamici:", error);
//     return {
//       strengths: ["Brand forte", "Ampia gamma di prodotti"],
//       weaknesses: ["Dipendenza da pochi fornitori", "Costi elevati"],
//       opportunities: ["Espansione internazionale", "Nuovi canali di distribuzione"],
//       threats: ["Concorrenza intensa", "Regolamentazioni stringenti"],
//     };
//   }
// }

import fetch from "node-fetch";
import googleTrends from "google-trends-api";

// Configurazione
const config = {
  apiKeys: {
    newsAPI: "6d0de895b7b64d8aabed86f27aea98e7",
    openWeather: "1759d6ecbfead4f7462ec5f8021fad28", // Sostituisci con la tua chiave API
  },
  endpoints: {
    worldBank: "https://api.worldbank.org/v2/country/IT/indicator/NY.GDP.MKTP.CD?format=json",
    eurostatPopulation: "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/DEMO_PJAN?geo=IT&precision=1&format=JSON",
    newsAPI: "https://newsapi.org/v2/everything",
    openWeather: "https://api.openweathermap.org/data/2.5/weather",
  },
  exchangeRate: 0.85, // USD -> EUR
};

// Tipizzazione dei dati (per TypeScript o per chiarezza nello sviluppo)
type MarketData = {
  marketSize: number;
  growthRate: number;
  demographics: {
    age: number[];
    gender: { male: number[]; female: number[] };
    income: number[];
    location: string[];
  };
  trends: string[];
  competitorData: any[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
};

// Funzioni di fetch

/**
 * Recupera la dimensione del mercato (GDP) dall'API della World Bank.
 */
async function fetchMarketSize(): Promise<number> {
  try {
    const response = await fetch(config.endpoints.worldBank);
    const data = await response.json();

    if (!Array.isArray(data) || !data[1] || !data[1][0]?.value) {
      throw new Error("Struttura dei dati GDP non valida");
    }

    const gdpInUsd: number = data[1][0].value;
    return (gdpInUsd * config.exchangeRate) / 1e9; // Miliardi di euro
  } catch (error) {
    console.error("Errore nel recupero del GDP:", error);
    return 0; // Valore fallback
  }
}

/**
 * Recupera i dati demografici dall'API di Eurostat (mockup per mappatura manuale).
 */
async function fetchDemographicsData(): Promise<MarketData["demographics"]> {
  return {
    age: [25, 35, 45, 60],
    gender: { male: [55, 50, 45, 40], female: [45, 50, 55, 60] },
    income: [20000, 30000, 50000, 70000],
    location: ["Nord", "Centro", "Sud", "Isole"],
  };
}

/**
 * Recupera le tendenze da Google Trends.
 */
async function fetchGoogleTrends(keyword: string): Promise<string[]> {
  try {
    const results = await googleTrends.interestOverTime({
      keyword,
      geo: "IT",
    });
    const parsedResults = JSON.parse(results);
    return parsedResults.default.timelineData.map((item: any) => item.formattedValue[0]);
  } catch (error) {
    console.error(`Errore nel recupero dei trend per ${keyword}:`, error);
    return [];
  }
}

/**
 * Recupera le notizie relative alla keyword da News API.
 */
async function fetchNewsData(keyword: string): Promise<string[]> {
  try {
    const response = await fetch(
      `${config.endpoints.newsAPI}?q=${encodeURIComponent(keyword)}&apiKey=${config.apiKeys.newsAPI}`
    );
    const data = await response.json();
    return data.articles.map((article: any) => article.title);
  } catch (error) {
    console.error("Errore nel recupero delle notizie:", error);
    return [];
  }
}

/**
 * Genera l'analisi SWOT basata sui dati raccolti.
 */
function generateSWOTAnalysis(
  trends: string[],
  newsData: string[],
): {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
} {
  const strengths = ["Brand forte", "Gamma prodotti ampia"];
  const weaknesses = ["Dipendenza da fornitori", "Costi elevati"];
  const opportunities = ["Espansione internazionale", "Canali distribuzione nuovi"];
  const threats = ["Concorrenza intensa", "Regolamentazioni stringenti"];

  if (trends.length > 0) {
    opportunities.push("Trend di crescita rilevato");
  }
  if (newsData.some((news) => news.toLowerCase().includes("negativo"))) {
    threats.push("Notizie negative rilevate");
  }

  return { strengths, weaknesses, opportunities, threats };
}

/**
 * Funzione principale per recuperare tutti i dati di mercato.
 */
export async function fetchMarketData(keyword: string): Promise<MarketData> {
  try {
    const [marketSize, demographics, trends] = await Promise.all([
      fetchMarketSize(),
      fetchDemographicsData(),
      fetchGoogleTrends(keyword),
    ]);

    const swot = generateSWOTAnalysis(trends, []);

    return {
      marketSize,
      growthRate: 3.5, // Modificare con fonte dinamica se disponibile
      demographics,
      trends,
      competitorData: [], // Placeholder per futuri sviluppi
      swot,
    };
  } catch (error) {
    console.error("Errore nel recupero dei dati di mercato:", error);
    throw error;
  }
}
