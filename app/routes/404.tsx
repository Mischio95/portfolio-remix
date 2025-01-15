import { useEffect } from "react";
import { Link } from "@remix-run/react";
import ButtonCustom from "~/components/buttons/ButtonCustom";
import HackerButton from "~/components/buttons/hacker-button";

export default function NotFound() {
  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ottieni il devicePixelRatio
    const ratio = window.devicePixelRatio || 1;

    // Imposta le dimensioni del canvas considerando il devicePixelRatio
    const setCanvasSize = () => {
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(ratio, ratio);
    };

    setCanvasSize();

    // Aggiorna le dimensioni del canvas al ridimensionamento della finestra
    window.addEventListener("resize", setCanvasSize);

    const letters = Array(256).join("01").split("");
    let fontSize = 12;
    let columns = Math.floor(window.innerWidth / fontSize);

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    ctx.font = `${fontSize}px arial`;

    function draw() {
      //@ts-ignore
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; //@ts-ignore
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //@ts-ignore
      ctx.fillStyle = "#64ffda"; // Colore desiderato
      //@ts-ignore
      ctx.font = `${fontSize}px arial`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        //@ts-ignore
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <canvas
        id="matrixCanvas"
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>
      <div className="relative z-10 bg-black p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          404 - Pagina Non Trovata
        </h1>
        <p className="text-gray-400 mb-6">
          La pagina che stai cercando non esiste
        </p>
        <Link to="/">
          <HackerButton>Ritorna alla Home</HackerButton>
        </Link>
      </div>
    </div>
  );
}
