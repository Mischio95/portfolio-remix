import { motion, AnimatePresence } from "framer-motion";
import Button3D from "./Button3D";
import { X } from "lucide-react";

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

const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  setIsOpen,
  menuItems,
  handleClick,
}) => {
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const closeButtonVariants = {
    hidden: { opacity: 0, rotate: -90 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#10172a]/90 backdrop-blur-lg"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backgroundVariants}
        >
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center relative"
            variants={menuVariants}
          >
            <motion.button
              className="absolute top-6 right-6 text-[#64FFDA] hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
              variants={closeButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={32} />
              <span className="sr-only">Close menu</span>
            </motion.button>
            <ul className="flex flex-col items-center gap-8">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenMenu;

// import { motion, AnimatePresence } from "framer-motion";
// import Button3D from "./Button3D";

// interface MenuItem {
//   number: string;
//   label: string;
//   href: string;
// }

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
//             className="w-full h-full flex flex-col items-center justify-center"
//             variants={menuVariants}
//           >
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
