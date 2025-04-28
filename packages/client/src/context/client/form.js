import queryString from "query-string";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";
import sortParser from "libs/sortParser";

// import { useApp } from "context/app";

const FormContext = createContext();

const FormProvider = ({ archived, children }) => {
  const { id } = useParams();
  // const { setFormsCount } = useApp();
  const queryClient = useQueryClient();

  const table_preferences = {};

  const [checked, setChecked] = useState([]);
  const [columnOrder, setColumnOrder] = useState(
    table_preferences?.order || null
  );
  const [columnVisibility, setColumnVisibility] = useState(
    table_preferences?.visibility || []
  );
  const [sort, setSort] = useState(table_preferences?.sort || []);
  const [filters, setFilters] = useState(
    table_preferences?.filters || [{ field: null, value: "" }]
  );

  const sort_query = sortParser(sort);
  const filters_query = filters.reduce((acc, item) => {
    if (item.field) {
      acc[item.field] = Array.isArray(item.value)
        ? item?.value?.join(",") || undefined
        : item.value || undefined;
    }
    return acc;
  }, {});

  const {
    data,
    isLoading: loading,
    refetch: refetchForms,
  } = useQuery({
    queryKey: ["forms", id, archived, sort_query, filters_query],
    queryFn: () =>
      api.get(
        `/forms/${id}?${queryString.stringify({
          ...filters_query,
          archived: archived === true ? 1 : 0,
          sort: sort_query || undefined,
        })}`
      ),
    enabled: id !== "new",
    placeholderData: (previousData) => previousData,
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
      // setFormsCount((prev) =>
      //   next_state ? parseInt(prev) - 1 : parseInt(prev) + 1
      // );
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
      filters,
      setFilters,
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
    filters,
  ]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

const useForm = () => useContext(FormContext);
export { FormContext, useForm };
export default FormProvider;
