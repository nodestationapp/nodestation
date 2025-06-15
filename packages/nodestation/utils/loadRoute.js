import express from "express";

const loadRoute = async (router, routes, type) => {
  const prefix = type === "system" ? "" : "/api";

  for await (const route of routes) {
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
