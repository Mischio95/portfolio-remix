// import { useLoaderData } from "@remix-run/react";
// import { LoaderFunction } from "@remix-run/node";
// import { motion } from "framer-motion";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import { useEffect } from "react";
// import Chart from "chart.js/auto";
// import { fetchMarketData } from "~/models/market.server";

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

// type LoaderData = {
//   data: MarketData;
//   description: {
//     marketSize: string;
//     growthRate: string;
//     demographics: {
//       age: string;
//       gender: string;
//       income: string;
//       location: string;
//     };
//     trends: string;
//     swot: string;
//   };
//   keyword: string;
// };

// export const loader: LoaderFunction = async ({ request }) => {
//   const url = new URL(request.url);
//   const keyword = url.searchParams.get("keyword") || "prodotti biologici";
//   try {
//     const data = await fetchMarketData(keyword);
//     const description = {
//       marketSize:
//         "Dati presi dall'API della World Bank, indicatore del PIL (GDP) dell'Italia in dollari statunitensi.",
//       growthRate:
//         "Dati derivati da Eurostat, che misura il tasso di crescita economica dell'Italia.",
//       demographics: {
//         age: "Distribuzione delle fasce d'età media basata su statistiche generali dell'Italia.",
//         gender:
//           "Distribuzione di genere calcolata utilizzando OpenData Europei.",
//         income: "Fasce di reddito calcolate sulla base dei dati ISTAT.",
//         location:
//           "Ripartizione geografica in Nord, Centro, Sud e Isole in Italia.",
//       },
//       trends: `Tendenze di mercato derivate da Google Trends sull'interesse per la keyword "${keyword}".`,
//       swot: "Analisi SWOT basata su ricerche di mercato e informazioni generali sul settore dei prodotti bio.",
//     };
//     return { data, description, keyword };
//   } catch (error) {
//     console.error("Errore nel loader:", error);
//     throw new Response("Errore nel caricamento dei dati di mercato", {
//       status: 500,
//     });
//   }
// };

// export default function AnalisiMercato() {
//   const { data, description, keyword } = useLoaderData<LoaderData>();

//   useEffect(() => {
//     return () => {
//       Object.values(Chart.instances).forEach((chart: Chart) => chart.destroy());
//     };
//   }, []);

//   if (!data) {
//     return <div>Caricamento dei dati di mercato...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">
//         Analisi di Mercato per "{keyword}"
//       </h1>
//       <form method="get" className="mb-4">
//         <input
//           type="text"
//           name="keyword"
//           placeholder="Inserisci una nuova keyword"
//           className="border rounded px-4 py-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Cerca
//         </button>
//       </form>
//       {/* Ricerca di Mercato */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700">
//           Ricerca di Mercato
//         </h2>
//         <p className="text-gray-500">{description.marketSize}</p>
//         <div className="mt-4">
//           <p className="text-gray-700">
//             Dimensioni del mercato: {data.marketSize.toFixed(2)} miliardi di
//             euro
//           </p>
//           <p className="text-gray-700">
//             Tasso di crescita: {data.growthRate}% annuo
//           </p>
//         </div>
//       </section>

//       {/* Analisi SWOT */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700">Analisi SWOT</h2>
//         <p className="text-gray-500">{description.swot}</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">
//               Punti di Forza
//             </h3>
//             <ul className="list-disc list-inside text-gray-600">
//               {data.swot.strengths.map((strength, index) => (
//                 <li key={index}>{strength}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Debolezze</h3>
//             <ul className="list-disc list-inside text-gray-600">
//               {data.swot.weaknesses.map((weakness, index) => (
//                 <li key={index}>{weakness}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Opportunità</h3>
//             <ul className="list-disc list-inside text-gray-600">
//               {data.swot.opportunities.map((opportunity, index) => (
//                 <li key={index}>{opportunity}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Minacce</h3>
//             <ul className="list-disc list-inside text-gray-600">
//               {data.swot.threats.map((threat, index) => (
//                 <li key={index}>{threat}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Dati Demografici */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700">
//           Dati Demografici
//         </h2>
//         <p className="text-gray-500">{description.demographics.age}</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Età</h3>
//             <Bar
//               data={{
//                 labels: ["0-18", "19-35", "36-50", "51+"],
//                 datasets: [
//                   {
//                     label: "Età",
//                     data: data.demographics.age,
//                     backgroundColor: "rgba(75, 192, 192, 0.6)",
//                   },
//                 ],
//               }}
//             />
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Genere</h3>
//             <p className="text-gray-500">{description.demographics.gender}</p>
//             <Pie
//               data={{
//                 labels: ["Maschio", "Femmina"],
//                 datasets: [
//                   {
//                     label: "Genere",
//                     data: [
//                       data.demographics.gender.male,
//                       data.demographics.gender.female,
//                     ],
//                     backgroundColor: [
//                       "rgba(54, 162, 235, 0.6)",
//                       "rgba(255, 99, 132, 0.6)",
//                     ],
//                   },
//                 ],
//               }}
//             />
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">Reddito</h3>
//             <p className="text-gray-500">{description.demographics.income}</p>
//             <Line
//               data={{
//                 labels: ["<20k", "20k-50k", "50k-100k", "100k+"],
//                 datasets: [
//                   {
//                     label: "Reddito",
//                     data: data.demographics.income,
//                     backgroundColor: "rgba(153, 102, 255, 0.6)",
//                   },
//                 ],
//               }}
//             />
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-700">
//               Localizzazione
//             </h3>
//             <p className="text-gray-500">{description.demographics.location}</p>
//             <ul className="list-disc list-inside text-gray-600">
//               {data.demographics.location.map((location, index) => (
//                 <li key={index}>{location}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Tendenze di Mercato */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700">
//           Tendenze di Mercato
//         </h2>
//         <p className="text-gray-500">{description.trends}</p>
//         <Line
//           data={{
//             labels: data.trends.map((_, index) => index.toString()),
//             datasets: [
//               {
//                 label: `Interesse per "${keyword}"`,
//                 data: data.trends,
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 fill: false,
//               },
//             ],
//           }}
//         />
//       </section>
//     </div>
//   );
// }

