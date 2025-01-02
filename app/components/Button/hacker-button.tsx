import React, { useEffect, useRef } from "react";
import "~/styles/hacker-button.css";

interface HackerButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // Tipo del bottone
}

const HackerButton: React.FC<HackerButtonProps> = ({
  href,
  onClick,
  children,
  disabled,
  type = "button",
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval: NodeJS.Timeout | null = null;

    const handleMouseOver = (event: MouseEvent) => {
      let iteration = 0;
      clearInterval(interval!);

      interval = setInterval(() => {
        if (spanRef.current) {
          spanRef.current.innerText = spanRef.current.dataset
            .value!.split("")
            .map((letter, index) => {
              if (index < iteration) {
                return spanRef.current!.dataset.value![index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

          if (iteration >= spanRef.current.dataset.value!.length) {
            clearInterval(interval!);
          }

          iteration += 1 / 3;
        }
      }, 30);
    };

    if (spanRef.current) {
      spanRef.current.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      if (spanRef.current) {
        spanRef.current.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, []);

  const commonClasses =
    "relative inline-block px-6 py-3 font-semibold text-white bg-black rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-[#000000] hover:text-[#64ffda] ";

  return (
    <div className="inline-block">
      {href ? (
        <a href={href} className={commonClasses}>
          <span
            ref={spanRef}
            data-value={children as string}
            className="relative z-10"
          >
            {children}
          </span>
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={commonClasses}
          disabled={disabled}
        >
          <span
            ref={spanRef}
            data-value={children as string}
            className="relative z-10"
          >
            {children}
          </span>
        </button>
      )}
    </div>
  );
};

export default HackerButton;
