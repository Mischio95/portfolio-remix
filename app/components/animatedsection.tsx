import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-[#10172a] p-6 rounded-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}
