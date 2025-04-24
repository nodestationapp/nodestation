export default {
  register(app) {
    app.addMenuLink({
      icon: "mdi:settings",
      to: `/settings`,
      label: "Settings",
      placement: "bottom",
      loader: () => import("./app.js"),
    });
  },
};
