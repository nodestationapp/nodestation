import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import api from "libs/api";

const CollectionContext = createContext();

const CollectionProvider = ({ children }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: loading, data } = useQuery({
    queryKey: ["tables", id],
    queryFn: () => api.get(`/tables/${id}`),
  });

  const { data: functions } = useQuery({
    queryKey: ["client_helpers"],
    queryFn: () => api.get(`/helpers`),
  });

  const { data: emails } = useQuery({
    queryKey: ["client_emails"],
    queryFn: () => api.get(`/emails`),
  });

  const updateCollection = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/tables/${id}`, { ...values });

        queryClient.refetchQueries({
          queryKey: ["tables"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteCollection = () =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/tables/${id}`);

        navigate("/");

        queryClient.refetchQueries({
          queryKey: ["tables"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateCollectionEntry = (entry_id, values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/collections/${id}/entries/${entry_id}`, values);

        queryClient.refetchQueries({
          queryKey: ["client_collections", id],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      data,
      id,
      loading,
      functions,
      emails,
      updateCollection,
      updateCollectionEntry,
      deleteCollection,
    };
    // eslint-disable-next-line
  }, [data, id, loading, functions, emails]);

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};

const useCollection = () => useContext(CollectionContext);
export { CollectionContext, useCollection };
export default CollectionProvider;
