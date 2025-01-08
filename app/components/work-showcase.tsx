"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github } from "lucide-react";
import Button3D from "~/components/buttons/Button3D";

// Sposta la registrazione fuori dal componente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  title: string;
  date?: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  githubLink: string;
}

export default function WorkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects: Project[] = [
    {
      title: "HACKATHON - MOBILE GAME DEVELOPMENT (BITDROME - MKERS)",
      date: "Elo Hell | 20 Ottobre - 10 Novembre 2023",
      description: "Sviluppo di una demo di un Mobile Game con Unity.",
      technologies: ["C#", "PlasticSCM", "Unity"],
      githubLink: "https://github.com/Mischio95/EloHell/",
    },
    {
      title: "Destiny's Altered Order - APPLE DEVELOPER ACADEMY",
      date: "Challenge fine anno accademico",
      description: "Gioco di ruolo 2D per mobile sviluppato con Unity.",
      technologies: ["C#", "PlasticSCM", "Unity"],
      githubLink: "https://github.com/Mischio95/DAO",
    },
    {
      title: "P-01 - Dark of Phos - APPLE DEVELOPER ACADEMY",
      description: "Platform Game 2D mobile a scorrimento laterale.",
      technologies: ["Xcode", "Swift", "SpriteKit", "Git"],
      githubLink: "https://github.com/Mischio95/MC3-P-01",
    },
    {
      title: "APPLE DEVELOPER WWDC23 - FALLINGNOTE",
      description: "Gioco Arcade per Swift Playground, iPadOS and iOS.",
      technologies: ["Playgrounds", "Swift", "SpriteKit", "Git"],
      githubLink: "https://github.com/Mischio95/MC3-P-01",
    },
  ];

  useEffect(() => {
    // Stagger animation for cards
    const cards = cardsRef.current;
    cards.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        {
          y: 90,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=90",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
        }
      );
    });

    // Parallax effect for technology tags
    cards.forEach((card) => {
      if (!card) return; // Salta se card è null
      const tags = card.querySelectorAll(".tech-tag");
      tags.forEach((tag, index) => {
        gsap.to(tag, {
          scrollTrigger: {
            trigger: card,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
          y: (index + 1) * 10,
          ease: "none",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto px-4 py-16 text-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group relative  rounded-xl overflow-hidden backdrop-blur-sm border border-gray-800"
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.4)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0" />

            <div className="p-8 h-full flex flex-col justify-between">
              <div className="space-y-4">
                {project.date && (
                  <span className="text-sm text-gray-400">{project.date}</span>
                )}

                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#7EFACD] transition-colors duration-300">
                  {project.title}
                </h3>

                {project.subtitle && (
                  <p className="text-gray-400 italic">{project.subtitle}</p>
                )}

                <p className="text-gray-300">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="tech-tag px-3 py-1 text-sm bg-[#7EFACD]/10 text-[#7EFACD] rounded-full border border-[#7EFACD]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <motion.a href={project.githubLink}>
                  <Button3D>
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      <span>View on GitHub</span>
                    </div>
                  </Button3D>
                </motion.a>
              </div>
            </div>

            <motion.div
              className="absolute top-4 right-4 w-20 h-20 bg-[#7EFACD]/5 rounded-full blur-2xl"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
