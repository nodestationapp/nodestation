import { PageLoader } from "@nstation/design-system";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRegisterSlot } from "./slots";
import { api } from "@nstation/design-system/utils";

const AppContext = createContext();

const AppProvider = ({ children, app }) => {
  const registerSlot = useRegisterSlot();
  const [site, setSite] = useState(null);
  const [initLoading, setInitLoading] = useState(true);

  const menuLinks = app.getMenuLinks();
  const middlewares = app.getMiddlewares();
  const hooks = app.getHooks();

  useEffect(() => {
    hooks.forEach((hook) => {
      registerSlot(hook.name, hook.Component);
    });
  }, []);

  useEffect(() => {
    api.get(`/admin-api/init`).then((data) => {
      setSite(data);
      setInitLoading(false);
    });
  }, []);

  const value = useMemo(() => {
    return {
      site,
      menuLinks,
      middlewares,
    };
    // eslint-disable-next-line
  }, [menuLinks, middlewares, site]);

  if (!!!middlewares?.length && !initLoading) return <PageLoader />;

  const wrappedChildren = middlewares.reduceRight((acc, middleware) => {
    return middleware.Component(acc);
  }, children);

  return (
    <AppContext.Provider value={value}>{wrappedChildren}</AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);
export { AppContext, useApp };
export default AppProvider;
