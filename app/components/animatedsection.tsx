// import { motion } from "framer-motion";
// import { ReactNode } from "react";

// interface AnimatedSectionProps {
//   children: ReactNode;
//   className?: string;
// }

// export function AnimatedSection({ children, className }: AnimatedSectionProps) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.01, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.4)" }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       className={`bg-[#10172a] p-6 rounded-lg ${className}`}
//     >
//       {children}
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 0 10px rgba(100, 255, 218, 0.5), 0 0 20px rgba(100, 255, 218, 0.3), 0 0 30px rgba(100, 255, 218, 0.2)",
      }}
      className={`bg-[#10172a] p-6 rounded-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}
