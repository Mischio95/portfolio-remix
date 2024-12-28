"use client";

import { useEffect, useRef } from "react";

export default function RadialConnections() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Animation function for the paths
    const paths = svgRef.current.querySelectorAll(".connection-line");
    paths.forEach((path, index) => {
      const length = (path as SVGPathElement).getTotalLength();
      (path as SVGPathElement).style.strokeDasharray = `${length}`;
      (path as SVGPathElement).style.strokeDashoffset = `${length}`;

      // Animate each path with a slight delay
      path.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
        duration: 2000,
        delay: index * 100,
        fill: "forwards",
        easing: "ease-in-out",
      });
    });
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <svg
        ref={svgRef}
        width="500"
        height="500"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="250" cy="250" r="10" fill="#64FFDA">
          <animate
            attributeName="r"
            from="10"
            to="20"
            dur="1s"
            repeatCount="indefinite"
            values="10;20;10"
            keyTimes="0;0.5;1"
          />
        </circle>
        <path
          d="M 250,50 L 250,450"
          className="connection-line"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 50,250 L 450,250"
          className="connection-line"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 100,100 L 400,400"
          className="connection-line"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 400,100 L 100,400"
          className="connection-line"
          stroke="#64FFDA"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}
