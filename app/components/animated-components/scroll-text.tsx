import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const ScrollEffect = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray<HTMLLIElement>("ul li");
    items.forEach((item, i) => {
      gsap.set(item, { opacity: i !== 0 ? 0.2 : 1 });
      gsap
        .timeline({
          scrollTrigger: {
            scrub: 0.25,
            trigger: item,
            start: "top center+=100",
            end: "bottom center-=100",
          },
        })
        .to(item, {
          opacity: 1,
          ease: "none",
          duration: 0.1,
        })
        .to(item, {
          opacity: i !== items.length - 1 ? 0.2 : 1,
          ease: "none",
          duration: 0.1,
        });
    });

    gsap.fromTo(
      document.documentElement,
      { "--scroller": 0 },
      {
        "--scroller": 1000,
        ease: "none",
        scrollTrigger: {
          scrub: 0.1,
          trigger: "ul",
          start: "top center-=100",
          end: "bottom center+=100",
        },
      }
    );

    // Pinning the content section to control scrolling within it
    ScrollTrigger.create({
      trigger: ".content",
      start: "top top",
      end: "bottom bottom",
      pin: true,
      scrub: true,
      anticipatePin: 1,
      markers: true, // Rimuovi o lascia per debug
    });

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <header>
        <h1 className="text-5xl font-bold">
          you can
          <br />
          scroll.
        </h1>
      </header>
      <main>
        <section className="content w-full max-w-xl my-20 overflow-y-auto h-screen">
          <h2 className="text-3xl mb-6">
            <span aria-hidden="true">you can&nbsp;</span>
            <span className="sr-only">you can ship things.</span>
          </h2>
          <ul className="list-none space-y-2">
            <li style={{ "--i": 0 } as React.CSSProperties}>design.</li>
            <li style={{ "--i": 1 } as React.CSSProperties}>prototype.</li>
            <li style={{ "--i": 2 } as React.CSSProperties}>solve.</li>
            <li style={{ "--i": 3 } as React.CSSProperties}>build.</li>
            <li style={{ "--i": 4 } as React.CSSProperties}>develop.</li>
            <li style={{ "--i": 5 } as React.CSSProperties}>debug.</li>
            <li style={{ "--i": 6 } as React.CSSProperties}>learn.</li>
            <li style={{ "--i": 7 } as React.CSSProperties}>cook.</li>
            <li style={{ "--i": 8 } as React.CSSProperties}>ship.</li>
            <li style={{ "--i": 9 } as React.CSSProperties}>prompt.</li>
            <li style={{ "--i": 10 } as React.CSSProperties}>collaborate.</li>
            <li style={{ "--i": 11 } as React.CSSProperties}>create.</li>
            <li style={{ "--i": 12 } as React.CSSProperties}>inspire.</li>
            <li style={{ "--i": 13 } as React.CSSProperties}>follow.</li>
            <li style={{ "--i": 14 } as React.CSSProperties}>innovate.</li>
            <li style={{ "--i": 15 } as React.CSSProperties}>test.</li>
            <li style={{ "--i": 16 } as React.CSSProperties}>optimize.</li>
            <li style={{ "--i": 17 } as React.CSSProperties}>teach.</li>
            <li style={{ "--i": 18 } as React.CSSProperties}>visualize.</li>
            <li style={{ "--i": 19 } as React.CSSProperties}>transform.</li>
            <li style={{ "--i": 20 } as React.CSSProperties}>scale.</li>
            <li style={{ "--i": 21 } as React.CSSProperties}>do it.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-5xl font-bold">fin.</h2>
        </section>
      </main>
      <footer className="text-sm opacity-50">ʕ⊙ᴥ⊙ʔ jh3yy &copy; 2024</footer>
      <a
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-800 opacity-75 hover:opacity-100"
        href="https://twitter.com/intent/follow?screen_name=jh3yy"
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg
          className="w-9 h-9 text-white"
          viewBox="0 0 969 955"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="161.191"
            cy="320.191"
            r="133.191"
            stroke="currentColor"
            strokeWidth="20"
          ></circle>
          <circle
            cx="806.809"
            cy="320.191"
            r="133.191"
            stroke="currentColor"
            strokeWidth="20"
          ></circle>
          <circle
            cx="695.019"
            cy="587.733"
            r="31.4016"
            fill="currentColor"
          ></circle>
          <circle
            cx="272.981"
            cy="587.733"
            r="31.4016"
            fill="currentColor"
          ></circle>
          <path
            d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
            fill="currentColor"
          ></path>
          <rect
            x="310.42"
            y="448.31"
            width="343.468"
            height="51.4986"
            fill="#FF1E1E"
          ></rect>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
            fill="currentColor"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default ScrollEffect;
