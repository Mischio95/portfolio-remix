"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParallax } from "~/hooks/useParallax";
import { AnimatedSection } from "../animatedsection";

interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "ADDWAY ADVISORY SRL",
    period: "Dicembre 2024 - in corso",
    responsibilities: [
      "Sviluppo e manutenzione di web app scalabili utilizzando React, Remix e TypeScript.",
      "Gestione dell'integrazione con database PostgreSQL tramite Prisma ORM e scrittura di query SQL.",
      "Configurazione e gestione di server Linux con Nginx e PM2 per il deployment e il bilanciamento del carico delle web app.",
      "Ottimizzazione delle performance e strutturazione modulare del codice per migliorare scalabilità e manutenzione.",
    ],
  },
  {
    title: "Game Developer",
    company: "FOREACHSOFTWARE (Startup costituenda)",
    period: "Gennaio 2024 - Settembre 2024",
    responsibilities: [
      "Sviluppo e implementazione delle meccaniche di gioco per un titolo 2D Metroidvania utilizzando Unity e C#, con particolare attenzione alla struttura basata su componenti.",
      "Redazione e gestione del Game Design Document (GDD), includendo dettagli tecnici su sistemi di gioco, interfacce utente e logiche di progressione.",
      "Programmazione e ottimizzazione di sistemi di movimento e interazione tramite RigidBody2D, Collider2D, e Physics2D API.",
      "Creazione di animazioni fluide con il Animator Controller, utilizzando stati animati complessi e transizioni parametrizzate per un gameplay reattivo.",
      "Implementazione e gestione di effetti particellari con Unity Particle System.",
      "Debugging avanzato e profiling del gioco tramite Unity Profiler, Frame Debugger, e strumenti di log per ottimizzare frame rate e memoria.",
      "Collaborazione all'integrazione di asset grafici e sonori tramite Prefab, Asset Bundles, e script di automazione.",
    ],
  },
  {
    title: "Wordpress & Shopify Developer",
    company: "Libero Professionista",
    period: "Giugno 2019 - Settembre 2024",
    responsibilities: [
      "Progettazione, creazione e manutenzione di siti: E-Commerce (WooCommerce) e Vetrina.",
      "Sviluppo del layout web.",
      "Caricamento e gestione dei contenuti delle pagine web e ottimizzazione SEO.",
      "Pubblicazione del sito online e configurazione di server e hosting.",
      "Implementazione di misure di sicurezza (SSL, firewall, plugin di sicurezza).",
      "Supporto e formazione per i clienti sull'uso e la gestione dei loro siti.",
    ],
  },
];

export default function WorkExperience() {
  return (
    <section className="min-h-screen py-20 px-0 sm:px-0 lg:px-0 pt-4">
      <div className="max-w-6xl mx-auto ">
        <div className="space-y-12 ">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, y] = useParallax(50);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative pl-5 sm:pl-8 w-full"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#64FFDA] to-[#64FFDA]/20 rounded-lg " />
      <div className="bg-[#10172A] p-8 rounded-lg transition-all duration-300 hover:translate-x-1 box-shadow-section-home">
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">
            {experience.title}
          </h3>
          <p className="text-slate-300 mb-1">{experience.company}</p>
          <p className="text-slate-400 text-sm mb-4">{experience.period}</p>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-[#64FFDA] hover:text-[#64FFDA]/80 transition-colors duration-200 text-sm"
          >
            {isExpanded ? "Nascondi dettagli" : "Mostra dettagli"}
            {isExpanded ? (
              <ChevronUp className="ml-2 w-4 h-4" />
            ) : (
              <ChevronDown className="ml-2 w-4 h-4" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="list-disc list-inside text-slate-400 space-y-2"
            >
              {experience.responsibilities.map((resp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="text-[14px] pb-2"
                >
                  {resp}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
