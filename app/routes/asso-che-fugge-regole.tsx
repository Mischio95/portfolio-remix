import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { useState } from "react";

export default function AssoCheFuggeRegole() {
  const [openItem, setOpenItem] = useState("item-1");

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <Accordion
        type="single"
        value={openItem}
        onValueChange={setOpenItem}
        className="space-y-4"
      >
        <AccordionItem value="item-1" className="bg-gray-800 p-4 rounded-lg">
          <AccordionTrigger className="text-[#64FFDA] font-bold">
            Le regole di base
          </AccordionTrigger>
          <AccordionContent className="text-white mt-2">
            Per giocare ad Asso che fugge occorre un mazzo da 40 carte
            regionali. Per iniziare una partita bisogna essere almeno in 2, fino
            ad un massimo di 6 partecipanti. A differenza di quanto avviene
            nella maggior parte dei giochi di carte online, ogni giocatore
            dispone di 3 vite all’inizio della partita e il suo obiettivo è
            quello di evitare ad ogni giro di carte gli Assi. Se tra le regole
            del Tressette o tra le regole del 31 scopriamo che l’Asso è molto
            ambito, qui rappresenta invece la carta di minor valore. Il mazziere
            distribuisce una carta a testa e i vari partecipanti possono
            scambiarla soltanto con il giocatore alla propria destra, ignorando
            però il valore della carta che riceveranno. Ci sono però dei casi in
            cui lo scambio potrebbe non va a buon fine: se la persona alla quale
            viene richiesto possiede un Re, infatti, può bloccare il passaggio e
            lasciare la situazione invariata, mentre esibendo un Cavallo fa sì
            che la carta inizialmente destinata a sé finisca nelle mani del
            giocatore successivo. Entro la fine del giro, che viene completato
            quando tocca proprio al mazziere, bisogna cercare di non ritrovarsi
            in mano con una carta di basso valore, in quanto chi detiene il
            punteggio inferiore alla fine della mano perde una vita. Ad ogni
            carta è associato infatti un punteggio che va da 1 a 10, partendo
            dall’Asso per arrivare a 3. Consumare tutte le vite, comunque, non
            implica l’esclusione definitiva dalla partita, in quanto se un
            “morto” riesce a far rispondere uno dei giocatori ancora attivi ad
            una propria domanda può tornare in gara. La partita termina solo
            alla fine della sfida tra gli ultimi 2 giocatori rimasti.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="bg-gray-800 p-4 rounded-lg">
          <AccordionTrigger className="text-[#64FFDA] font-bold">
            Il ruolo del mazziere
          </AccordionTrigger>
          <AccordionContent className="text-white mt-2">
            La figura del mazziere è una delle più delicate nell’Asso che fugge.
            A lui non spetta soltanto il compito di mescolare le carte, ma anche
            quello di distribuirle a tutti in rigoroso senso antiorario. Le
            carte che avanzano vanno poi messe da parte, coperte. A dare il via
            alla mano è il partecipante posizionato alla destra del mazziere,
            decidendo se conservare la carta appena ricevuta da quest’ultimo
            oppure scambiarla con il giocatore successivo, il quale non può
            opporsi a meno che non possieda un Re o un Cavallo. Le regole del
            mazziere nell’Asso che fugge stabiliscono che, quando toccherà a
            lui, questi abbia la possibilità di scambiare la carta consegnatagli
            da un altro giocatore con quella che si trova in cima al mazzo
            coperto, senza coinvolgere dunque il partecipante che si trovava
            all’inizio del giro.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="bg-gray-800 p-4 rounded-lg">
          <AccordionTrigger className="text-[#64FFDA] font-bold">
            La regola del "morto"
          </AccordionTrigger>
          <AccordionContent className="text-white mt-2">
            Le regole dell’Asso che corre sono piuttosto basilari. Non a caso
            stiamo parlando di un gioco molto in voga tra i ragazzini nei
            periodi di vacanza, sia d’estate sia a Natale. Di certo, la regola
            più stravagante e forse anche divertente è quella del “morto”, che
            consente a tutti i partecipanti di tornare in gioco anche dopo
            essere stati eliminati. Per recuperare una vita bisogna rivolgersi
            ai giocatori ancora in partita e strappare loro una risposta. Basta
            anche un solo sospiro o un cenno di fronte alla domanda di un
            giocatore che ha già perso le sue vite per farlo rientrare in gara.
            Non sembra esserci però un criterio fisso che governa questa regola:
            c’è chi sostiene che il “morto” possa sottrarre solo una vita alla
            sua vittima e chi afferma invece che gliele rubi tutte. Anche in
            virtù di questa regola, comunque, ottenere una trasposizione
            digitale dell’Asso che fugge è alquanto proibitivo, dal momento che
            quando si gioca online si ha difficilmente l’opportunità di
            comunicare a voce con gli altri. Non esistono particolari varianti
            del gioco: l’unica differenza può risiedere per l’appunto
            nell’interpretazione della regola sul “morto”.{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
