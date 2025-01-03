import React, { useEffect, useRef } from "react";
import Button3D from "./buttons/Button3D";

interface Project {
  title: string;
  subtitle?: string;
  date?: string;
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
    subtitle: "Challenge fine anno accademico",
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

export default function ScrollSliderProject() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        const gsapModule = await import("gsap");
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");

        const gsap = gsapModule.gsap || gsapModule.default;
        const ScrollTrigger =
          ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;

        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const progress = progressRef.current;
        if (!section || !progress) return;

        // Pulisci eventuali animazioni precedenti
        ScrollTrigger.getAll().forEach((t) => t.kill());
        gsap.set(".slide", { clearProps: "all" });

        // Animazione di zoom in/out
        gsap.fromTo(
          section,
          {
            scale: 0.8,
            opacity: 0.5,
          },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              // start: "top 150%", // Inizia la transizione più in alto
              // end: "bottom 80%", // Termina la transizione più tardi
              start: "top 80%", // Inizia quando la top del trigger raggiunge l'80% della viewport
              end: "bottom 20%", // Finisce quando la bottom del trigger raggiunge il 20% della viewport
              scrub: true,
              // markers: true, // Aggiunti per debug
            },
          }
        );

        const slides = gsap.utils.toArray<HTMLElement>(".slide");
        const slideCount = slides.length;

        // Animazione slide orizzontali con durata aumentata
        gsap.to(slides, {
          xPercent: -100 * (slideCount - 1),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 20%",
            pin: true,
            scrub: 3, // Mantenuto per rallentare lo scroll
            snap: 1 / (slideCount - 1),
            end: () => `+=${7 * section.offsetWidth}`, // Aumentato l'end per fermarsi di più all'ultima slide
            onUpdate: (self) => {
              const progress = self.progress;
              const dots =
                progressRef.current?.querySelectorAll(".progress-dot") || [];
              const index = Math.round(progress * (dots.length - 1));

              dots.forEach((dot, i) => {
                if (i === index) {
                  dot.classList.add("w-8", "bg-white");
                  dot.classList.remove("w-4", "bg-white/30");
                } else {
                  dot.classList.remove("w-8", "bg-white");
                  dot.classList.add("w-4", "bg-white/30");
                }
              });
            },
          },
        });

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      })();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="project-scroll relative h-screen overflow-hidden bg-[#10172A]"
    >
      <div className="flex h-full pt-0 pb-0 mt-0 mb-0">
        {projects.map((project, index) => (
          <div
            key={index}
            className="slide flex-shrink-0 w-full h-full flex items-center justify-center px-4"
          >
            <div className="w-full h-[350px] max-w-4xl mx-auto bg-[#10172A] p-8 rounded-lg border border-[#64FFDA] border-opacity-50 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-[#64FFDA] mb-3">
                {project.title}
              </h3>
              {project.date && (
                <p className="text-slate-400 mb-3 text-base">{project.date}</p>
              )}
              {project.subtitle && (
                <p className="text-slate-400 mb-3 text-base">
                  {project.subtitle}
                </p>
              )}
              <p className="text-slate-400 mb-6 text-base max-w-2xl">
                {project.description}
              </p>
              <p className="text-slate-400 mb-2 text-base">TECNOLOGIE:</p>
              <div className="flex flex-wrap gap-2 mb-4 justify-center max-w-xl mx-2.5">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="flex-shrink-0 min-w-[80px] border border-[#64FFDA] border-opacity-50 text-slate-300 px-4 py-1 rounded text-sm text-center whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="w-full text-center">
                <Button3D href={project.githubLink}>Link Github!</Button3D>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={progressRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10"
      >
        {projects.map((_, index) => (
          <div
            key={index}
            className="progress-dot h-[2px] w-4 bg-white/30 transition-all duration-500"
          />
        ))}
      </div>
    </section>
  );
}
