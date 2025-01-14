"use client";
import type { MetaFunction } from "@remix-run/node";
import { Nav } from "~/components/home-page/nav";
import { SocialSidebar } from "~/components/social-sidebar";
import { EmailSidebar } from "~/components/email-sidebar";
import { AnimatedSection } from "~/components/animatedsection";
import React, { useRef, useState } from "react";
import { RegisterAnimations } from "~/components/registerAnimations";
import { Skills } from "../components/home-page/skills";
import { Hero } from "../components/home-page/hero";
import { Preloader } from "./preloader";
import Footer from "../components/home-page/footer";
import { BubbleEffectCanvas } from "~/components/BubbleEffectCanvas";
import UltimiLavori from "~/components/ultimi-lavori";
import FluidButton from "~/components/buttons/FluidButton";
import WorkExperience from "~/components/home-page/WorkExperience";
import { motion, useInView } from "framer-motion";

export const meta: MetaFunction = () => {
  return [{ title: "Michele Trombone Portfolio" }];
};

export default function Index() {
  const [loading, setLoading] = useState(true);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { amount: 0.5 });

  const handleFinishLoading = () => {
    setLoading(false);
  };

  return (
    <div className="wrapper">
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
              <section id="about" className="py-12 mb-12">
                <h2 className=" text-3xl font-bold text-slate-100 mb-8">
                  <span className="text-[#64FFDA] font-mono">02. </span>
                  <span className="pb-20 text-slate-100"> UN PO' DI ME</span>
                  <div className="h-[1px] bg-slate-600 w-full mt-4"></div>{" "}
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-center md:text-left box-shadow-section-home rounded-xl ">
                  <div>
                    <p className="text-slate-400 mb p-12 mx-auto">
                      Ciao! Sono Michele Trombone, uno sviluppatore appassionato
                      di tecnologia e programmazione, con un interesse
                      particolare per il mondo dei videogiochi e tutto ciò che
                      lo circonda. Mi piace esplorare vari aspetti del settore,
                      dal game design alla creazione di esperienze coinvolgenti,
                      inclusa l’importanza dell’audio e delle musiche. Questa
                      passione per la tecnologia mi spinge a cercare opportunità
                      in diversi ambiti, contribuendo a progetti di vario tipo.
                      {/* <br />
                      <br /> */}
                      {/* <p className="text-slate-400 mb-4">
                      Durante il mio percorso di studi, ho acquisito competenze
                      tecniche su vari linguaggi di programmazione. Grazie alla
                      mia passione per questa materia, ho frequentato diversi
                      corsi online su piattaforme come Learnn e Udemy per
                      ampliare e approfondire le mie competenze.
                    </p> */}
                      {/* Durante il percorso di 9 mesi alla Apple Developer
                      Academy, mi sono specializzato nello sviluppo di
                      videogiochi, approfondendo l'uso di Unity e dei framework
                      Apple, come SpriteKit, dedicati al game development.
                      Inoltre, ho sviluppato competenze nella creazione di
                      applicazioni mobili con Swift e SwiftUI utilizzando Xcode.
                      La metodologia didattica adottata alla Apple Developer
                      Academy è basata sul Challenge-Based Learning (CBL), che
                      mi ha permesso di affrontare sfide pratiche e di
                      apprendere attraverso la risoluzione di problemi reali. */}
                      <br />
                      <br />
                      Per me, il lavoro di squadra è fondamentale e credo che,
                      collaborandom si possa raggiungere il massimo potenziale
                      in un progetto. Sono entusiasta di continuare a crescere
                      professionalmente in questo settore affascinante e
                      dinamico.
                    </p>
                  </div>
                  <div className="max-w-xl p-12 w-[450px] mx-auto">
                    <div className="animated-border rounded-xl">
                      <img
                        src="https://micheletrombone.it/memoji-about-me.png"
                        alt="Michele Trombone"
                        className="z-30 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section id="experience" className="py-12 mb-12">
                <h2 className="text-3xl font-bold text-slate-100 mb-8">
                  <span className="text-[#64FFDA] font-mono">03. </span>
                  <span className="pb-20 text-slate-100">
                    {" "}
                    ESPERIENZE LAVORATIVE
                  </span>
                  <div className="h-[1px] bg-slate-600 w-full mt-4 "></div>
                </h2>
                <div className="w-full">
                  <WorkExperience />

                  {/*
                  <section className="box-shadow-section-home rounded-lg">
                    <AnimatedSection>
                      <div className="bg-[#10172A] p-6 rounded-lg  w-full ">
                        <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                          Full Stack Developer | ADDWAY ADVISORY SRL
                        </h3>
                        <p className="text-slate-400 mb-4">
                          Dicembre 2024 - in corso
                        </p>
                        <ul className="list-disc list-inside text-slate-400 sm:font-size[10px]">
                          <li className="text-[14px] pb-2">
                            Sviluppo e manutenzione di web app scalabili
                            utilizzando React, Remix e TypeScript. <br />
                          </li>
                          <li className="text-[14px] pb-2">
                            Gestione dell’integrazione con database PostgreSQL
                            tramite Prisma ORM e scrittura di query SQL.
                            <br />
                          </li>
                          <li className="text-[14px] pb-2">
                            Configurazione e gestione di server Linux con Nginx
                            e PM2 per il deployment e il bilanciamento del
                            carico delle web app.
                            <br />
                          </li>
                          <li className="text-[14px] pb-2">
                            Ottimizzazione delle performance e strutturazione
                            modulare del codice per migliorare scalabilità e
                            manutenzione.
                            <br />
                          </li>
                        </ul>
                      </div>
                    </AnimatedSection>
                  </section>
                  <section className="box-shadow-section-home rounded-lg">
                    <AnimatedSection>
                      <div className="bg-[#10172A] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                          Game Developer | FOREACHSOFTWARE (Startup costituenda)
                        </h3>
                        <p className="text-slate-400 mb-4">
                          Gennaio 2024 - Settembre 2024
                        </p>
                        <ul className="list-disc list-inside text-slate-400 lg:text-[16px] md:text-[14px] sm:text-[12px]">
                          <li className="text-[14px] pb-2">
                            Sviluppo e implementazione delle meccaniche di gioco
                            per un titolo 2D Metroidvania utilizzando Unity e
                            C#, con particolare attenzione alla struttura basata
                            su componenti.
                          </li>
                          <li className="text-[14px] pb-2">
                            Redazione e gestione del Game Design Document (GDD),
                            includendo dettagli tecnici su sistemi di gioco,
                            interfacce utente e logiche di progressione.
                          </li>
                          <li className="text-[14px] pb-2">
                            Programmazione e ottimizzazione di sistemi di
                            movimento e interazione tramite RigidBody2D,
                            Collider2D, e Physics2D API.
                          </li>
                          <li className="text-[14px] pb-2">
                            Creazione di animazioni fluide con il Animator
                            Controller, utilizzando stati animati complessi e
                            transizioni parametrizzate per un gameplay reattivo.
                          </li>
                          <li className="text-[14px] pb-2">
                            Implementazione e gestione di effetti particellari
                            con Unity Particle System.
                          </li>
                          <li className="text-[14px] pb-2">
                            Debugging avanzato e profiling del gioco tramite
                            Unity Profiler, Frame Debugger, e strumenti di log
                            per ottimizzare frame rate e memoria.
                          </li>
                          <li className="text-[14px] pb-2">
                            Collaborazione all’integrazione di asset grafici e
                            sonori tramite Prefab, Asset Bundles, e script di
                            automazione.
                          </li>
                        </ul>
                      </div>
                    </AnimatedSection>
                  </section>
                  <section className="box-shadow-section-home rounded-lg">
                    <AnimatedSection>
                      <div className="bg-[#10172A] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
                          Wordpress & Shopify Developer | Libero Professionista
                        </h3>
                        <p className="text-slate-400 mb-4">
                          Giugno 2019 - Settembre 2024
                        </p>
                        <ul className="list-disc list-inside text-slate-400 lg:text-[16px] md:text-[14px] sm:text-[12px]">
                          <li className="text-[14px] pb-2">
                            Progettazione, creazione e manutenzione di siti:
                            E-Commerce (WooCommerce) e Vetrina.
                          </li>
                          <li className="text-[14px] pb-2">
                            Sviluppo del layout web.
                          </li>
                          <li className="text-[14px] pb-2">
                            Caricamento e gestione dei contenuti delle pagine
                            web e ottimizzazione SEO.
                          </li>
                          <li className="text-[14px] pb-2">
                            Pubblicazione del sito online e configurazione di
                            server e hosting.
                          </li>
                          <li className="text-[14px] pb-2">
                            Implementazione di misure di sicurezza (SSL,
                            firewall, plugin di sicurezza).
                          </li>
                          <li className="text-[14px] pb-2">
                            Supporto e formazione per i clienti sull'uso e la
                            gestione dei loro siti.
                          </li>
                        </ul>
                      </div>
                    </AnimatedSection>*/}
                  {/* </section>  */}
                </div>
              </section>
              <section id="work" className="py-12 ">
                <h2 className="text-3xl font-bold text-slate-100 mb-8">
                  <span className="text-[#64FFDA] font-mono">04. </span>
                  <span className="pb-20 text-slate-100"> ULTIMI PROGETTI</span>
                  <div className="h-[1px] bg-slate-600 w-full mt-4"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center"></div>
                {/* <WorkShowcase /> */}
                <UltimiLavori />
              </section>

              {/* <section id="pollo" className="py-12 ">
                {/* <Snowball />
                <ScrollText /> 
              </section> */}
              <div className="justify-center h-[1px] bg-slate-600 w-full mt-4"></div>
              <section id="AnimatedText" className="py-12 "></section>
              <section id="footer" className="py-2 ">
                <div ref={footerRef} className="w-full">
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                      y: isInView ? 0 : 100,
                      opacity: isInView ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Footer />
                  </motion.div>
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
