"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  date?: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  githubLink: string;
}

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

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
        }
      );
    }
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-xl overflow-hidden backdrop-blur-sm border border-gray-800"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ boxShadow: "0px 0px 0px rgba(126, 250, 205, 0)" }}
      animate={{
        boxShadow: isHovered
          ? "0px 0px 20px rgba(126, 250, 205, 0.3)"
          : "0px 0px 0px rgba(126, 250, 205, 0)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8 h-full flex flex-col justify-between z-10 relative">
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
              <motion.span
                key={techIndex}
                className="tech-tag px-3 py-1 text-sm bg-[#7EFACD]/10 text-[#7EFACD] rounded-full border border-[#7EFACD]/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <a
            href={project.githubLink}
            className="inline-flex items-center px-4 py-2 bg-[#7EFACD] text-gray-900 rounded-full font-medium hover:bg-[#5ED3A8] transition-colors duration-300"
          >
            <Github className="mr-2" size={18} />
            Vedi on GitHub
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#7EFACD]/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#7EFACD]/10 rounded-full blur-2xl"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default function UltimiLavori() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className="w-full max-w-7xl mx-auto px-4 py-16 text-white"
    >
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      ></motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
