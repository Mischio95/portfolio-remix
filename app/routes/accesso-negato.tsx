import { useEffect } from "react";
import { Link } from "@remix-run/react";
import ButtonCustom from "~/components/ButtonCustom";
import HackerButton from "~/components/Button/hacker-button";

export default function AccessDenied() {
  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = Array(256).join("Accesso Negato").split("");
    let fontSize = 16;
    let columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      ctx!.fillStyle = "#64ffda"; // Colore blu sito
      ctx!.font = fontSize + "px arial";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <canvas
        id="matrixCanvas"
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>
      <div className="relative z-10 bg-black p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Accesso Negato</h1>
        <p className="text-gray-400 mb-6">
          Non hai i permessi necessari per visualizzare questa pagina.
        </p>
        <Link to="/">
          <HackerButton>Ritorna alla Home</HackerButton>
        </Link>
      </div>
    </div>
  );
}
