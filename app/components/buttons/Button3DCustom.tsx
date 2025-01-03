interface Button3DProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; // Aggiunta questa prop
}

const Button3DCustom: React.FC<Button3DProps> = ({
  href,
  onClick,
  children,
  className,
}) => {
  // Stili di base
  const defaultClasses =
    "px-4 py-2 text-[#64FFDA] border border-[#64FFDA] rounded-lg transition-transform duration-300 hover:translate-x-[3px] hover:translate-y-[3px]";

  // Combina classi di default con quelle custom
  const combinedClasses = `${defaultClasses} ${className || ""}`;

  return (
    <div className="relative inline-block group">
      <div
        className="absolute inset-0 w-full h-full bg-[#64FFDA] opacity-0 transition-opacity duration-300 rounded-lg group-hover:opacity-100"
        style={{
          transform: "translate(3px, 3px)",
          borderRadius: "0.5em",
        }}
      />

      {href ? (
        <a href={href} className={combinedClasses}>
          <span className="relative z-10">{children}</span>
        </a>
      ) : (
        <button onClick={onClick} className={combinedClasses}>
          <span className="relative z-10">{children}</span>
        </button>
      )}
    </div>
  );
};

export default Button3DCustom;
