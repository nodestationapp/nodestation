import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";

import { DashboardLayout } from "@nstation/design-system/Layouts";

import { useApp } from "contexts/app";

const App = () => {
  const { site, menuLinks } = useApp();
  const formattedMenuLinks = menuLinks?.filter((item) => !!item?.Component);

  return (
    <>
      <Helmet>
        <title>{site?.title || "Nodestation"}</title>
        {!!site.favicon && <link rel="icon" href={site.favicon} />}
      </Helmet>
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
    </>
  );
};

export default App;
