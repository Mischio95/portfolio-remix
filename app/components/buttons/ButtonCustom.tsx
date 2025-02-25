import React, { MouseEvent } from "react";

interface ButtonFancyProps {
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  name?: string;
  value?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonCustom: React.FC<ButtonFancyProps> = ({
  href,
  onClick,
  children,
  disabled,
  className = "",
  name,
  value,
  type = "button",
}) => {
  const commonClasses = `relative inline-block px-6 py-3 font-semibold text-white bg-[#111f43] rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-[#111f43] ${className}`;

  return (
    <div className="inline-block">
      {href ? (
        <a href={href} className={commonClasses}>
          <span className="relative z-10">{children}</span>
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={commonClasses}
          disabled={disabled}
          name={name}
          value={value}
        >
          <span className="relative z-10">{children}</span>
        </button>
      )}
    </div>
  );
};

export default ButtonCustom;
