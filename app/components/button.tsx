import React from "react";

interface ButtonProps {
  href?: string; // Per bottoni con link
  onClick?: () => void; // Per azioni
  children: React.ReactNode; // Contenuto del bottone
}

const Button: React.FC<ButtonProps> = ({ href, onClick, children }) => {
  const baseClasses =
    "inline-flex items-center px-6 py-3 text-sm font-medium border rounded bg-transparent transition-colors duration-300";
  const hoverClasses =
    "border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 focus:bg-[#64FFDA]/20";

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${hoverClasses}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${hoverClasses}`}>
      {children}
    </button>
  );
};

export default Button;
