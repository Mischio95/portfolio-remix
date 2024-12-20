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
        }}
        outerBorderWidth={5} // Cambia il perimetro della ruota
        outerBorderColor={"#64ffda"} // Colore del bordo esterno
        innerRadius={5} // Raggio interno della ruota
        innerBorderColor={"#64ffda"} // Colore del bordo interno
        innerBorderWidth={5} // Larghezza del bordo interno
        radiusLineColor={"#64ffda"} // Colore delle linee del raggio
        radiusLineWidth={1} // Larghezza delle linee del raggio
        pointerProps={{
          src: "https://www.micheletrombone.it/kapponenostalgico.png", // Percorso dell'immagine personalizzata
          style: { width: "80px", height: "65px" },
        }}
      />
      <div className="pt-5">
        <Button3D onClick={handleSpinClick}>Gira la ruota!</Button3D>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="border-2 border-[#64ffda] bg-[#10172A] text-white">
          <DialogHeader>
            <DialogTitle>Risultato</DialogTitle>
          </DialogHeader>
          <img
            src="https://www.micheletrombone.it/coupone.png"
            alt="coupone"
            className="mx-auto"
          />
          <p>Hai vinto: {data[prizeNumber].option}</p>
          <Button3D> Scarica il Coupon </Button3D>
        </DialogContent>
      </Dialog>
    </div>
  );
}
