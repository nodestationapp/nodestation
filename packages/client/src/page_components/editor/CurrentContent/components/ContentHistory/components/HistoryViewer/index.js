import "./styles.scss";

import DiffViewer from "components/DiffViewer";

import { useEditor } from "context/client/editor";

const mainClass = "history-viewer";

const HistoryViewer = () => {
  const { editor_history_entry, history_viewer_mode } = useEditor();

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        <DiffViewer
          mode={history_viewer_mode}
          previous={editor_history_entry?.[0]?.content}
          current={editor_history_entry?.[1]?.content}
        />
      </div>
    </div>
  );
};

export default HistoryViewer;
