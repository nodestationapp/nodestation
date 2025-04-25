import App from "./app.js";

export default {
  register(app) {
    app.addMenuLink({
      icon: "mdi:settings",
      to: `/settings`,
      label: "Settings",
      placement: "bottom",
      Component: App,
    });
  },
};
