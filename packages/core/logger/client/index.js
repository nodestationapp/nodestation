import Logger from "./pages/index.js";
import LoggerButton from "./components/LoggerButton.js";

import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

export default {
  register(app) {
    app.addHook("footer.main", [
      {
        to: "/logger",
        label: "Logs",
        icon: ListOutlinedIcon,
      },
    ]);

    app.addMenuLink({
      to: `/logger`,
      label: "Logs",
      hidden: true,
      Component: Logger,
      icon: "lucide:list",
    });
  },
};
