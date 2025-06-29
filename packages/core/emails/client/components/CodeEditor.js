import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { basicLight, basicDark } from "@uiw/codemirror-theme-basic";

import { useColorScheme } from "@mui/material/styles";

const CodeEditor = ({ value, onChange }) => {
  const { mode, systemMode, setMode } = useColorScheme();
  const currentMode = systemMode || mode;

  return (
    <CodeMirror
      value={value}
      minHeight="250px"
      style={{ flex: 1 }}
      extensions={[html(), EditorView.lineWrapping]}
      theme={currentMode === "dark" ? basicDark : basicLight}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
