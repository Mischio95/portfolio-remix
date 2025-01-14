import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Button3D from "~/components/buttons/Button3D";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import FluidButton from "../buttons/FluidButton";

export default function Footer() {
  return (
    <footer className=" text-slate-300 py-4">
      <section id="contact" className="mt-[65px] mb-[100px]">
        <p className="text-4xl font bold mb-4 text-center pb-6">
          <Typewriter
            words={["Resta in contatto!"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={40}
            // deleteSpeed={50}
            delaySpeed={5500}
          />
        </p>
        <p className="text-slate-400 text-center mb-10 max-w-200 mx-auto">
          Se ti è piaciuto ciò che hai visto nel mio portfolio o se hai domande,
          progetti o collaborazioni in mente, non esitare a metterti in contatto
          con me! Sono sempre aperto a nuove opportunità e conversazioni. <br />
          Inviami una mail, e risponderò al più presto.
        </p>
        <div className="text-center pb-6 mb-4">
          <Button3D href="mailto:michele.trombone95@gmail.com">
            Inviami un messaggio!
          </Button3D>
          {/* <FluidButton href="mailto:michele.trombone95@gmail.com">
            {" "}
            Inviami un messaggio{" "}
          </FluidButton> */}
        </div>
        <div className="container mx-auto text-center pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
      </section>
    </footer>
  );
}

// import { motion, useInView } from "framer-motion";
// import { Typewriter } from "react-simple-typewriter";
// import Button3D from "~/components/buttons/Button3D";
// import { useRef } from "react";

// export default function Footer() {
//   const footerRef = useRef(null);
//   const isInView = useInView(footerRef, { once: false, amount: 0.2 });

//   return (
//     <motion.footer
//       ref={footerRef}
//       initial={{ y: "100%" }}
//       animate={{ y: isInView ? "0%" : "100%" }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="relative bg-[#10172A] text-slate-300 py-4"
//     >
//       <section id="contact" className="mt-[65px] mb-[100px]">
//         <p className="text-4xl font-bold mb-4 text-center pb-6">
//           <Typewriter
//             words={["Resta in contatto!"]}
//             loop
//             cursor
//             cursorStyle="|"
//             typeSpeed={40}
//             delaySpeed={5500}
//           />
//         </p>
//         <p className="text-slate-400 text-center mb-10 max-w-200 mx-auto">
//           Se ti è piaciuto ciò che hai visto nel mio portfolio o se hai domande,
//           progetti o collaborazioni in mente, non esitare a metterti in contatto
//           con me! Sono sempre aperto a nuove opportunità e conversazioni.
//           <br />
//           Inviami una mail, e risponderò al più presto.
//         </p>
//         <div className="text-center pb-6 mb-4">
//           <Button3D href="mailto:michele.trombone@example.com">
//             Inviami un messaggio!
//           </Button3D>
//         </div>
//         <div className="container mx-auto text-center pb-0">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <p className="text-sm">
//               © {new Date().getFullYear()} Michele Trombone. Tutti i diritti
//               riservati.
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     </motion.footer>
//   );
// }
