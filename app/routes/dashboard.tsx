import { Link, useLoaderData, redirect, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { LoaderFunction, json } from "@remix-run/node"; // LoaderFunction da usare nel server
import { useState, useEffect } from "react";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import Modal from "~/components/modali/spese/modale";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";

type LoaderData = {
  someData?: boolean; // Aggiungi una proprietà per i dati che vuoi caricare
};
// Definizione dello schema Zod
const pinSchema = z.object({
  pin: z.string().min(4, "Il PIN deve avere almeno 4 cifre"),
});

type PinForm = z.infer<typeof pinSchema>;

// Loader per caricare i dati e gestire l'accesso
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const accessKey = url.searchParams.get("key");

  // Ottieni la chiave segreta direttamente dalle variabili d'ambiente
  const SECRET_KEY =
    process.env.DASHBOARD_SECRET_KEY ||
    process.env.DDASHBOARD_SECRET_KEY2 ||
    "";

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
  const [isLoading, setIsLoading] = useState(false);

  // Stato per determinare quando i dati sono pronti per il rendering
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setIsDataLoaded(true); // Quando i dati sono caricati, attiviamo il flag
    }
  }, [data]);

  const handleExport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Invia la richiesta per generare il PDF
      const response = await fetch("/genera-pdf", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Errore durante la generazione del PDF.");
      }

      // Ottieni il blob del PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report-bp.pdf"); // Nome del file
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      // Rilascia l'URL del blob
      window.URL.revokeObjectURL(url);

      // Esegui il redirect dopo un breve ritardo per assicurarti che il download sia avviato
      setTimeout(() => {
        window.location.href =
          "https://micheletrombone.it/dashboard?key=nE4YcUuTT7WQDmu1OA4BNxSYQmG7OaijSVjIOOxa3Q";
      }, 2000); // Aumentato a 2000ms per garantire il download
    } catch (error) {
      console.error("Errore durante l'esportazione del PDF:", error);
      alert(
        "Si è verificato un errore durante l'esportazione del PDF. Riprova."
      );
      setIsLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PinForm>({
    resolver: zodResolver(pinSchema),
  });

  const onSubmit = (data: PinForm) => {
    const correctPin = "040360"; // Sostituisci con il PIN corretto
    if (data.pin === correctPin) {
      setIsModalOpen(false);
      reset();
      navigate("/spese-personali-index");
    } else {
      alert("PIN errato. Riprova.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 top-20">
      {/* <AppSidebar /> */}
      {/* Mostra solo l'animazione se i dati sono stati caricati */}
      {isDataLoaded ? (
        <motion.h1
          className="text-4xl font-bold mb-10 text-[#111f43]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard Principale
        </motion.h1>
      ) : (
        <div className="text-gray-500">
          Caricamento in corso... <br />
          Verifica la connessione o il caricamento dei dati.
        </div>
      )}
      <motion.h1
        className="text-2xl  mb-2 text-[#111f43]"
        initial={{ opacity: -50, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Sezione Business Plan
      </motion.h1>
      {/* Contenuto della Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#111f43]">Fornitori</h2>
            {/* <p className="text-gray-500">Gestisci la tua lista di fornitori.</p> */}
          </div>
          <Link to="/fornitori">
            <ButtonCustom>Vai</ButtonCustom>
          </Link>
        </motion.div>
        {/* Collegamento a Piano Investimento */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#111f43]">
              Piano di Investimento
            </h2>
            {/* <p className="text-gray-500">
              Visualizza e modifica il piano di investimento.
            </p> */}
          </div>
          <Link to="/piano-investimento">
            <ButtonCustom>Vai</ButtonCustom>
          </Link>
        </motion.div>
        {/* Collegamento a Lista Competitor */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#111f43]">
              Lista Competitor
            </h2>
            {/* <p className="text-gray-500">Inserire reference</p> */}
          </div>
          <Link to="/lista-competitor">
            <ButtonCustom>Vai</ButtonCustom>
          </Link>
        </motion.div>
        {/* Collegamento a Analisi di Mercato */}
        {/* <motion.div
          className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#111f43]">
              Analisi di Mercato
            </h2>
            <p className="text-gray-500">Analizza il mercato.</p>
          </div>
          <Link to="/analisi-mercato">
            <ButtonCustom>Vai</ButtonCustom>
          </Link>
        </motion.div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full max-w-4xl mt-6">
        <motion.div
          className="bg-white w-full p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#111f43]">
              Esporta Dati in PDF
            </h2>
          </div>
          {/* Form per Esportare il PDF */}
          {isDataLoaded && (
            <form method="post" action="/genera-pdf" onSubmit={handleExport}>
              <ButtonCustom type="submit" disabled={isLoading}>
                ESPORTA
              </ButtonCustom>
            </form>
          )}
        </motion.div>
      </div>
      {/* Progress Bar */}
      {isLoading && (
        <div className="mt-6 w-full max-w-sm">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-[#111f43] h-4 rounded-full animate-pulse"></div>
          </div>
          <p className="text-[#111f43] mt-2 text-center">
            Generazione del PDF in corso...
          </p>
        </div>
      )}

      <motion.h1
        className="text-2xl mb-2 pt-4 text-[#111f43]"
        initial={{ opacity: -50, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Divider Blu Aggiunto */}
        <div className="border-t-2 w-[400px] justify-center border-[#111f43] my-4"></div>
        <p className="text-center">Sezione Preventivi</p>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full max-w-4xl mt-0 mb-5">
        <motion.div
          className="bg-white w-full p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#111f43]">
              Gestisci Preventivi
            </h2>
          </div>
          <Link to="/preventivi">
            {" "}
            <ButtonCustom>Vai</ButtonCustom>
          </Link>
        </motion.div>
      </div>
      <motion.h1
        className="text-2xl mb-2 text-[#111f43]"
        initial={{ opacity: -50, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Divider Blu Aggiunto */}
        <div className="border-t-2 w-[400px] justify-center border-[#111f43] my-4"></div>
        <p className="text-center">Sezione Spese Personali</p>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full max-w-4xl mt-0 mb-5">
        <motion.div
          className="bg-white w-full p-6 rounded-lg shadow-lg flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDataLoaded ? 1 : 0 }} // Animazione che dipende dai dati caricati
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#111f43]">
              Gestione Spese
            </h2>
          </div>
          <ButtonCustom onClick={() => setIsModalOpen(true)}>Vai</ButtonCustom>
        </motion.div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl mb-4 text-center text-[#111f43]">
            Inserisci il PIN
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <Input
              type="password"
              {...register("pin")}
              className="mb-2 p-2 border border-gray-300 rounded text-[#111f43]"
              placeholder="Inserisci il PIN"
            />
            {errors.pin && (
              <span className="text-red-500 text-sm">{errors.pin.message}</span>
            )}
            <ButtonCustom type="submit" className="mt-4">
              Conferma
            </ButtonCustom>
          </form>
        </Modal>
      )}
    </div>
  );
}
