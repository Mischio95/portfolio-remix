import React, { useRef, useEffect, useState } from "react";

export function BubbleEffectCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Draw the bubble effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const size = 600; // Size of the canvas
        const radius = 150; // Radius of the bubble

        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(0, 0, size, size);

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          size / 2,
          size / 2,
          0,
          size / 2,
          size / 2,
          radius
        );

        // Define gradient colors
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.04)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.02)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [mousePosition]);

  return (
    <div
      style={{
        position: "fixed",
        top: mousePosition.y - 300,
        left: mousePosition.x - 300,
        pointerEvents: "none",
        zIndex: 50,
        width: 600,
        height: 600,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
