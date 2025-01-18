import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import schedule_data from "libs/schedule_data.json";

import api from "libs/api";

const CronsContext = createContext();

const CronsProvider = ({ children }) => {
  const [archive_modal, setArchiveModal] = useState(null);

  const { isLoading: loading, data: crons } = useQuery({
    queryKey: ["client_crons"],
    queryFn: () => api.get("/crons"),
  });

  const formatted_crons = crons?.map(
    ({ id, name, schedule, timezone, status }) => ({
      id,
      label: name,
      schedule: schedule_data?.find((item) => item?.value === schedule)?.label,
      timezone,
      status,
      href: `/crons/${id}`,
    })
  );

  const value = useMemo(() => {
    return { crons: formatted_crons, loading, archive_modal, setArchiveModal };
    // eslint-disable-next-line
  }, [crons, loading, archive_modal]);

  return (
    <CronsContext.Provider value={value}>{children}</CronsContext.Provider>
  );
};

const useCrons = () => useContext(CronsContext);
export { CronsContext, useCrons };
export default CronsProvider;
