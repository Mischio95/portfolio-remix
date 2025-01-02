"use client";

import { AnimatePresence } from "framer-motion";
import { CardService } from "~/components/CardService";
import { useWheelScroll } from "./hook/use-wheel-scroll";
import { useRef } from "react";

const cards = [
  {
    title: "HACKATHON - MOBILE GAME DEVELOPMENT (BITDROME - MKERS)",
    description: "Sviluppo di una demo di un Mobile Game con Unity.",
    image: "https://micheletrombone.it/portfolio/gioco02.png",
    year: "Elo Hell | 20 Ottobre - 10 Novembre 2023",
  },
  {
    title: "Destiny's Altered Order - APPLE DEVELOPER ACADEMY",
    description: "Gioco di ruolo 2D per mobile sviluppato con Unity.",
    image: "https://micheletrombone.it/portfolio/gioco1.png",
    year: "Challenge fine anno accademico",
  },
  {
    title: "Motion",
    description:
      "Bring your ideas to life with fluid, dynamic motion graphics. We craft seamless animations that tell your story with style and impact.",
    image: "https://micheletrombone.it/portfolio/gioco03.png",
    year: "2022",
  },
  {
    title: "Design",
    description:
      "Elevate your visual identity with cutting-edge design solutions. We combine aesthetics with functionality to create memorable experiences.",
    image:
      "https://micheletrombone.it/portfolio/gioco3.png?height=300&width=500",
    year: "2023",
  },
];

export default function VerticalCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useWheelScroll(cards.length, containerRef);
  return (
    <div
      ref={containerRef}
      className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          <CardService
            key={currentIndex}
            {...cards[currentIndex]}
            index={currentIndex}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
