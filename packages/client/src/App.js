import { Routes, Route } from "react-router-dom";

import Table from "@nstation/tables/client/app.js";
import { DashboardLayout } from "@nstation/design-system/Layouts";

import { useApp } from "contexts/app";

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
        <Route path={`/tables/:id/*`} element={<Table />} />
      </Route>
    </Routes>
  );
};

export default App;
