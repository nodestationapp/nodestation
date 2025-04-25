import { useEffect } from "react";
import { useBreadcrumbs } from "../contexts/breadcrumps.js";

const useSetBreadcrumbs = (breadcrumbs) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);
};

export default useSetBreadcrumbs;
