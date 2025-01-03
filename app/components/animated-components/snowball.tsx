import React, { useEffect, useRef, useState } from "react";
import "~/styles/snowball.module.css";

const Snowball = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const snowflakes: any[] = [];
    const numSnowflakes = 1000;
    let shaking = false;
    let mouseX = 0;
    let mouseY = 0;

    class Snowflake {
      x: number;
      y: number;
      radius: number;
      speed: number;
      vx: number;
      vy: number;
      opacity: number;

      constructor(x: number, y: number, radius: number, speed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.opacity = radius / 4;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        if (shaking) {
          this.vx += (Math.random() - 0.5) * 2;
          this.vy += (Math.random() - 0.5) * 2;
        } else {
          this.vx *= 0.98;
          this.vy *= 0.98;
          if (canvas && this.y + this.radius < canvas.height) {
            this.vy += this.speed;
          } else {
            this.vy = 0;
            this.y = (canvas?.height ?? 0) - this.radius;
          }
        }
        this.x += this.vx;
        this.y += this.vy;

        if (canvas) {
          if (this.x > canvas.width) this.x = 0;
          if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = canvas.height - this.radius;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
      }
    }

    const init = () => {
      for (let i = 0; i < numSnowflakes; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height - Math.random() * 50;
        const radius = Math.random() * 3 + 1;
        const speed = ((Math.random() + 0.5) / radius) * 0.1;
        snowflakes.push(new Snowflake(x, y, radius, speed));
      }
      animate();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw();
      });
      requestAnimationFrame(animate);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      shaking = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (shaking) {
        const dx = e.clientX - mouseX;
        const dy = e.clientY - mouseY;
        snowflakes.forEach((snowflake) => {
          snowflake.vx += dx * 0.01;
          snowflake.vy += dy * 0.01;
        });
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      shaking = false;
    };

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    init();

    return () => {
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="flex justify-center items-center h-screen mt-0 mb-0 p-0">
      <div
        className="snowball-wrapper relative flex justify-center items-center w-[500px] bg-[#0a001c] aspect-square rounded-full border-4 border-white overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <canvas ref={canvasRef} width="500" height="500" id="snowball"></canvas>
        <svg
          className={`snowball-light absolute bottom-[-10px] right-[90px] flex justify-center w-[250px] h-[250px] transition-opacity duration-300`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <g>
              <path d="m176 272h32v160h-32z" fill="#0a001c"></path>
              <path d="m176 248h32v24h-32z" fill="#0a001c"></path>
              <path d="m176 432h32v24h-32z" fill="#0a001c"></path>
              <path
                d="m287 32h96v24h-96z"
                fill="#0a001c"
                transform="matrix(-1 0 0 -1 670 88)"
              ></path>
              <path d="m295 56a40 40 0 0 0 80 0" fill="#0a001c"></path>
              <path d="m248 480h-112l8-24h96z" fill="#0a001c"></path>
            </g>
            <path
              d="m496 472h-242.23l-6.18-18.53a8 8 0 0 0 -7.59-5.47h-24v-200a8 8 0 0 0 -8-8h-8v-136a56.062 56.062 0 0 1 56-56h23v8a8 8 0 0 0 8 8h.68a47.99 47.99 0 0 0 94.64 0h.68a8 8 0 0 0 8-8v-24a8 8 0 0 0 -8-8h-96a8 8 0 0 0 -8 8h-23a72.083 72.083 0 0 0 -72 72v136h-8a8 8 0 0 0 -8 8v200h-24a8 8 0 0 0 -7.59 5.47l-6.18 18.53h-114.23a8 8 0 0 0 0 16h480a8 8 0 0 0 0-16zm-161-384a32.058 32.058 0 0 1 -30.99-24h61.98a32.058 32.058 0 0 1 -30.99 24zm-40-48h80v8h-80zm-111 216h16v8h-16zm0 24h16v144h-16zm0 160h16v8h-16zm-36.9 32 2.67-8h84.46l2.67 8z"
              fill="#10172a"
              style={{ fill: "rgb(255, 255, 255)" }}
            ></path>
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Snowball;
