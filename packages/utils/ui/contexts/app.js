import { createContext, useContext, useEffect, useMemo, useState } from "react";

// import SplashScreen from "components/SplashScreen";
import pluginsLoader from "libs/helpers/pluginsLoader";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [menuLinks, setMenuLinks] = useState([]);
  const [middlewares, setMiddlewares] = useState([]);

  const app = {
    addMenuLink: (props) => {
      setMenuLinks((prev) => {
        const exists = prev.some((link) => link.to === props.to);
        if (exists) return prev;
        return [...prev, props];
      });
    },
    addMiddleware: (props) => {
      setMiddlewares((prev) => {
        return [...prev, props];
      });
    },
  };

  useEffect(() => {
    (async function () {
      await pluginsLoader(app);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return {
      app,
      menuLinks,
      middlewares,
    };
    // eslint-disable-next-line
  }, [app, menuLinks, middlewares]);

  if (!!!middlewares?.length) return null;

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
