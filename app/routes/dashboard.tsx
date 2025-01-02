import { Link, useLoaderData, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { LoaderFunction, json } from "@remix-run/node"; // LoaderFunction da usare nel server
import { useState, useEffect } from "react";

type LoaderData = {
  someData?: boolean; // Aggiungi una proprietà per i dati che vuoi caricare
};

// Loader per caricare i dati e gestire l'accesso
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const accessKey = url.searchParams.get("key");

  // Ottieni la chiave segreta direttamente dalle variabili d'ambiente
  const SECRET_KEY = process.env.DASHBOARD_SECRET_KEY || "";

  if (accessKey !== SECRET_KEY) {
    return redirect("/accesso-negato");
  }

  // Simula dei dati (puoi sostituirlo con i dati reali se necessario)
  return json<LoaderData>({
    someData: true, // Simuliamo che ci siano dei dati
  });
};

export default function Dashboard() {
  const data = useLoaderData<LoaderData>();

  // Stato per determinare quando i dati sono pronti per il rendering
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setIsDataLoaded(true); // Quando i dati sono caricati, attiviamo il flag
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Mostra solo l'animazione se i dati sono stati caricati */}
      {isDataLoaded ? (
        <motion.h1
          className="text-4xl font-bold mb-10 text-black"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Business Plan Dashboard
        </motion.h1>
      ) : (
        <div className="text-gray-500">
          Caricamento in corso... <br />
          Verifica la connessione o il caricamento dei dati.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Collegamento a Fornitori */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Fornitori</h2>
            <p className="text-gray-500">Gestisci la tua lista di fornitori.</p>
          </div>
          <Link to="/fornitori">
            <Button className="bg-blue-600 hover:bg-blue-700">Vai</Button>
          </Link>
        </motion.div>

        {/* Collegamento a Piano Investimento */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
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

        {/* ESPORTA PDF */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Esporta Dati in PDF
            </h2>
          </div>
          <form
            method="post"
            action="/genera-pdf"
            onSubmit={() =>
              setTimeout(
                () =>
                  (window.location.href =
                    "https://micheletrombone.it/dashboard?key=nE4YcUuTT7WQDmu1OA4BNxSYQmG7OaijSVjIOOxa3Q"),
                3000
              )
            }
          >
            <Button
              type="submit"
              className="text-black bg-teal-300 hover:bg-teal-300"
            >
              ESPORTA
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
