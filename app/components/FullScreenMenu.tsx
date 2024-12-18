import { motion, AnimatePresence } from "framer-motion";
import Button3D from "./Button3D";
import { X, Github, Linkedin, Instagram } from "lucide-react";

interface MenuItem {
  number: string;
  label: string;
  href: string;
}

interface FullscreenMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuItems: MenuItem[];
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const socials = [
  { icon: Github, href: "https://github.com/Mischio95" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/michele-trombone-470458233",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/michele_trombone/",
  },
];

const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  setIsOpen,
  menuItems,
  handleClick,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
    exit: { opacity: 0, x: "100%" },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className="fixed inset-0 bg-[#10172a] z-50 flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <motion.button
            className="absolute top-8 right-8 text-slate-300"
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={32} />
            <span className="sr-only">Chiudi menu</span>
          </motion.button>
          <ul className="flex flex-col items-center gap-8 mt-16">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.label}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="group flex items-center gap-2 text-3xl text-slate-300 transition-colors hover:text-[#64FFDA]"
                >
                  <span className="text-[#64FFDA] text-2xl font-mono">
                    {item.number}
                  </span>
                  {item.label}
                </a>
              </motion.li>
            ))}
            <motion.li
              custom={menuItems.length}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Button3D href="https://micheletrombone.it/MicheleTromboneCV.pdf">
                Scarica il CV!
              </Button3D>
            </motion.li>
          </ul>
          <motion.div
            className="flex gap-6 mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
          >
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#64FFDA] transition-colors"
                whileHover={{ color: "#64FFDA", scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FullscreenMenu;

// import { motion, AnimatePresence } from "framer-motion";
// import Button3D from "./Button3D";
// import { X } from "lucide-react";
// import { Github, Linkedin, Instagram } from "lucide-react";

// interface MenuItem {
//   number: string;
//   label: string;
//   href: string;
// }

// const socials = [
//   { icon: Github, href: "https://github.com/Mischio95" },
//   {
//     icon: Linkedin,
//     href: "https://www.linkedin.com/in/michele-trombone-470458233",
//   },
//   {
//     icon: Instagram,
//     href: "https://www.instagram.com/michele_trombone/",
//   },
// ];

// interface FullscreenMenuProps {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
//   menuItems: MenuItem[];
//   handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
// }

// const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
//   isOpen,
//   setIsOpen,
//   menuItems,
//   handleClick,
// }) => {
//   const backgroundVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { duration: 0.3 },
//     },
//   };

//   const menuVariants = {
//     hidden: { x: "100%" },
//     visible: {
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 20,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.5,
//       },
//     }),
//   };

//   const closeButtonVariants = {
//     hidden: { opacity: 0, rotate: -90 },
//     visible: {
//       opacity: 1,
//       rotate: 0,
//       transition: {
//         delay: 0.2,
//         duration: 0.3,
//       },
//     },
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-[#10172a]/90 backdrop-blur-lg"
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           variants={backgroundVariants}
//         >
//           <motion.div
//             className="w-full h-full flex flex-col items-center justify-center relative"
//             variants={menuVariants}
//           >
//             <motion.button
//               className="absolute top-6 right-6 text-[#64FFDA] hover:text-white transition-colors"
//               onClick={() => setIsOpen(false)}
//               variants={closeButtonVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <X size={32} />
//               <span className="sr-only">Close menu</span>
//             </motion.button>
//             <ul className="flex flex-col items-center gap-8">
//               {menuItems.map((item, index) => (
//                 <motion.li
//                   key={item.label}
//                   custom={index}
//                   variants={itemVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   <a
//                     href={item.href}
//                     onClick={(e) => handleClick(e, item.href)}
//                     className="group flex items-center gap-2 text-3xl text-slate-300 transition-colors hover:text-[#64FFDA]"
//                   >
//                     <span className="text-[#64FFDA] text-2xl font-mono">
//                       {item.number}
//                     </span>
//                     {item.label}
//                   </a>
//                 </motion.li>
//               ))}
//               <motion.li
//                 custom={menuItems.length}
//                 variants={itemVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <Button3D href="https://micheletrombone.it/MicheleTromboneCV.pdf">
//                   Scarica il CV!
//                 </Button3D>
//               </motion.li>
//             </ul>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default FullscreenMenu;

// // import { motion, AnimatePresence } from "framer-motion";
// // import Button3D from "./Button3D";

// // interface MenuItem {
// //   number: string;
// //   label: string;
// //   href: string;
// // }

// // interface FullscreenMenuProps {
// //   isOpen: boolean;
// //   setIsOpen: (isOpen: boolean) => void;
// //   menuItems: MenuItem[];
// //   handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
// // }

// // const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
// //   isOpen,
// //   setIsOpen,
// //   menuItems,
// //   handleClick,
// // }) => {
// //   const backgroundVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: { duration: 0.3 },
// //     },
// //   };

// //   const menuVariants = {
// //     hidden: { x: "100%" },
// //     visible: {
// //       x: 0,
// //       transition: {
// //         type: "spring",
// //         stiffness: 100,
// //         damping: 20,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: (i: number) => ({
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         delay: i * 0.1,
// //         duration: 0.5,
// //       },
// //     }),
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <motion.div
// //           className="fixed inset-0 z-50 flex items-center justify-center bg-[#10172a]/90 backdrop-blur-lg"
// //           initial="hidden"
// //           animate="visible"
// //           exit="hidden"
// //           variants={backgroundVariants}
// //         >
// //           <motion.div
// //             className="w-full h-full flex flex-col items-center justify-center"
// //             variants={menuVariants}
// //           >
// //             <ul className="flex flex-col items-center gap-8">
// //               {menuItems.map((item, index) => (
// //                 <motion.li
// //                   key={item.label}
// //                   custom={index}
// //                   variants={itemVariants}
// //                   initial="hidden"
// //                   animate="visible"
// //                 >
// //                   <a
// //                     href={item.href}
// //                     onClick={(e) => handleClick(e, item.href)}
// //                     className="group flex items-center gap-2 text-3xl text-slate-300 transition-colors hover:text-[#64FFDA]"
// //                   >
// //                     <span className="text-[#64FFDA] text-2xl font-mono">
// //                       {item.number}
// //                     </span>
// //                     {item.label}
// //                   </a>
// //                 </motion.li>
// //               ))}
// //               <motion.li
// //                 custom={menuItems.length}
// //                 variants={itemVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //               >
// //                 <Button3D href="https://micheletrombone.it/MicheleTromboneCV.pdf">
// //                   Scarica il CV!
// //                 </Button3D>
// //               </motion.li>
// //             </ul>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // };

// // export default FullscreenMenu;
