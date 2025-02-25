import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "~/components/ui/dialog";
import Button3D from "~/components/buttons/Button3D";
import Button3Druota from "~/components/buttons/Button3Druota";
import { motion } from "framer-motion";

// Importa il componente Wheel dinamicamente per evitare l'errore lato server
const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

export default function WheelGame() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const data = [
    {
      option: "Regalo 1",
      style: { backgroundColor: "#10172A", textColor: "#FFFFFF" },
    },
    {
      option: "Regalo 2",
      style: { backgroundColor: "#ebe5d4", textColor: "#000000" },
    },
    {
      option: "Regalo 3",
      style: { backgroundColor: "#10172A", textColor: "#FFFFFF" },
    },
    {
      option: "Regalo 4",
      style: { backgroundColor: "#ebe5d4", textColor: "#000000" },
    },
    {
      option: "Regalo 5",
      style: { backgroundColor: "#10172A", textColor: "#FFFFFF" },
    },
    {
      option: "Regalo 6",
      style: { backgroundColor: "#ebe5d4", textColor: "#000000" },
    },
  ];

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    setShowDialog(isOpen);
    if (audioRef.current && isOpen) {
      audioRef.current.pause();
    }
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = "https://www.micheletrombone.it/coupon-calcetto.png"; // Percorso dell'immagine da scaricare
    link.download = "coupon-calcetto.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden pt-0 mt-0">
      <audio
        ref={audioRef}
        src="https://www.micheletrombone.it/nostalgia.mp3"
        loop
      />
      <section className="text-center pb-8 mt-0">
        <h1 className="text-3xl font-bold animate-zoom text-[#ebe5d4]">
          <span>
            Sei nostalgico?
            <br />
            E che c'è di male?
            <br />
            NULLA!
          </span>
        </h1>
      </section>
      <div className="relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            setShowDialog(true);
            if (audioRef.current) {
              audioRef.current.pause();
            }
          }}
          outerBorderWidth={3} // Cambia il perimetro della ruota
          outerBorderColor={"#ebe5d4"} // Colore del bordo esterno
          innerRadius={5} // Raggio interno della ruota
          innerBorderColor={"#ebe5d4"} // Colore del bordo interno
          innerBorderWidth={5} // Larghezza del bordo interno
          radiusLineColor={"#ebe5d4"} // Colore delle linee del raggio
          radiusLineWidth={1} // Larghezza delle linee del raggio
          pointerProps={{
            src: "https://www.micheletrombone.it/sticker.webp", // Percorso dell'immagine personalizzata
            style: { width: "100px", height: "100px" },
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://micheletrombone.it/sbanchi.png"
            alt="Center Icon"
            className="w-4 h-4 md:w-5 md:h-5 rounded-full"
          />
        </div>
      </div>
      <div className="pt-5">
        <Button3Druota onClick={handleSpinClick}>Gira la ruota!</Button3Druota>
      </div>

      <Dialog open={showDialog} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="rounded-md border-2 border-[#ebe5d4] bg-[#10172A] text-white">
          <DialogHeader>
            <DialogTitle className="text-center font-bold uppercase text-3xl text-[#ebe5d4] tracking-wider">
              Risultato estrazione
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <div className="my-4">
              <img
                src="https://www.micheletrombone.it/coupon-calcetto.png"
                alt="Prize"
                className="mx-auto border-2 border-[#ebe5d4] rounded-lg "
              />
            </div>
            <p className="my-6 text-xl font-bold text-[#ff224e] uppercase">
              Hai vinto <br />
              <p className="text-xl uppercase">La mossa del "calcetto"</p>
            </p>
            <Button3Druota onClick={handleDownloadImage}>
              Scarica il coupon
            </Button3Druota>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
