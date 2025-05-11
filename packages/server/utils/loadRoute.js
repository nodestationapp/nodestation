import express from "express";

const loadRoute = async (router, routes) => {
  for await (const route of routes) {
    router[route?.method.toLowerCase()](
      `/api${route?.path}`,
      route?.properties?.parser === "raw"
        ? express.raw({ type: "application/json" })
        : express.json(),
      ...route?.middlewares,
      route?.handler
    );
  }
};

export default loadRoute;
