/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: "app",
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  tailwind: true,
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/api/players", "app/routes/api/players.ts");
      route("/api/players/:id", "app/routes/api/players.$id.ts");
      route("/spese", "app/routes/spese/index.tsx");
      route("/spese/new", "app/routes/spese/new.tsx");
      route("/spese/:id", "app/routes/spese/$id.tsx");
      // ...altre rotte...
    });
  },
};