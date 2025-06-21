import EndpointMethod from "./components/EndpointMethod.js";
import EndpointStatus from "./components/EndpointStatus.js";
import Logger from "./pages/index.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/logger`,
      label: "Logs",
      placement: "bottom",
      Component: Logger,
      icon: "lucide:list",
    });

    app.addHook("content-types.add", [
      {
        label: "Endpoint Status",
        key: "logger:endpoint-status",
        hiddenInContentTypeSelect: true,
        columnRender: (props) => <EndpointStatus {...props} />,
      },
      {
        label: "Endpoint Method",
        key: "logger:endpoint-method",
        hiddenInContentTypeSelect: true,
        columnRender: (props) => <EndpointMethod {...props} />,
      },
    ]);
  },
};
