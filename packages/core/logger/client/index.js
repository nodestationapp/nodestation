import Logger from "./pages/index.js";
import LoggerButton from "./components/LoggerButton.js";

export default {
  register(app) {
    app.addHook("footer.main", () => <LoggerButton />);

    app.addMenuLink({
      to: `/logger`,
      label: "Logger",
      hidden: true,
      Component: Logger,
      icon: "lucide:list",
    });
  },
};
