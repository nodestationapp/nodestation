import App from "./app.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/tables`,
      Component: App,
      hidden: true,
    });
  },
};
