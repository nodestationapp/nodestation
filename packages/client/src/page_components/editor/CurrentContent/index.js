import "./styles.scss";

import CronsList from "../components/CronsList";
import HelpersList from "../components/HelpersList";
import EndpointsList from "../components/EndpointsList";
import MiddlewaresList from "../components/MiddlewaresList";

import { useEditor } from "context/client/editor";
import ContentEditorModal from "../components/ContentEditorModal";

const EditorContent = () => {
  const { id, query_type, current_entry, editor_modal, setEditorModal } =
    useEditor();

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

  return (
    <>
      {editor_render(id?.split("_")?.[0])}
      {!!editor_modal && (
        <ContentEditorModal
          data={editor_modal}
          onClose={() => setEditorModal(false)}
        />
      )}
    </>
  );
};

export default EditorContent;
