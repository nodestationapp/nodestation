import express from "express";

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
  let prefix = type === "system" ? "" : "/api";

  for await (const route of routes) {
    if (route?.type === "admin") {
      prefix = "/admin-api";
    }

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
      ...(route?.middlewares || []),
      route?.handler
    );
  }
};

export default loadRoute;
