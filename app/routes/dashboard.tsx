"use client";
import { Link, useLoaderData, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import dotenv from "dotenv";
import { LoaderFunction, json } from "@remix-run/node";

dotenv.config();

type LoaderData = {};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const accessKey = url.searchParams.get("key");

  // Ottieni la chiave segreta dalle variabili d'ambiente
  const SECRET_KEY = process.env.DASHBOARD_SECRET_KEY || "";
  console.log("SECRET_KEY:", SECRET_KEY); // Verifica che la chiave sia caricata

  if (accessKey !== SECRET_KEY) {
    // Reindirizza a una pagina di accesso negato
    return redirect("/accesso-negato");
  }

  return json<LoaderData>({});
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-4xl font-bold mb-10 text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Business Plan Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Collegamento a Fornitori */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Fornitori</h2>
            <p className="text-gray-500">Gestisci la tua lista di fornitori.</p>
          </div>
          <Link to="/fornitori">
            <Button className="bg-blue-600 hover:bg-blue-700">Vai</Button>
          </Link>
        </motion.div>

        {/* Collegamento a Referenze
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Referenze</h2>
            <p className="text-gray-500">
              Aggiungi e gestisci le tue referenze.
            </p>
          </div>
          <Link to="/referenze">
            <Button className="bg-green-600 hover:bg-green-700">Vai</Button>
          </Link>
        </motion.div> */}

        {/* Collegamento a Competitors
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Competitors
            </h2>
            <p className="text-gray-500">Analizza i tuoi competitor.</p>
          </div>
          <Link to="/competitors">
            <Button className="bg-purple-600 hover:bg-purple-700">Vai</Button>
          </Link>
        </motion.div> */}

        {/* Collegamento a Piano Investimento */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Piano di Investimento
            </h2>
            <p className="text-gray-500">
              Visualizza e modifica il piano di investimento.
            </p>
          </div>
          <Link to="/piano-investimento">
            <Button className="bg-red-600 hover:bg-red-700">Vai</Button>
          </Link>
        </motion.div>

        {/* Collegamento a Analisi di Mercato */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Analisi di Mercato
            </h2>
            <p className="text-gray-500">Analizza il mercato.</p>
          </div>
          <Link to="/analisi-mercato">
            <Button className="bg-teal-600 hover:bg-teal-700">Vai</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
