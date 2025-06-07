import App from "./app.js";

export default {
  register(app) {
    app.addMenuLink({
      order: 4,
      icon: "lucide:send-horizontal",
      to: `/emails`,
      label: "Emails",
      Component: App,
    });
  },
};
