import React from "react";

interface Button3DProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Aggiunta della proprietà 'type'
}

const Button3D: React.FC<Button3DProps> = ({
  href,
  onClick,
  children,
  type = "button",
}) => {
  const commonClasses =
    "relative inline-block px-8 py-3 font-semibold text-[#64FFDA] bg-[#10172A] border border-[#64FFDA] rounded-lg transition-all duration-300 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:bg-[#10172A] group-hover:text-[#64FFDA]";

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
      {href ? (
        <a href={href} className={commonClasses}>
          <span className="relative z-10">{children}</span>
        </a>
      ) : (
        <button type={type} onClick={onClick} className={commonClasses}>
          <span className="relative z-10">{children}</span>
        </button>
      )}
    </div>
  );
};

export default Button3D;
