import Logger from "./pages/index.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/logger`,
      label: "Logs",
      placement: "bottom",
      Component: Logger,
      icon: "lucide:list",
    });
  },
};
