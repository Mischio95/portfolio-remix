import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import Button3D from "~/components/Button3D";
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
      style: { backgroundColor: "#64ffda", textColor: "#000000" },
    },
    {
      option: "Regalo 3",
      style: { backgroundColor: "#10172A", textColor: "#FFFFFF" },
    },
    {
      option: "Regalo 4",
      style: { backgroundColor: "#64ffda", textColor: "#000000" },
    },
    {
      option: "Regalo 5",
      style: { backgroundColor: "#10172A", textColor: "#FFFFFF" },
    },
    {
      option: "Regalo 6",
      style: { backgroundColor: "#64ffda", textColor: "#000000" },
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
    <div className="flex flex-col items-center justify-center h-screen">
      <audio
        ref={audioRef}
        src="https://www.micheletrombone.it/nostalgia.mp3"
        loop
      />
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
        outerBorderWidth={5} // Cambia il perimetro della ruota
        outerBorderColor={"#64ffda"} // Colore del bordo esterno
        innerRadius={5} // Raggio interno della ruota
        innerBorderColor={"#64ffda"} // Colore del bordo interno
        innerBorderWidth={5} // Larghezza del bordo interno
        radiusLineColor={"#64ffda"} // Colore delle linee del raggio
        radiusLineWidth={1} // Larghezza delle linee del raggio
        pointerProps={{
          src: "https://www.micheletrombone.it/sticker.webp", // Percorso dell'immagine personalizzata
          style: { width: "100px", height: "100px" },
        }}
      />
      <div className="pt-5">
        <Button3D onClick={handleSpinClick}>Gira la ruota!</Button3D>
      </div>

      <Dialog open={showDialog} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="border-2 border-[#64ffda] bg-[#10172A] text-white">
          <DialogHeader>
            <DialogTitle className="text-center font-bold uppercase">
              Risultato estrazione:
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <div className="my-4">
              <img
                src="https://www.micheletrombone.it/coupon-calcetto.png"
                alt="Prize"
                className="mx-auto border-2 border-[#64ffda] neon-green-shadow"
              />
            </div>
            <p className="my-4">Hai vinto: La mossa del "calcetto"</p>
            <Button3D onClick={handleDownloadImage}>Scarica Immagine</Button3D>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
