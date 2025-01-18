import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import api from "libs/api";

const EndpointsContext = createContext();

const EndpointsProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [archive_modal, setArchiveModal] = useState(null);
  const { search } = useLocation();
  const navigate = useNavigate();

  const filters = queryString.parse(search);

  const { isLoading: loading, data: endpoints } = useQuery({
    queryKey: ["client_endpoints", filters],
    queryFn: () =>
      api.get(
        `/endpoints?${queryString.stringify({
          ...filters,
        })}`
      ),
  });

  const orderHandler = async (items) => {
    let formatted_groups = items?.map((item, index) => ({
      id: item?.group?.id,
      order: index + 1,
    }));

    api.put(`/groups/order`, formatted_groups);

    queryClient.setQueryData(["client_endpoints", filters], () => [...items]);
  };

  const filterHandler = (name, value) => {
    navigate(
      `/endpoints?${queryString.stringify({
        ...filters,
        [name]: value || undefined,
      })}`
    );
  };

  const value = useMemo(() => {
    return {
      endpoints,
      loading,
      archive_modal,
      setArchiveModal,
      orderHandler,
      filters,
      filterHandler,
    };
    // eslint-disable-next-line
  }, [endpoints, loading, archive_modal, filters]);

  return (
    <EndpointsContext.Provider value={value}>
      {children}
    </EndpointsContext.Provider>
  );
};

const useEndpoints = () => useContext(EndpointsContext);
export { EndpointsContext, useEndpoints };
export default EndpointsProvider;
