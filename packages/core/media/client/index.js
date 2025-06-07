import App from "./app.js";
import MediaProvider from "./contexts/media.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/media`,
      order: 3,
      Component: App,
      icon: "lucide:image",
      label: "Media",
    });

    app.addMiddleware({
      Component: (children) => <MediaProvider>{children}</MediaProvider>,
    });
  },
};