import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import { fetchMarketData } from "~/models/market.server";

type MarketData = {
  marketSize: number;
  growthRate: number;
  demographics: {
    age: number[];
    gender: { male: number; female: number };
    income: number[];
    location: string[];
  };
  trends: string[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
};

type LoaderData = {
  data: MarketData;
  description: {
    marketSize: string;
    growthRate: string;
    demographics: {
      age: string;
      gender: string;
      income: string;
      location: string;
    };
    trends: string;
    swot: string;
  };
  keyword: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") || "prodotti biologici";
  try {
    const data = await fetchMarketData(keyword);
    const description = {
      marketSize:
        "Dati presi dall'API della World Bank, indicatore del PIL (GDP) dell'Italia in dollari statunitensi.",
      growthRate:
        "Dati derivati da Eurostat, che misura il tasso di crescita economica dell'Italia.",
      demographics: {
        age: "Distribuzione delle fasce d'età media basata su statistiche generali dell'Italia.",
        gender:
          "Distribuzione di genere calcolata utilizzando OpenData Europei.",
        income: "Fasce di reddito calcolate sulla base dei dati ISTAT.",
        location:
          "Ripartizione geografica in Nord, Centro, Sud e Isole in Italia.",
      },
      trends: `Tendenze di mercato derivate da Google Trends sull'interesse per la keyword "${keyword}".`,
      swot: "Analisi SWOT basata su ricerche di mercato e informazioni generali sul settore dei prodotti bio.",
    };
    return { data, description, keyword };
  } catch (error) {
    console.error("Errore nel loader:", error);
    throw new Response("Errore nel caricamento dei dati di mercato", {
      status: 500,
    });
  }
};

export default function AnalisiMercato() {
  const { data, description, keyword } = useLoaderData<LoaderData>();

  useEffect(() => {
    return () => {
      Object.values(Chart.instances).forEach((chart: Chart) => chart.destroy());
    };
  }, []);

  if (!data) {
    return <div>Caricamento dei dati di mercato...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Analisi di Mercato per "{keyword}"
      </h1>
      <form method="get" className="mb-4">
        <input
          type="text"
          name="keyword"
          placeholder="Inserisci una nuova keyword"
          className="border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cerca
        </button>
      </form>
      {/* Ricerca di Mercato */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          Ricerca di Mercato
        </h2>
        <p className="text-gray-500">{description.marketSize}</p>
        <div className="mt-4">
          <p className="text-gray-700">
            Dimensioni del mercato: {data.marketSize.toFixed(2)} miliardi di
            euro
          </p>
          <p className="text-gray-700">
            Tasso di crescita: {data.growthRate}% annuo
          </p>
        </div>
      </section>

      {/* Analisi SWOT */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">Analisi SWOT</h2>
        <p className="text-gray-500">{description.swot}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">
              Punti di Forza
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {data.swot.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Debolezze</h3>
            <ul className="list-disc list-inside text-gray-600">
              {data.swot.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Opportunità</h3>
            <ul className="list-disc list-inside text-gray-600">
              {data.swot.opportunities.map((opportunity, index) => (
                <li key={index}>{opportunity}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Minacce</h3>
            <ul className="list-disc list-inside text-gray-600">
              {data.swot.threats.map((threat, index) => (
                <li key={index}>{threat}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dati Demografici */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          Dati Demografici
        </h2>
        <p className="text-gray-500">{description.demographics.age}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Età</h3>
            <Bar
              data={{
                labels: ["0-18", "19-35", "36-50", "51+"],
                datasets: [
                  {
                    label: "Età",
                    data: data.demographics.age,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                ],
              }}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Genere</h3>
            <p className="text-gray-500">{description.demographics.gender}</p>
            <Pie
              data={{
                labels: ["Maschio", "Femmina"],
                datasets: [
                  {
                    label: "Genere",
                    data: [
                      data.demographics.gender.male,
                      data.demographics.gender.female,
                    ],
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                    ],
                  },
                ],
              }}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Reddito</h3>
            <p className="text-gray-500">{description.demographics.income}</p>
            <Line
              data={{
                labels: ["<20k", "20k-50k", "50k-100k", "100k+"],
                datasets: [
                  {
                    label: "Reddito",
                    data: data.demographics.income,
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                  },
                ],
              }}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">
              Localizzazione
            </h3>
            <p className="text-gray-500">{description.demographics.location}</p>
            <ul className="list-disc list-inside text-gray-600">
              {data.demographics.location.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tendenze di Mercato */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          Tendenze di Mercato
        </h2>
        <p className="text-gray-500">{description.trends}</p>
        <Line
          data={{
            labels: data.trends.map((_, index) => index.toString()),
            datasets: [
              {
                label: `Interesse per "${keyword}"`,
                data: data.trends,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
              },
            ],
          }}
        />
      </section>
    </div>
  );
}
