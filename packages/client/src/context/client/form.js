import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";
import { useApp } from "context/app";
import { useOrganization } from "context/organization";
import sortParser from "libs/sortParser";

const FormContext = createContext();

const FormProvider = ({ archived, children }) => {
  const { id } = useParams();
  const { setFormsCount } = useApp();
  const queryClient = useQueryClient();
  const { preferences, loading: preferencesLoading } = useOrganization();

  const table_preferences = preferences?.find((item) => item?.table_id === id);

  const [checked, setChecked] = useState([]);
  const [columnOrder, setColumnOrder] = useState(
    table_preferences?.order || null
  );
  const [columnVisibility, setColumnVisibility] = useState(
    table_preferences?.visibility || []
  );
  const [sort, setSort] = useState(table_preferences?.sort || []);

  const sort_query = sortParser(sort);

  const {
    data,
    isLoading: loading,
    refetch: refetchForms,
  } = useQuery({
    queryKey: ["forms", id, archived, sort_query],
    queryFn: () =>
      api.get(
        `/forms/${id}?archived=${archived === true ? 1 : 0}&sort=${sort_query}`
      ),
    enabled: id !== "new" && !!!preferencesLoading,
  });

  const { data: emails } = useQuery({
    queryKey: ["emails"],
    queryFn: () => api.get("/emails"),
  });

  const createForm = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post("/forms", { ...values });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateForm = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/forms/${id}`, { ...values });

        queryClient.refetchQueries({
          queryKey: ["forms", id, archived],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateIncomeForm = (entry_id, values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/forms/${id}/entry/${entry_id}`, { ...values });

        refetchForms();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const readHandler = async (id, is_read) => {
    try {
      const next_state = !is_read;

      await updateIncomeForm(id, { is_read: next_state });
      setFormsCount((prev) =>
        next_state ? parseInt(prev) - 1 : parseInt(prev) + 1
      );
    } catch (err) {
      console.error(err);
    }
  };

  const value = useMemo(() => {
    return {
      data,
      id,
      loading,
      archived,
      emails,
      createForm,
      updateForm,
      updateIncomeForm,
      readHandler,
      checked,
      setChecked,
      sort,
      setSort,
      columnOrder,
      setColumnOrder,
      columnVisibility,
      setColumnVisibility,
    };
    // eslint-disable-next-line
  }, [
    data,
    id,
    loading,
    archived,
    emails,
    checked,
    sort,
    columnOrder,
    columnVisibility,
  ]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

const useForm = () => useContext(FormContext);
export { FormContext, useForm };
export default FormProvider;
