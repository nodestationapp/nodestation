export default {
  register(app) {
    app.addMenuLink({
      icon: "mdi:people",
      to: `/authentication`,
      label: "Authentication",
      loader: () => import("./app.js"),
    });
  },
};
