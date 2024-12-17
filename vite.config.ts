// import { vitePlugin as remix } from "@remix-run/dev";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// declare module "@remix-run/node" {
//   interface Future {
//     v3_singleFetch: true;
//   }
// }

// export default defineConfig({
//   plugins: [
//     remix({
//       future: {
//         v3_fetcherPersist: true,
//         v3_relativeSplatPath: true,
//         v3_throwAbortReason: true,
//         v3_singleFetch: true,
//         v3_lazyRouteDiscovery: true,
//       },
//     }),
//     tsconfigPaths(),
//   ],
// });


import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Dichiarazione TypeScript opzionale per abilitare funzionalità future di Remix
declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  // Plugins di Vite
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true, // Mantieni lo stato dei fetcher tra navigazioni
        v3_relativeSplatPath: true, // Abilita percorsi relativi con *
        v3_throwAbortReason: true, // Espone ragioni per errori di abort
        v3_singleFetch: true, // Riduce i fetch multipli in una singola richiesta
        v3_lazyRouteDiscovery: true, // Caricamento lazy delle route
      },
    }),
    tsconfigPaths(), // Plugin per mappare percorsi definiti in tsconfig.json
  ],

  // Aggiungere opzioni di alias
  resolve: {
    alias: {
      "@components": "/src/components", // Alias per i componenti
      "@utils": "/src/utils", // Alias per utility
    },
  },

  // Configurazioni per il server di sviluppo
  server: {
    port: 5173, // Porta del server di sviluppo
    open: true, // Apri automaticamente il browser
    strictPort: true, // Esci se la porta è occupata
  },

  // Configurazioni per la build di produzione
  build: {
    outDir: "dist", // Directory di output
    sourcemap: true, // Abilita la mappa del codice sorgente per debugging
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Divisione dei pacchetti principali
        },
      },
    },
  },

  // Ottimizzazioni per dipendenze
  optimizeDeps: {
    include: ["react", "react-dom"], // Dipendenze da pre-bundlare
    exclude: ["@remix-run/dev"], // Evita di pre-bundlare Remix
  },
});