import Logger from "./app.js";
import LoggerTableType from "./components/LoggerTableType.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/logs`,
      label: "Logs",
      placement: "bottom",
      Component: Logger,
      icon: "lucide:list",
    });

    app.addHook("logger.table.types", [
      {
        type: "api",
        Component: (props) => <LoggerTableType {...props} />,
      },
    ]);
  },
};
