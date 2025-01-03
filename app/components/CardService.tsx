"use client";

import { motion } from "framer-motion";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import Button3D from "./buttons/Button3D";

interface CardProps {
  title: string;
  description: string;
  image: string;
  date?: string;
  subtitle?: string;
  technologies: string[];
  githubLink: string;
}

export function CardService({
  title,
  description,
  image,
  date,
  subtitle,
  technologies,
  githubLink,
}: CardProps) {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto rounded-3xl box-shadow-section-class overflow-hidden bg-[#10172A]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-4xl font-light text-gray-200"
          >
            {title}
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg text-gray-400"
          >
            {description}
          </motion.p>
          {date && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl md:text-xl font-thin text-gray-200"
            >
              {date}
            </motion.div>
          )}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-4"
          >
            <Button3D href={githubLink}>Vedi il progetto su GitHub</Button3D>
          </motion.div>
        </div>
        <div className="bg-[#090A15] p-8 md:p-12 space-y-4">
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-300"
          >
            {title}
          </motion.h3>
          {date && (
            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm text-gray-500"
            >
              {date}
            </motion.span>
          )}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative mt-4 rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-48 md:h-64 object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-4"
          >
            <h4 className="text-lg text-gray-300">Technologies:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
