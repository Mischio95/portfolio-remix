import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Giochi() {
  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Lista Giochi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border border-[#64FFDA]">
          <CardHeader>
            <CardTitle className="text-[#64FFDA] text-2xl">
              Asso che Fugge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white mb-4">
              I giochi di carte riescono a riunire amici o parenti anche con
              poche e semplici regole. Non è sempre necessario agire in squadra
              o calcolare meticolosamente i punteggi ottenuti. Il gioco Asso che
              fugge è infatti molto più immediato e sbrigativo, pur non
              rinunciando alla componente strategica. Si tratta di un passatempo
              particolarmente apprezzato e diffuso soprattutto a Napoli e
              dintorni, dove è conosciuto anche come Asso che corre o
              Saltacavallo. Ad ogni buon conto, anche in questo caso la fortuna
              fa sempre la sua parte.
            </p>
            <Link to="/asso-che-fugge" className="text-[#64FFDA] underline">
              Vai al gioco
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
