import App from "./app.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/media`,
      order: 3,
      Component: App,
      icon: "mdi:image",
      label: "Media",
    });
  },
};
