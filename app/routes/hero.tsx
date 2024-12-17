import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Button3D from "~/components/Button3D";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export function Hero() {
  return (
    <section className="pt-32 md:pt-40 mb-20">
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 text-[#64FFDA] text-shadow"
      >
        Ciao!, il mio nome è
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-4 text-5xl font-bold text-slate-100 md:text-7xl text-shadow"
      >
        Michele Trombone.
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
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
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-12 max-w-2xl text-slate-300 text-shadow"
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
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Button3D href="#contact">Contattami!</Button3D>
      </motion.div>
    </section>
  );
}
