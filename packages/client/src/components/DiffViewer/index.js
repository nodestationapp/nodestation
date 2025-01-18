import "./styles.scss";

import moment from "moment";

import Tooltip from "components/Tooltip";
import IconButton from "components/IconButton";

import {
  ViewColumnsIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

import { useEditor } from "context/client/editor";
import { DiffEditor, loader } from "@monaco-editor/react";

import theme from "../CodeEditor/theme.json";

const mainClass = "diff-viewer";

const DiffViewer = ({ mode, previous, current, height }) => {
  const {
    editor_history,
    editor_history_entry,
    history_viewer_mode,
    setHistoryViewerMode,
  } = useEditor();

  loader.init().then((monaco, editor) => {
    monaco.editor.defineTheme("myTheme", theme);
  });

  const onModeChange = () => {
    const next_mode = history_viewer_mode === "split" ? "unified" : "split";

    setHistoryViewerMode(next_mode);
    localStorage.setItem("history_viewer_mode", next_mode);
  };

  const is_split = !!previous && mode === "split";

  const version =
    editor_history?.length -
    editor_history?.findIndex(
      (item) => item?.id === editor_history_entry?.[1]?.id
    );

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__header`}>
        <div className={`${mainClass}__header__text`}>
          <span>{`Version ${version}`}</span>
          <small>
            {moment(editor_history_entry?.[1]?.created_at).format("lll")}
          </small>
        </div>
        <div className={`${mainClass}__header__aside`}>
          <IconButton
            onClick={onModeChange}
            icon={
              <Tooltip
                text={history_viewer_mode === "split" ? "Unified" : "Split"}
              >
                {history_viewer_mode === "split" ? (
                  <ArrowsPointingOutIcon />
                ) : (
                  <ViewColumnsIcon />
                )}
              </Tooltip>
            }
          />
        </div>
      </div>
      <DiffEditor
        height={height === "auto" ? null : "calc(100vh - 200px)"}
        width="100%"
        language="javascript"
        original={previous}
        modified={current}
        theme="myTheme"
        options={{
          wordWrap: true,
          minimap: { enabled: false },
          readOnly: true,
          renderSideBySide: is_split,
        }}
      />
    </div>
  );
};

export default DiffViewer;
