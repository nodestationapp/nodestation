import { PageLoader } from "@nstation/design-system";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useRegisterSlot } from "./slots";

const AppContext = createContext();

const AppProvider = ({ children, app }) => {
  const registerSlot = useRegisterSlot();

  const menuLinks = app.getMenuLinks();
  const middlewares = app.getMiddlewares();
  const hooks = app.getHooks();

  useEffect(() => {
    hooks.forEach((hook) => {
      registerSlot(hook.name, hook.Component);
    });
  }, []);

  const value = useMemo(() => {
    return {
      menuLinks,
      middlewares,
    };
    // eslint-disable-next-line
  }, [menuLinks, middlewares]);

  if (!!!middlewares?.length) return <PageLoader />;

  const content = (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );

  const wrappedContent = middlewares.reduceRight((children, middleware) => {
    return middleware.Component(children);
  }, content);

  return wrappedContent;
};

const useApp = () => useContext(AppContext);
export { AppContext, useApp };
export default AppProvider;
