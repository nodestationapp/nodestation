import { createContext, useContext, useMemo, useState } from "react";

const BreadcrumbsContext = createContext();

const BreadcrumbsProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const value = useMemo(() => {
    return {
      breadcrumbs,
      setBreadcrumbs,
    };
    // eslint-disable-next-line
  }, [breadcrumbs]);

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

const useBreadcrumbs = () => useContext(BreadcrumbsContext);
export { BreadcrumbsContext, useBreadcrumbs };
export default BreadcrumbsProvider;
