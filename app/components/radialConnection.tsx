"use client";

import { useEffect, useRef } from "react";

export default function RadialConnection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const topY = 60;
    const bottomY = canvas.offsetHeight - 60;

    const paths = [
      {
        start: { x: centerX - 420, y: topY },
        control1: { x: centerX - 420, y: centerY - 50 },
        control2: { x: centerX - 200, y: centerY - 50 },
        end: { x: centerX, y: centerY },
      },
      {
        start: { x: centerX - 250, y: topY },
        control1: { x: centerX - 250, y: centerY - 50 },
        control2: { x: centerX - 100, y: centerY - 50 },
        end: { x: centerX, y: centerY },
      },
      {
        start: { x: centerX - 80, y: topY },
        control1: { x: centerX - 80, y: centerY - 30 },
        control2: { x: centerX - 50, y: centerY - 30 },
        end: { x: centerX, y: centerY },
      },
      {
        start: { x: centerX + 80, y: topY },
        control1: { x: centerX + 80, y: centerY - 30 },
        control2: { x: centerX + 50, y: centerY - 30 },
        end: { x: centerX, y: centerY },
      },
      {
        start: { x: centerX + 250, y: topY },
        control1: { x: centerX + 250, y: centerY - 50 },
        control2: { x: centerX + 100, y: centerY - 50 },
        end: { x: centerX, y: centerY },
      },
      {
        start: { x: centerX + 420, y: topY },
        control1: { x: centerX + 420, y: centerY - 50 },
        control2: { x: centerX + 200, y: centerY - 50 },
        end: { x: centerX, y: centerY },
      },
    ];

    const pathsTop = paths;
    const pathsBottom = paths.map((path) => ({
      start: { ...path.start, y: bottomY },
      control1: { ...path.control1, y: centerY + (centerY - path.control1.y) },
      control2: { ...path.control2, y: centerY + (centerY - path.control2.y) },
      end: path.end,
    }));

    let glowOpacity = 0;

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    // Creazione del gradiente per la sfocatura
    const gradient = ctx.createLinearGradient(0, -10, 0, 10);
    gradient.addColorStop(0, "rgba(100, 255, 218, 0.2)"); // Parte superiore sfocata
    gradient.addColorStop(0.4, "rgba(100, 255, 218, 1)"); // Centro opaco
    gradient.addColorStop(1, "rgba(100, 255, 218, 0.2)"); // Parte inferiore sfocata
    class Particle {
      private topPath: (typeof paths)[0];
      private bottomPath: (typeof paths)[0];
      private t: number = 0; // Progress along the path
      private direction: "down" | "up" = "down"; // Direction of movement

      constructor(topPath: (typeof paths)[0], bottomPath: (typeof paths)[0]) {
        this.topPath = topPath;
        this.bottomPath = bottomPath;
      }

      update() {
        console.log(`Direzione: ${this.direction}, t: ${this.t}`);

        // Aumenta t quando la direzione è "down"
        if (this.direction === "down") {
          this.t += 0.009; // Incremento lento
          if (this.t >= 1) {
            this.t = 1; // Limita t a 1
            this.direction = "up"; // Cambia direzione a "up"
            glowOpacity = 1; // Aggiungi l'effetto del glow
          }
        }

        // Diminuisci t quando la direzione è "up"
        if (this.direction === "up") {
          this.t -= 0.009; // Decremento lento
          if (this.t <= 0) {
            this.t = 0; // Limita t a 0
            this.direction = "down"; // Cambia direzione a "down"
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Determina il percorso corrente e l'avanzamento della progressione
        const currentPath =
          this.direction === "down" ? this.topPath : this.bottomPath;
        const easedT = easeInOutQuad(this.t);
        const { x, y } = this.getBezierPoint(easedT, currentPath);

        // Calcola la distanza dal centro
        const distanceFromCenter = Math.hypot(x - centerX, y - centerY);
        const maxDistance = Math.hypot(centerX, centerY);
        const scale = 1 + (2 - distanceFromCenter / maxDistance) * 0.5; // Scala tra 1 e 1.5

        ctx.save();
        ctx.translate(x, y);

        // Calcola l'orientamento della particella
        const deltaT = 0.001; // Piccolo passo per calcolare la direzione
        const tBefore =
          this.direction === "down"
            ? Math.max(easedT - deltaT, 0)
            : Math.min(easedT + deltaT, 1);
        const pointBefore = this.getBezierPoint(tBefore, currentPath);
        const angle = Math.atan2(y - pointBefore.y, x - pointBefore.x);

        ctx.rotate(angle);

        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 1.5, 0, 0, Math.PI * 2); // Forma particella scalata        // ctx.fillStyle = "rgba(100, 255, 218, 1)";
        ctx.fillStyle = gradient;

        ctx.fill();
        ctx.restore();
      }

      private getBezierPoint(t: number, path: (typeof paths)[0]) {
        // Calcola il punto della curva di Bezier alla progressione t
        const { start, control1, control2, end } = path;
        return {
          x:
            Math.pow(1 - t, 3) * start.x +
            3 * Math.pow(1 - t, 2) * t * control1.x +
            3 * (1 - t) * Math.pow(t, 2) * control2.x +
            Math.pow(t, 3) * end.x,
          y:
            Math.pow(1 - t, 3) * start.y +
            3 * Math.pow(1 - t, 2) * t * control1.y +
            3 * (1 - t) * Math.pow(t, 2) * control2.y +
            Math.pow(t, 3) * end.y,
        };
      }
    }

    const particles = pathsTop.map(
      (topPath, index) => new Particle(topPath, pathsBottom[index])
    );

    function drawPaths() {
      if (!ctx) return;
      ctx.strokeStyle = "rgba(100, 255, 218, 0.2)";
      ctx.lineWidth = 2;
      paths.concat(pathsBottom).forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path.start.x, path.start.y);
        ctx.bezierCurveTo(
          path.control1.x,
          path.control1.y,
          path.control2.x,
          path.control2.y,
          path.end.x,
          path.end.y
        );
        ctx.stroke();
      });
    }

    function drawCenterGlow() {
      if (!ctx || glowOpacity <= 0) return;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.filter = "blur(10px)";
      ctx.fillStyle = `rgba(100, 255, 218, ${glowOpacity})`;
      ctx.fill();
      ctx.filter = "none";
      ctx.restore();

      // Linear fade out
      glowOpacity = Math.max(0, glowOpacity - 0.01);
    }

    function animate() {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      drawPaths();
      drawCenterGlow();

      particles.forEach((particle) => {
        particle.update();
        if (ctx) {
          particle.draw(ctx);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
    return () => window.removeEventListener("resize", setCanvasSize);
  }, []);

  return (
    <div className="radial-connection-container relative w-full min-h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="center-circle">
          <div className="inner-circle">
            {/* <img
              src="https://micheletrombone.it/icons/git.svg"
              alt="Center Icon"
              className="center-image"
              style={{ width: "40px", height: "40px" }}
            /> */}
            <svg
              width="50px"
              height="32.4668185px"
              viewBox="0 0 100 52.4668185"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ margin: "12px" }}
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="cropped-logoparticles" fill="#64FFDA" fillRule="nonzero">
                  <path
                    d="M0,24.9614637 C0.132378711,24.7452717 0.294104883,24.6392857 0.392274805,24.4911711 C0.944484961,23.6580383 1.35470488,22.6892363 2.0431582,21.994407 C8.79963105,15.1753347 15.5679107,8.36710447 22.4102377,1.6344574 C24.5781496,-0.498706466 27.8593033,-0.552964669 30.0274461,1.52531072 C33.0795973,4.45095408 36.0222787,7.49071346 39.0174687,10.4759554 C39.5844609,11.0410672 40.1780338,11.5795146 40.851152,12.2172486 C41.0505861,12.0298306 41.3051396,11.8031215 41.5458262,11.5625392 C44.9513883,8.15848221 48.368767,4.76606893 51.7519652,1.33991209 C52.9806793,0.0955995891 55.3204715,0.0831197063 56.5486312,1.24924744 C57.9647602,2.59385818 57.9810262,4.81907244 56.6890656,6.13069939 C52.716434,10.163806 48.7856061,14.2452906 44.6596057,18.1173097 C42.3289926,20.3044664 39.1464531,20.1002371 36.7322416,17.7991728 C33.5422695,14.7587101 30.4450572,11.6208951 27.312234,8.52062225 C27.1852016,8.39490701 27.108866,8.219574 26.99669,8.0769699 C26.5476078,7.50604685 26.1799752,7.53157244 25.6420523,8.07370662 C19.8698863,13.891108 14.0697152,19.6807246 8.27718672,25.4779172 C7.44192383,26.3138543 7.42753828,26.3283263 8.24039941,27.1273982 C10.0110121,28.867967 11.8086234,30.5811178 13.5751619,32.3257576 C16.042842,34.7628486 18.4950619,37.2156273 20.9484338,39.6671664 C22.5484506,41.2659836 24.1379381,42.8753387 25.7344604,44.4776666 C25.9354174,44.6793568 26.1505307,44.8669445 26.4005572,45.0996709 C30.1519334,41.3379144 33.8225604,37.6494597 37.5015736,33.9693855 C48.2229918,23.2448797 58.943516,12.519474 69.6745516,1.80459881 C72.0042408,-0.521590255 75.4583299,-0.512613692 77.7671396,1.78719275 C84.7067953,8.69980271 91.6392625,15.6198424 98.5271871,22.5838105 C99.1502881,23.2137871 99.4323432,24.1810721 99.9363898,24.9312113 C100,25.7216703 100,26.5726279 100,27.5143367 C99.8777867,27.6317965 99.6527852,27.6467691 99.6482016,27.6869099 C99.4737326,29.2152117 98.3889699,30.1815521 97.429043,31.1915588 C95.9779918,32.7183199 94.4464982,34.1684054 92.9574848,35.6593621 C89.5623684,39.0588951 86.1829102,42.474134 82.7758193,45.861609 C80.9964418,47.6307344 79.2295934,49.4195652 77.3526967,51.0816109 C75.2516746,52.9421162 72.0469416,52.897383 70.0123072,50.9855043 C67.7993357,48.9060472 65.6999289,46.7057418 63.5507762,44.5583652 C62.2022986,43.2110082 60.8478189,41.8695818 59.5074594,40.514208 C58.9870631,39.9879943 58.7100805,40.457506 58.4067643,40.7603871 C55.0221205,44.1401672 51.643926,47.5264023 48.2618004,50.9087037 C46.7774809,52.3931037 44.5676117,52.3021769 43.3017998,50.843824 C42.0052648,49.3500662 41.9309795,47.5862931 43.3540135,46.1237799 C47.2792447,42.0896482 51.2103141,38.0544375 55.3000092,34.1899644 C57.3157668,32.2852146 60.7064844,32.2976422 62.842542,34.3275916 C65.1590883,36.5290652 67.4295187,38.7792539 69.7096229,41.018815 C70.8948314,42.1829533 72.0664203,43.3613431 73.2255398,44.5514332 C73.6290633,44.9657392 73.7551033,45.1013039 74.3012369,44.5183765 C76.3042867,42.3803818 78.4710168,40.396459 80.5582166,38.3363853 C82.2975516,36.6196465 84.0155422,34.8811935 85.7360959,33.1455361 C87.4949037,31.3712846 89.2414451,29.5848679 91.0022676,27.812634 C91.4199828,27.3922217 91.9083953,27.0368379 92.2882795,26.5873115 C92.3990607,26.4562111 92.3427045,26.0071021 92.2011732,25.8657228 C89.5444035,23.2117336 86.8465781,20.598815 84.1921031,17.9425697 C81.7660629,15.5149232 79.3850959,13.0422871 76.976633,10.5969918 C76.0782361,9.68486189 75.1389443,8.81234822 74.2572605,7.88473904 C73.8840281,7.49207244 73.572302,7.4919115 73.2280492,7.84218728 C70.7984984,10.3142303 68.3954357,12.8126961 65.9425975,15.2613443 C63.8489604,17.3514049 61.6776109,19.3635951 59.5826148,21.4523357 C57.7107131,23.3186494 55.9173645,25.2636474 54.0499627,27.1346074 C52.4131238,28.7745666 50.7021309,30.3403926 49.0598439,31.9750857 C47.5223422,33.5054826 46.0479437,35.0991617 44.5160807,36.6353762 C43.2061672,37.9490209 41.8337912,39.2004621 40.5266463,40.5167592 C39.2705471,41.7816471 38.0781322,43.109591 36.8295252,44.382156 C35.4714752,45.7662652 34.1026188,47.1412849 32.6976746,48.4773707 C31.5796256,49.5406162 30.4783195,50.6485234 29.2300314,51.5415381 C27.2679121,52.9452097 24.3129879,52.7330053 22.59451,51.033051 C15.4688447,43.9842056 8.38738301,36.8904066 1.33559902,29.7676635 C0.756734961,29.1829775 0.523065039,28.2565367 0.0645003906,27.546991 C0,26.7541301 0,25.9031724 0,24.9614637 Z"
                    id="Path"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
}
