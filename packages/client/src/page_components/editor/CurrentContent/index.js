import "./styles.scss";

import CronsList from "../components/CronsList";
import HelpersList from "../components/HelpersList";
import ContentEditor from "./components/ContentEditor";
import EndpointsList from "../components/EndpointsList";
import MiddlewaresList from "../components/MiddlewaresList";
import ContentPackageManager from "./components/ContentPackageManager";

import { useEditor } from "context/client/editor";

const EditorContent = () => {
  const {
    id,
    query_type,
    editor_entry,
    current_entry,
    createEntry,
    updateEntry,
    editor_entry_loading,
  } = useEditor();

  const editor_render = (type) => {
    let formatted_type = type;

    if (current_entry?.[current_entry?.length - 1] === "history") {
      formatted_type = "history";
    } else {
      if (!!!type) {
        if (!!query_type) {
          formatted_type = query_type;
        } else {
          formatted_type = current_entry?.[0];
        }
      }
    }

    switch (formatted_type) {
      case "ep":
      case "fn":
      case "cron":
      case "mid":
        return (
          <ContentEditor
            entry_id={current_entry}
            data={editor_entry}
            onSubmit={onSubmit}
            type={formatted_type}
            loading={editor_entry_loading}
          />
        );
      case "package-manager":
        return <ContentPackageManager />;
      case "endpoints":
        return <EndpointsList />;
      case "crons":
        return <CronsList />;
      case "helpers":
        return <HelpersList />;
      case "middlewares":
        return <MiddlewaresList />;
      default:
        return null;
    }
  };

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      if (id) {
        await updateEntry(values);
      } else {
        await createEntry(values);
      }

      resetForm({ values });
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return editor_render(id?.split("_")?.[0]);
};

export default EditorContent;
