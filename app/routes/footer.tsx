import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Button3D from "~/components/Button3D";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export default function Footer() {
  return (
    <footer className=" text-slate-300 py-8">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl mb-4">
            <Typewriter
              words={["Grazie per aver visitato il mio portfolio!"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              // deleteSpeed={50}
              delaySpeed={4500}
            />
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Michele Trombone. Tutti i diritti
            riservati.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4"
        ></motion.div>
      </div>
    </footer>
  );
}
