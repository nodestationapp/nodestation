import express from "express";
import checkApiToken from "@nstation/auth/utils/checkApiToken.js";
import validate from "@nstation/tables/server/utils/validate.js";
import authMiddleware from "@nstation/auth/utils/authMiddleware.js";

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
      ...(route?.auth ? [authMiddleware(route?.auth)] : []),
      ...(route?.middlewares || []),
      ...(route?.validation ? [validate({ schema: route?.validation })] : []),
      route?.handler
    );
  }
};

export default loadRoute;
