import App from "./app.js";
import EmailTableType from "./components/EmailTableType.js";

export default {
  register(app) {
    app.addMenuLink({
      order: 4,
      icon: "lucide:send-horizontal",
      to: `/emails`,
      label: "Emails",
      Component: App,
    });

    app.addHook("logger.table.types", [
      {
        type: "email",
        Component: (props) => <EmailTableType {...props} />,
      },
    ]);
  },
};
