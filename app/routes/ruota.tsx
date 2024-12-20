import React, { useState, useEffect } from "react";
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

  const data = [
    {
      option: "SecretSanta 1",
      style: { backgroundColor: "#10172A", textColor: "#FFFFFF" },
    },
    {
      option: "SecretSanta 2",
      style: { backgroundColor: "#64ffda", textColor: "#000000" },
    },
    {
      option: "SecretSanta 3",
      style: { backgroundColor: "#10172A", textColor: "#FFFFFF" },
    },
    {
      option: "SecretSanta 4",
      style: { backgroundColor: "#64ffda", textColor: "#000000" },
    },
    {
      option: "SecretSanta 5",
      style: { backgroundColor: "#10172A", textColor: "#FFFFFF" },
    },
    {
      option: "SecretSanta 6",
      style: { backgroundColor: "#64ffda", textColor: "#000000" },
    },
  ];

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
        radiusLineWidth={1} // Larghezza delle linee del
        pointerProps={{
          src: "/kapponenostalgico.png", // Percorso dell'immagine personalizzata
          style: { width: "120px", height: "90px" },
        }}
      />

      <Button3D onClick={handleSpinClick}>Gira la ruota!</Button3D>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="border-2 border-[#64ffda] bg-[#10172A] text-white">
          <DialogHeader>
            <DialogTitle>Risultato</DialogTitle>
          </DialogHeader>
          <p>Hai vinto: {data[prizeNumber].option}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
