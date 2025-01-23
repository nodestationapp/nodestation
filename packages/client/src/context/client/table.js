import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "libs/api";

const TableContext = createContext();

const TableProvider = ({ children }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: loading,
    data,
    refetch: tableRefetch,
  } = useQuery({
    queryKey: ["tables", id],
    queryFn: () => api.get(`/tables/${id}`),
  });

  const updateTable = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/tables/${id}`, { ...values });

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteTable = () =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/tables/${id}`);

        navigate("/");

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const addTableEntry = (formData) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post(`/tables/${id}/entry`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateTableEntry = (entry_id, values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/tables/${id}/entry/${entry_id}`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        tableRefetch();

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
      updateTable,
      updateTableEntry,
      deleteTable,
      addTableEntry,
    };
    // eslint-disable-next-line
  }, [data, id, loading]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

const useTable = () => useContext(TableContext);
export { TableContext, useTable };
export default TableProvider;
