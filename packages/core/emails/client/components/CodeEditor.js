import { html } from "@codemirror/lang-html";
import CodeMirror from "@uiw/react-codemirror";
import { basicLight, basicDark } from "@uiw/codemirror-theme-basic";

import { useColorScheme } from "@mui/material/styles";

const CodeEditor = ({ value, onChange }) => {
  const { mode, systemMode, setMode } = useColorScheme();
  const currentMode = systemMode || mode;

  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[html()]}
      theme={currentMode === "dark" ? basicDark : basicLight}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
