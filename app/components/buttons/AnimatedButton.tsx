import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const AnimatedButton: React.FC<ButtonProps> = ({ href, onClick, children }) => {
  const variants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const baseClasses =
    "inline-flex items-center px-6 py-3 text-sm font-medium border rounded bg-transparent transition-colors duration-300";
  const hoverClasses =
    "border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 focus:bg-[#64FFDA]/20";

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover="hover"
        whileTap="tap"
        variants={variants}
        className={`${baseClasses} ${hoverClasses}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      variants={variants}
      className={`${baseClasses} ${hoverClasses}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
