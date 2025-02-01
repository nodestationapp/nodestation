import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";
import { useApp } from "context/app";

const FormContext = createContext();

const FormProvider = ({ archived, children }) => {
  const { id } = useParams();
  const { setFormsCount } = useApp();
  const queryClient = useQueryClient();

  const [checked, setChecked] = useState([]);

  const {
    data,
    isLoading: loading,
    refetch: refetchForms,
  } = useQuery({
    queryKey: ["forms", id, archived],
    queryFn: () =>
      api.get(`/forms/${id}?archived=${archived === true ? 1 : 0}`),
    enabled: id !== "new",
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

  const updateIncomeForm = (id, values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/forms/entry/${id}`, { ...values });

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
    };
    // eslint-disable-next-line
  }, [data, id, loading, archived, emails, checked]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

const useForm = () => useContext(FormContext);
export { FormContext, useForm };
export default FormProvider;
