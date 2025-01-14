import React from "react";
import "~/styles/fluid-button.css";

interface FluidButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const FluidButton: React.FC<FluidButtonProps> = ({
  href,
  onClick,
  children,
  className = "",
}) => {
  if (href) {
    return (
      <a href={href} className={`fluidButton ${className}`}>
        <span>{children}</span>
        <div className="liquid"></div>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`fluidButton ${className}`}>
      <span>{children}</span>
      <div className="liquid"></div>
    </button>
  );
};

export default FluidButton;
