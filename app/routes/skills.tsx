import { motion } from "framer-motion";
import { AnimatedSection } from "~/components/animatedsection";
import { useEffect } from "react";

export function Skills() {
  const technicalSkills = [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Remix", icon: "/icons/remi.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "HTML5", icon: "/icons/html5.svg" },
    { name: "CSS3", icon: "/icons/css.svg" },
    { name: "PostgreSQL", icon: "/icons/postegresql.svg" },
    { name: "Prisma ORM", icon: "/icons/prisma.svg" },
    { name: "Swift", icon: "/icons/swift.svg" },
    { name: "Unity", icon: "/icons/unity.svg" },
    { name: "C#", icon: "/icons/csharp.svg" },
    { name: "Java", icon: "/icons/java-svgrepo-com.svg" },
  ];

  const tools = [
    { name: "Git", icon: "/icons/git.svg" },
    { name: "PlasticSCM", icon: "/icons/plastic.svg" },
    { name: "Postman", icon: "/icons/postman.svg" },
    { name: "Photoshop", icon: "/icons/photoshop.svg" },
    { name: "Illustrator", icon: "/icons/illustrator.svg" },
    { name: "Sketch", icon: "/icons/sketch.svg" },
  ];

  return (
    // <section className="py-20 animated-element">
    <section className="py-20 ">
      <h2 className="text-3xl font-bold text-slate-100 mb-8">
        <span className="text-[#64FFDA]">01. </span>
        <span className="pb-20 text-slate-100">SKILLS</span>
        <div className="h-[1px] bg-slate-600 w-full mt-4"></div>
      </h2>

      <div className="space-y-8 sm:space-y-12">
        <AnimatedSection>
          <div className="bg-[#10172A] p-8 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-[#64FFDA] mb-6">
              Competenze Tecniche
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    hover: { delay: 0 }, // Rimuove il delay per l'hover
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg transition-colors"
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-slate-300 text-sm text-center">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        <div className="h-[1px] bg-slate-600 w-full mt-4"></div>{" "}
        <AnimatedSection>
          <div className="bg-[#10172A] p-8 rounded-lg ">
            <h2 className="text-xl md:text-2xl font-semibold text-[#64FFDA] mb-6">
              {" "}
              Strumenti & Tecnologie
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    hover: { delay: 0 }, // Rimuove il delay per l'hover
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg transition-colors"
                >
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-slate-300 text-sm text-center">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
