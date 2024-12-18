// import { useEffect, useState, useCallback } from "react";
// import { motion } from "framer-motion";

// export function BubbleEffect() {
//   const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

//   const handleMouseMove = useCallback((event: MouseEvent) => {
//     setMousePosition({ x: event.clientX, y: event.clientY });
//   }, []);

//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [handleMouseMove]);

//   return (
//     <motion.div
//       className="bubble fixed top-0 left-0 pointer-events-none z-50"
//       style={{
//         width: 600, // Dimensione del cerchio
//         height: 600,
//         borderRadius: "50%",
//         background: "rgba(255, 255, 255, 0.1)", // Colore bianco con alta trasparenza
//         filter: "blur(100px)", // Blur aumentato per un effetto più diffuso e meno concentrato
//         willChange: "transform",
//       }}
//       animate={{
//         x: mousePosition.x - 300,
//         y: mousePosition.y - 300,
//       }}
//       transition={{ type: "spring", stiffness: 4000, damping: 100 }}
//     />
//   );
// }

import React, { useEffect, useState } from "react";

export function BubbleEffect() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="bubble fixed top-0 left-0 pointer-events-none z-50"
      style={{
        transform: `translate(${mousePosition.x - 120}px, ${
          mousePosition.y - 120
        }px)`,
      }}
    ></div>
  );
}
