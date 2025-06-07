import App from "./app.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/`,
      order: 1,
      Component: App,
      icon: "lucide:home",
      label: "Dashboard",
    });
  },
};
