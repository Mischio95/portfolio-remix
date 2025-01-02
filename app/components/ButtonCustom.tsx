import React from "react";

interface ButtonFancyProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Tipo del bottone
}

const ButtonCustom: React.FC<ButtonFancyProps> = ({
  href,
  onClick,
  children,
  type = "button",
}) => {
  const commonClasses =
    "relative inline-block px-6 py-3 font-semibold text-white bg-[#111f43] rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-[#111f43] ";

  return (
    <div className="inline-block">
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

export default ButtonCustom;
