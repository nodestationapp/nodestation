import Logger from "./components/Logger.js";

export default {
  register(app) {
    app.addHook("footer.main", () => <Logger />);
  },
};
