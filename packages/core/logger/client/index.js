import Logger from "./pages/index.js";
import EndpointMethod from "./components/EndpointMethod.js";
import EndpointStatus from "./components/EndpointStatus.js";

export default {
  register(app) {
    app.addMenuLink({
      to: `/logger`,
      label: "Logs",
      placement: "bottom",
      Component: Logger,
      icon: "lucide:list",
    });

    app.addHook("field-types.add", [
      {
        columnType: "number",
        label: "Endpoint Status",
        key: "logger:endpoint-status",
        hiddenInfieldTypeSelect: true,
        columnRender: (props) => <EndpointStatus {...props} />,
      },
      {
        label: "Endpoint Method",
        columnType: "singleSelect",
        key: "logger:endpoint-method",
        hiddenInfieldTypeSelect: true,
        columnRender: (props) => <EndpointMethod {...props} />,
        filterValueOptions: () => [
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
          { value: "PUT", label: "PUT" },
          { value: "DELETE", label: "DELETE" },
        ],
      },
    ]);
  },
};
