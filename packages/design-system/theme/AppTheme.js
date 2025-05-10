import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { inputsCustomizations } from "./customizations/inputs.js";
import { feedbackCustomizations } from "./customizations/feedback.js";
import { surfacesCustomizations } from "./customizations/surfaces.js";
import { navigationCustomizations } from "./customizations/navigation.js";
import { dataDisplayCustomizations } from "./customizations/dataDisplay.js";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives.js";

import { dataGridCustomizations } from "../theme/customizations/dataGrid.js";
import { datePickersCustomizations } from "../theme/customizations/datePickers.js";

function AppTheme(props) {
  const { children, disableCustomTheme } = props;

  const themeComponents = {
    ...dataGridCustomizations,
    ...datePickersCustomizations,
  };

  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes,
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};

export default AppTheme;
