// import React from "react";

// interface Button3DProps {
//   href?: string;
//   onClick?: () => void;
//   children: React.ReactNode;
// }

// const Button3D: React.FC<Button3DProps> = ({ href, onClick, children }) => {
//   return (
//     <a
//       href={href}
//       onClick={onClick}
//       className="relative inline-block px-8 py-3 font-semibold text-[#64FFDA] border-2 border-[#64FFDA] rounded-lg group hover:bg-[#64FFDA] hover:text-[#0A192F] transition-all duration-300"
//     >
//       <span className="absolute inset-0  rounded-lg opacity-30 blur-sm group-hover:opacity-100 group-hover:blur-sm transition-all duration-300"></span>
//       <span className="relative z-10">{children}</span>
//     </a>
//   );
// };

// export default Button3D;
import React from "react";

interface Button3DProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button3D: React.FC<Button3DProps> = ({ href, onClick, children }) => {
  return (
    <div className="relative inline-block group">
      {/* Rettangolo verde che appare quando il bottone si sposta */}
      <div
        className="absolute inset-0 w-full h-full bg-[#64FFDA] opacity-0 transition-opacity duration-300 rounded-lg group-hover:opacity-100"
        style={{
          transform: "translate(3px, 3px)",
          borderRadius: "0.5em",
        }}
      />

      {/* Il bottone */}
      <a
        href={href}
        onClick={onClick}
        className="relative inline-block px-8 py-3 font-semibold text-[#64FFDA] bg-[#10172A] border border-[#64FFDA] rounded-lg transition-all duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:bg-[#10172A] group-hover:text-[#64FFDA]"
      >
        <span className="relative z-10">{children}</span>
      </a>
    </div>
  );
};

export default Button3D;
