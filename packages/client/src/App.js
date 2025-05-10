import { Routes, Route } from "react-router-dom";

import { useApp } from "contexts/app.js";
import { DashboardLayout } from "@nstation/design-system/Layouts";

const App = () => {
  const { menuLinks } = useApp();

  const formattedMenuLinks = menuLinks?.filter((item) => !!item?.Component);

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {formattedMenuLinks.map((link) => (
          <Route
            key={link.to}
            path={`${link.to}/*`}
            element={<link.Component />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
