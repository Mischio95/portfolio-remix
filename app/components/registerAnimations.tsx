import { useEffect } from "react";

export function RegisterAnimations() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        const gsapModule = await import("gsap");
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");

        const gsap = gsapModule.gsap || gsapModule.default;
        const ScrollTrigger =
          ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;

        gsap.registerPlugin(ScrollTrigger);

        // Animazione di fade-in con opacità
        ScrollTrigger.batch(".fade-in", {
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
            ),
          start: "top 80%",
        });

        // Animazione di slide-in da sinistra
        ScrollTrigger.batch(".slide-in-left", {
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, x: -100 },
              { opacity: 1, x: 0, duration: 1, stagger: 0.2 }
            ),
          start: "top 80%",
        });

        // Animazione di slide-in da destra
        ScrollTrigger.batch(".slide-in-right", {
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, x: 100 },
              { opacity: 1, x: 0, duration: 1, stagger: 0.2 }
            ),
          start: "top 80%",
        });

        // Parallasse sugli elementi
        gsap.to(".parallax", {
          y: "-20%",
          scrollTrigger: {
            trigger: ".parallax",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Rotazione e scala
        ScrollTrigger.batch(".rotate-scale", {
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, scale: 0.8, rotation: -15 },
              { opacity: 1, scale: 1, rotation: 0, duration: 1, stagger: 0.2 }
            ),
          start: "top 80%",
        });

        // Zoom-in e Slide-in (per far entrare un nuovo dispositivo come in Apple)
        ScrollTrigger.batch(".zoom-slide-in", {
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, scale: 0.5, y: 100 }, // Parte lontano con scala ridotta e spostato verticalmente
              { opacity: 1, scale: 1, y: 0, duration: 1.5, stagger: 0.3 } // Arriva in posizione finale con scala normale
            ),
          start: "top 80%", // Parte quando la sezione arriva vicino alla vista
          end: "bottom top", // Termina quando l'elemento è fuori vista
        });

        // Typewriter + Slide-in per il titolo
        ScrollTrigger.batch(".typewriter-slide", {
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, x: -50, scale: 0.9 }, // Partenza con trasparenza e scalato
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                stagger: 0.2, // Effetto che fa apparire i testi in modo sfalsato
              }
            ),
          start: "top 80%", // Quando l'elemento entra nella vista
          end: "bottom top", // Quando esce dalla vista
        });

        // Effetto di dissolvenza sul background
        gsap.to(".fade-background", {
          opacity: 0.1, // La sezione sfuma al passaggio
          scrollTrigger: {
            trigger: ".fade-background",
            start: "top bottom", // Appena la sezione è visibile
            end: "bottom top", // Quando esce dalla vista
            scrub: true,
            toggleActions: "play none none none", // Impedisce il reset dell'animazione
          },
        });

        // Scale + Rotation per il dispositivo (effetto di ingresso dinamico)
        gsap.to(".scale-rotate", {
          scale: 1.2, // Ingrandisce l'elemento quando entra
          rotation: 360, // Ruota l'elemento
          scrollTrigger: {
            trigger: ".scale-rotate", // L'elemento da animare
            start: "top 80%", // Quando entra nella vista
            end: "bottom top", // Quando esce dalla vista
            scrub: true,
          },
        });

        gsap.utils.toArray(".animated-element").forEach((element: any) => {
          gsap.fromTo(
            element,
            // {
            //   opacity: 0, // Parte con opacità 0
            //   y: 50, // Parte spostato verso il basso
            // },
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,

              scrollTrigger: {
                trigger: element, // L'elemento che attiva il trigger
                start: "top 90%", // Modifica il valore per far partire prima l'animazione
                end: "bottom 30%",
                scrub: 0.5, // Rende l'animazione legata allo scroll (più fluida)
                markers: false, // Rimuove i marker di debug
              },
            }
          );
        });
      })();
    }
  }, []);

  return null; // Non renderizza nulla
}
