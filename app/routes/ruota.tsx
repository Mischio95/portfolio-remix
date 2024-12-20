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
      option: "Choice 1",
      style: { backgroundColor: "#FF5733", textColor: "#FFFFFF" },
    },
    {
      option: "Choice 2",
      style: { backgroundColor: "#33FF57", textColor: "#000000" },
    },
    {
      option: "Choice 3",
      style: { backgroundColor: "#3357FF", textColor: "#FFFFFF" },
    },
    {
      option: "Choice 4",
      style: { backgroundColor: "#FF33A1", textColor: "#000000" },
    },
    {
      option: "Choice 5",
      style: { backgroundColor: "#A133FF", textColor: "#FFFFFF" },
    },
    {
      option: "Choice 6",
      style: { backgroundColor: "#33FFA1", textColor: "#000000" },
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
