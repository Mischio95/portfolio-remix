import React from "react";

interface AnimatedTextProps {
  testo: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ testo, className }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "0",
        padding: "0",
        overflow: "hidden",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
      >
        {/* Testo con riempimento animato */}
        <text
          x="0"
          y="50%"
          dominantBaseline="middle"
          textAnchor="start"
          fill="url(#pattern)"
          fontFamily="inter"
          fontSize="10vh"
          className={className}
        >
          {testo}
        </text>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0">
            <stop offset="0%" style={{ stopColor: "#64ffda" }} />
            <stop offset="25%" style={{ stopColor: "#57e6c0" }} />
            <stop offset="50%" style={{ stopColor: "#80ffd4" }} />
            <stop offset="75%" style={{ stopColor: "#aaffde" }} />
            <stop offset="100%" style={{ stopColor: "#64ffda" }} />
          </linearGradient>
          <pattern
            id="pattern"
            x="0"
            y="0"
            width="300%"
            height="100%"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="150%" height="100%" fill="url(#gradient)">
              <animate
                attributeType="XML"
                attributeName="x"
                from="0"
                to="150%"
                dur="7s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="-150%"
              y="0"
              width="150%"
              height="100%"
              fill="url(#gradient)"
            >
              <animate
                attributeType="XML"
                attributeName="x"
                from="-150%"
                to="0"
                dur="7s"
                repeatCount="indefinite"
              />
            </rect>
          </pattern>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedText;
