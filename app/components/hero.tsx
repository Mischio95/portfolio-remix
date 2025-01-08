import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Button3D from "~/components/buttons/Button3D";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import AnimatedText from "~/components/AnimatedText";

export function Hero() {
  return (
    <section className="pt-36 md:pt-36 pb-20 sm:mt-18">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="mt-18 mb-5 text-[#fff]"
      >
        <span className="text-base">Portfolio personale</span>
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        className="mb-0 text-5xl font-bold text-slate-100 md:text-7xl text-shadow"
      >
        <AnimatedText
          testo="Michele Trombone."
          className="text-4xl md:text-5xl lg:text-7xl"
        />
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
        className="mb-8 text-4xl font-bold text-slate-300 md:text-6xl"
      >
        <Typewriter
          words={["Full Stack Developer", "Game Developer", "Web Designer"]}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={3000}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
        className="mb-12 max-w-3xl text-slate-300 text-shadow"
      >
        Sviluppatore appassionato di tecnologia, software e gaming, con un forte
        orientamento all'apprendimento continuo e al lavoro di squadra.
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-[#64FFDA]"
        >
          {" "}
          _
        </motion.span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
      >
        <Button3D href="#contact">Contattami!</Button3D>
      </motion.div>
    </section>
  );
}
