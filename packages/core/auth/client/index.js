import App from "./app.js";
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

    app.addMiddleware({
      Component: (children) => <AuthMiddleware>{children}</AuthMiddleware>,
    });
  },
};
