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
import { useEffect } from "react";
import { RegisterAnimations } from "~/components/RegisterAnimations";
import { Link } from "react-router-dom";
import { Skills } from "./skills";
import { Hero } from "./hero";
import { Preloader } from "./preloader";
import Footer from "./footer";
import { BubbleEffectCanvas } from "~/components/BubbleEffectCanvas";

export const meta: MetaFunction = () => {
  return [{ title: "Michele Trombone Portfolio" }];
};

export default function Index() {
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
          <BubbleEffectCanvas />
          <RegisterAnimations />
          <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-32 relative z-20 pt-8">
            <Hero />
            <section id="skills" className="py-12">
              <Skills />
            </section>
            <section id="about" className="py-12 mb-12 animated-element">
              <h2 className="text-3xl font-bold text-slate-100 mb-8">
                <span className="text-[#64FFDA]">02. </span>
                <span className="pb-20 text-slate-100"> UN PO' DI ME</span>
                <div className="h-[1px] bg-slate-600 w-full mt-4"></div>{" "}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
                <div>
                  <p className="text-slate-400 mb-4 ">
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
                <div className="max-w-xl p-10 mx-auto ">
                  <img
                    src="https://micheletrombone.it/memoji-about-me.png"
                    alt="Michele Trombone"
                    className="rounded-3xl shadow-lg neon-green-shadow"
                  />
                </div>
              </div>
            </section>
            <section id="experience" className="py-12 mb-12 animated-element">
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

            <section id="work" className="py-12 animated-element">
              <h2 className="text-3xl font-bold text-slate-100 mb-8">
                <span className="text-[#64FFDA]">04. </span>
                <span className="pb-20 text-slate-100"> ULTIMI PROGETTI</span>
                <div className="h-[1px] bg-slate-600 w-full mt-4"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <AnimatedSection>
                  <div className="bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-50 mx-auto">
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
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        C#
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        PlasticSCM
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        Unity
                      </span>
                    </div>
                    {/* <a
                      href="https://github.com/Mischio95/EloHell/"
                      className="text-[#64FFDA] relative group"
                    >
                      <span className="relative inline-block">
                        Link GitHub!
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#64FFDA] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a> */}
                    <div className="w-full text-center pt-2">
                      {" "}
                      <Button3D href="https://github.com/Mischio95/EloHell/">
                        Link Github!
                      </Button3D>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-50 mx-auto">
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
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        C#
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        PlasticSCM
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        Unity
                      </span>
                    </div>
                    {/* <a
                      href="https://github.com/Mischio95/DAO"
                      className="text-[#64FFDA] relative group"
                    >
                      <span className="relative inline-block">
                        Link GitHub!
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#64FFDA] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a> */}
                    <div className="w-full text-center pt-2">
                      {" "}
                      <Button3D href="https://github.com/Mischio95/EloHell/">
                        Link Github!
                      </Button3D>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-50 mx-auto">
                    <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                      P-01 - Dark of Phos - APPLE DEVELOPER ACADEMY
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Platform Game 2D mobile a scorrimento laterale.
                    </p>
                    <p className="text-slate-400 mb-4">TECNOLOGIE:</p>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        Xcode
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        Swift
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        SpriteKit
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        Git
                      </span>
                    </div>
                    {/* <a
                      href="https://github.com/Mischio95/MC3-P-01"
                      className="text-[#64FFDA] relative group"
                    >
                      <span className="relative inline-block">
                        Link GitHub!
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#64FFDA] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a> */}
                    <div className="w-full text-center pt-2">
                      {" "}
                      <Button3D href="https://github.com/Mischio95/EloHell/">
                        Link Github!
                      </Button3D>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-50 mx-auto">
                    <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                      APPLE DEVELOPER WWDC23 - FALLINGNOTE
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Gioco Arcade per Swift Playground, iPadOS and iOS.
                    </p>
                    <p className="text-slate-400 mb-4">TECNOLOGIE:</p>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        Playgrounds
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        Swift
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        SpriteKit
                      </span>
                      <span className="w-24 border border-[#64FFDA] border-opacity-50 text-slate-300 px-2 py-1 rounded text-sm text-center">
                        Git
                      </span>
                    </div>
                    {/* <a
                      href="https://github.com/Mischio95/MC3-P-01"
                      className="text-[#64FFDA] relative group"
                    >
                      <span className="relative inline-block">
                        Link GitHub!
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#64FFDA] transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a> */}
                    <div className="w-full text-center pt-2">
                      {" "}
                      <Button3D href="https://github.com/Mischio95/EloHell/">
                        Link Github!
                      </Button3D>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </section>

            <section id="footer" className="py-2">
              <Footer />
            </section>
          </div>
        </>
      )}
    </main>
  );
}
