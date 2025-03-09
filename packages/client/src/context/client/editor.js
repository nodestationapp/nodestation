import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import api from "libs/api";

const EditorContext = createContext();

const EditorProvider = ({ children }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { "*": path } = useParams();
  const queryClient = useQueryClient();

  const [has_errors, setHasErrors] = useState(false);
  const [editor_modal, setEditorModal] = useState(false);

  const query = new URLSearchParams(search);
  const query_type = query.get("type");

  const current_entry = path?.split("/");
  const is_entry_id = current_entry?.[current_entry?.length - 1];

  const entry_id = !!is_entry_id?.split("_")?.[1] ? is_entry_id : null;

  const {
    isLoading: loading,
    data: editor,
    refetch: editorRefetch,
  } = useQuery({
    queryKey: ["editor"],
    queryFn: () => api.get("/editor"),
  });

  const { data: settings } = useQuery({
    queryKey: ["users_settings"],
    queryFn: () => api.get("/auth/settings"),
  });

  const createEntry = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await api.post("/editor", { ...values });

        navigate(`/editor/${data?.type}${data?.path || ""}/${data?.id}`);

        editorRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateEntry = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/editor/${entry_id}`, {
          ...values,
          options: { ...values?.options },
        });

        editorRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const orderHandler = async (items) => {
    let formatted_groups = items?.map((item, index) => ({
      id: item?.group?.id,
      order: index + 1,
    }));

    api.put("/editor/group/order", { groups: formatted_groups });

    const groups_temp = editor?.groups?.map((item) => ({
      ...item,
      order: formatted_groups?.find((element) => element?.id === item?.id)
        ?.order,
    }));

    queryClient.setQueryData(["editor"], (prev) => ({
      ...prev,
      groups: groups_temp,
    }));
  };

  const value = useMemo(() => {
    return {
      id: entry_id,
      editor,
      groups: [],
      current_entry,
      query_type,
      loading,
      createEntry,
      updateEntry,
      orderHandler,
      has_errors,
      setHasErrors,
      settings,
      editor_modal,
      setEditorModal,
    };
    // eslint-disable-next-line
  }, [
    editor,
    entry_id,
    query_type,
    current_entry,
    loading,
    has_errors,
    settings,
    editor_modal,
  ]);

  if (!!loading) return null;

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

const useEditor = () => useContext(EditorContext);
export { EditorContext, useEditor };
export default EditorProvider;
