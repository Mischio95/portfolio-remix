/** @type {import('@remix-run/dev').AppConfig} */
export default {
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
        route("/api/players", "routes/api/players.ts");
        route("/api/players/:id", "routes/api/players.$id.ts");
      });
    }
  };
