import App from "./app.js";
import AppSettings from "./appSettings.js";

import AuthMiddleware from "./contexts/authMiddleware.js";

export default {
  register(app) {
    app.addMenuLink({
      order: 2,
      icon: "mdi:people",
      to: `/authentication`,
      label: "Authentication",
      Component: App,
    });

    app.addMenuLink({
      icon: "mdi:settings",
      to: `/settings`,
      label: "Settings",
      placement: "bottom",
      Component: AppSettings,
    });

    app.addMiddleware({
      Component: (children) => <AuthMiddleware>{children}</AuthMiddleware>,
    });
  },
};
