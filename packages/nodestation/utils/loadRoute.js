import express from "express";
import checkApiToken from "@nstation/auth/utils/checkApiToken.js";
function removeExistingRoute(router, method, path) {
  router.stack = router.stack.filter(
    (layer) =>
      !(
        layer.route &&
        layer.route.path === path &&
        layer.route.methods[method.toLowerCase()]
      )
  );
}

const loadRoute = async (router, routes, type) => {
  for await (const route of routes) {
    let prefix =
      type === "system" || route?.path?.startsWith("/admin-api") ? "" : "/api";

    removeExistingRoute(
      router,
      route?.method.toLowerCase(),
      `${prefix}${route?.path}`
    );

    router[route?.method.toLowerCase()](
      `${prefix}${route?.path}`,
      route?.parser === "raw"
        ? express.raw({ type: "application/json" })
        : express.json(),
      checkApiToken,
      ...(route?.middlewares || []),
      route?.handler
    );
  }
};

export default loadRoute;
