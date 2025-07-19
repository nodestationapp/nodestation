import App from "./app.js";
import AppSettings from "./appSettings.js";

import AuthMiddleware from "./contexts/authMiddleware.js";

export default {
  register(app) {
    app.addMenuLink({
      order: 2,
      icon: "lucide:users",
      to: `/authentication`,
      label: "Authentication",
      Component: App,
    });

    app.addMenuLink({
      order: 3,
      icon: "lucide:settings",
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
