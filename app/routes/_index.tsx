import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { Nav } from "~/components/nav";
import { SocialSidebar } from "~/components/social-sidebar";
import { EmailSidebar } from "~/components/email-sidebar";
import { BubbleEffect } from "~/components/bubbleeffect";
import { AnimatedSection } from "~/components/animatedsection";
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Button from "~/components/button";
import AnimatedButton from "~/components/AnimatedButton";
import Button3D from "~/components/Button3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { registerAnimations } from "~/components/registerAnimations";
import { Link } from "react-router-dom";
import { Skills } from "./skills";
import { Hero } from "./hero";
import { Preloader } from "./preloader";
import Footer from "./footer";

export const meta: MetaFunction = () => {
  return [{ title: "Michele Trombone" }];
};

export default function Index() {
  useEffect(() => {
    registerAnimations();
  }, []);

  const [loading, setLoading] = useState(true);

  const handleFinishLoading = () => {
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#10172A] relative overflow-hidden z-10">
      {loading && <Preloader onFinish={handleFinishLoading} />}
      {!loading && (
        <>
          <Nav />
          <SocialSidebar />
          <EmailSidebar />
          <BubbleEffect />
          <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-32 relative z-20 pt-8">
            <Hero />
            <section id="skills" className="py-7 animated-element">
              <Skills />
            </section>
            <section id="about" className="py-7 animated-element">
              <h2 className="text-3xl font-bold text-slate-100 mb-8">
                <span className="text-[#64FFDA]">02. </span>
                <span className="pb-20 text-slate-100"> UN PO' DI ME</span>
                <div className="h-[1px] bg-slate-600 w-full mt-4"></div>{" "}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-slate-400 mb-4">
                    Ciao! Sono Michele Trombone, uno sviluppatore appassionato
                    di tecnologia e programmazione, con un interesse particolare
                    per il mondo dei videogiochi e tutto ciò che lo circonda. Mi
                    piace esplorare vari aspetti del settore, dal game design
                    alla creazione di esperienze coinvolgenti, inclusa
                    l’importanza dell’audio e delle musiche. Questa passione per
                    la tecnologia mi spinge a cercare opportunità in diversi
                    ambiti, contribuendo a progetti di vario tipo.
                  </p>
                  <p className="text-slate-400 mb-4">
                    Durante il mio percorso di studi, ho acquisito competenze
                    tecniche su vari linguaggi di programmazione. Grazie alla
                    mia passione per questa materia, ho frequentato diversi
                    corsi online su piattaforme come Learnn e Udemy per ampliare
                    e approfondire le mie competenze.
                  </p>
                  <p className="text-slate-400 mb-4">
                    Durante il percorso di 9 mesi alla Apple Developer Academy,
                    mi sono specializzato nello sviluppo di videogiochi,
                    approfondendo l'uso di Unity e dei framework Apple, come
                    SpriteKit, dedicati al game development. Inoltre, ho
                    sviluppato competenze nella creazione di applicazioni mobili
                    con Swift e SwiftUI utilizzando Xcode. La metodologia
                    didattica adottata alla Apple Developer Academy è basata sul
                    Challenge-Based Learning (CBL), che mi ha permesso di
                    affrontare sfide pratiche e di apprendere attraverso la
                    risoluzione di problemi reali.
                  </p>
                  <p className="text-slate-400 mb-4">
                    Per me, il lavoro di squadra è fondamentale. L'ho
                    sperimentato anche nei miei lavori passati e credo che,
                    collaborandom si possa raggiungere il massimo potenziale in
                    un progetto. Sono entusiasta di continuare a crescere
                    professionalmente in questo settore affascinante e dinamico.
                  </p>
                </div>
                <div className="max-w-fit p-10 mx-auto">
                  <img
                    src="http://micheletrombone.netsons.org/wp-content/uploads/2024/07/image-3.png"
                    alt="Michele Trombone"
                    className="rounded-3xl shadow-lg"
                  />
                </div>
              </div>
            </section>
            <section id="experience" className="py-7 animated-element">
              <h2 className="text-3xl font-bold text-slate-100 mb-8">
                <span className="text-[#64FFDA]">03. </span>
                <span className="pb-20 text-slate-100">
                  {" "}
                  ESPERIENZE LAVORATIVE
                </span>
                <div className="h-[1px] bg-slate-600 w-full mt-4"></div>{" "}
              </h2>
              <div className="space-y-8 ">
                <AnimatedSection>
                  <div className="bg-[#10172A] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                      Full Stack Developer | ADDWAY ADVISORY SRL
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Dicembre 2024 - in corso
                    </p>
                    <ul className="list-disc list-inside text-slate-400">
                      <li>
                        Sviluppo e manutenzione di web app scalabili utilizzando
                        React, Remix e TypeScript.
                      </li>
                      <li>
                        Gestione dell’integrazione con database PostgreSQL
                        tramite Prisma ORM e scrittura di query SQL.
                      </li>
                      <li>
                        Configurazione e gestione di server Linux con Nginx e
                        PM2 per il deployment e il bilanciamento del carico
                        delle web app.
                      </li>
                      <li>
                        Ottimizzazione delle performance e strutturazione
                        modulare del codice per migliorare scalabilità e
                        manutenzione.
                      </li>
                    </ul>
                  </div>
                </AnimatedSection>
                <AnimatedSection>
                  <div className="bg-[#10172A] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                      WORDPRESS & SHOPIFY DEVELOPER | Libero Professionista
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Giugno 2019 - Settembre 2024
                    </p>
                    <ul className="list-disc list-inside text-slate-400">
                      <li>
                        Progettazione, creazione e manutenzione di siti:
                        E-Commerce (WooCommerce) e Vetrina.
                      </li>
                      <li>Sviluppo del layout web.</li>
                      <li>
                        Caricamento e gestione dei contenuti delle pagine web e
                        ottimizzazione SEO.
                      </li>
                      <li>
                        Pubblicazione del sito online e configurazione di server
                        e hosting.
                      </li>
                      <li>
                        Implementazione di misure di sicurezza (SSL, firewall,
                        plugin di sicurezza).
                      </li>
                      <li>
                        Supporto e formazione per i clienti sull'uso e la
                        gestione dei loro siti.
                      </li>
                    </ul>
                  </div>
                </AnimatedSection>
              </div>
            </section>

            <section id="work" className="py-7 animated-element">
              <h2 className="text-3xl font-bold text-slate-100 mb-8">
                <span className="text-[#64FFDA]">04. </span>
                <span className="pb-20 text-slate-100"> ULTIMI PROGETTI</span>
                <div className="h-[1px] bg-slate-600 w-full mt-4"></div>{" "}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection>
                  <div className="bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-20">
                    <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                      HACKATHON - MOBILE GAME DEVELOPMENT (BITDROME - MKERS){" "}
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Elo Hell | 20 Ottobre - 10 Novembre 2023.
                    </p>
                    <p className="text-slate-400 mb-4">
                      Sviluppo di una demo di un Mobile Game con Unity.
                    </p>
                    <p className="text-slate-400 mb-4">TECNOLOGIE:</p>
                    <div className="flex gap-2 mb-4">
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        C#
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        PlasticSCM
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        Unity Engine
                      </span>
                    </div>
                    <a
                      href="https://github.com/Mischio95/EloHell/"
                      className="text-[#64FFDA] relative group"
                    >
                      <span className="relative inline-block">
                        Link GitHub!
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#64FFDA] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a>
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-20">
                    <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                      Destiny's Altered Order - APPLE DEVELOPER ACADEMY
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Challenge fine anno accademico
                    </p>
                    <p className="text-slate-400 mb-4">
                      Gioco di ruolo 2D per mobile sviluppato con Unity.
                    </p>
                    <p className="text-slate-400 mb-4">TECNOLOGIE:</p>
                    <div className="flex gap-2 mb-4">
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        C#
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        PlasticSCM
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        Unity Engine
                      </span>
                    </div>
                    <a
                      href="https://github.com/Mischio95/DAO"
                      className="text-[#64FFDA] relative group"
                    >
                      <span className="relative inline-block">
                        Link GitHub!
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#64FFDA] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a>
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-20">
                    <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                      P-01 - Dark of Phos - APPLE DEVELOPER ACADEMY
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Platform Game 2D mobile a scorrimento laterale.
                    </p>
                    <p className="text-slate-400 mb-4">TECNOLOGIE:</p>
                    <div className="flex gap-2 mb-4">
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        Xcode
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        Swift
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        SpriteKit
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        Git
                      </span>
                    </div>
                    <a
                      href="https://github.com/Mischio95/MC3-P-01"
                      className="text-[#64FFDA] relative group"
                    >
                      <span className="relative inline-block">
                        Link GitHub!
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#64FFDA] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a>
                  </div>
                </AnimatedSection>
                <AnimatedSection>
                  <div className="bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-20">
                    <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                      APPLE DEVELOPER WWDC23 - FALLINGNOTE
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Gioco Arcade per Swift Playground, iPadOS and iOS.
                    </p>
                    <p className="text-slate-400 mb-4">TECNOLOGIE:</p>
                    <div className="flex gap-2 mb-4">
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        Playgrounds
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        Swift
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        SpriteKit
                      </span>
                      <span className="border border-[#64FFDA] border-opacity-20 text-slate-300 px-2 py-1 rounded text-sm">
                        Git
                      </span>
                    </div>
                    <a
                      href="https://github.com/Mischio95/MC3-P-01"
                      className="text-[#64FFDA] relative group"
                    >
                      <span className="relative inline-block">
                        Link GitHub!
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#64FFDA] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a>
                  </div>
                </AnimatedSection>
              </div>
            </section>

            <section id="contact" className="py-7 mt-[120px] mb-[100px]">
              <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">
                Resta in contatto!
              </h2>
              <p className="text-slate-400 text-center mb-8 max-w-200 mx-auto">
                Se ti è piaciuto ciò che hai visto nel mio portfolio o se hai
                domande, progetti o collaborazioni in mente, non esitare a
                metterti in contatto con me! Sono sempre aperto a nuove
                opportunità e conversazioni. Inviami una mail, e risponderò al
                più presto.
              </p>
              <div className="text-center">
                <Button3D href="mailto:michele.trombone@example.com">
                  Inviami un messaggio!
                </Button3D>
              </div>
            </section>
            <section id="footer" className="py-7">
              <Footer />
            </section>
          </div>
        </>
      )}
    </main>
  );
}