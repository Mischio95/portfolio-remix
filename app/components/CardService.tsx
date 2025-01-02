"use client";

import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  image: string;
  year: string;
  index: number;
}

export function CardService({
  title,
  description,
  image,
  year,
  index,
}: CardProps) {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto rounded-3xl box-shadow-section-class
 overflow-hidden"
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
            className="text-2xl md:text-5xl font-light text-gray-200"
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-xl font-thin text-gray-200 bottom-8 left-8"
          >
            ({String(index + 1).padStart(2, "0")})
          </motion.div>
        </div>
        <div className="bg-gray-100 p-8 md:p-12 space-y-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm text-gray-500"
          >
            Relevant project
          </motion.div>
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-800"
          >
            {title}
          </motion.h3>
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm text-gray-500"
          >
            {year}
          </motion.span>
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
        </div>
      </div>
    </motion.div>
  );
}
