"use client";

import { AnimatePresence } from "framer-motion";
import { CardService } from "~/components/CardService";
import { useWheelScroll } from "./hook/use-wheel-scroll";
import { useRef } from "react";

const cards = [
  {
    title: "HACKATHON - MOBILE GAME DEVELOPMENT (BITDROME - MKERS)",
    date: "Elo Hell | 20 Ottobre - 10 Novembre 2023",
    description: "Sviluppo di una demo di un Mobile Game con Unity.",
    technologies: ["C#", "PlasticSCM", "Unity"],
    githubLink: "https://github.com/Mischio95/EloHell/",
    image: "https://micheletrombone.it/portfolio/gioco04.png",
  },
  {
    title: "Destiny's Altered Order - APPLE DEVELOPER ACADEMY",
    subtitle: "Challenge fine anno accademico",
    description: "Gioco di ruolo 2D per mobile sviluppato con Unity.",
    technologies: ["C#", "PlasticSCM", "Unity"],
    githubLink: "https://github.com/Mischio95/DAO",
    image: "https://micheletrombone.it/portfolio/gioco1.png",
  },
  {
    title: "P-01 - Dark of Phos - APPLE DEVELOPER ACADEMY",
    description: "Platform Game 2D mobile a scorrimento laterale.",
    technologies: ["Xcode", "Swift", "SpriteKit", "Git"],
    githubLink: "https://github.com/Mischio95/MC3-P-01",
    image: "https://micheletrombone.it/portfolio/gioco02.png",
  },
  {
    title: "APPLE DEVELOPER WWDC23 - FALLINGNOTE",
    description: "Gioco Arcade per Swift Playground, iPadOS and iOS.",
    technologies: ["Playgrounds", "Swift", "SpriteKit", "Git"],
    githubLink: "https://github.com/Mischio95/MC3-P-01",
    image:
      "https://micheletrombone.it/portfolio/gioco03.png?height=300&width=500",
  },
];

export default function VerticalCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useWheelScroll(cards.length, containerRef);
  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          <CardService key={currentIndex} {...cards[currentIndex]} />
        </AnimatePresence>
      </div>
    </div>
  );
}
