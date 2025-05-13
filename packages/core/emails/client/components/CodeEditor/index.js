import "./styles.scss";

import { useCallback, useRef } from "react";
import { Editor, loader } from "@monaco-editor/react";

import theme from "./theme.json";

const CodeEditor = ({ language = "html", value, onChange }) => {
  const ref = useRef();

  loader.init().then((monaco) => {
    monaco.editor.defineTheme("myTheme", theme);
  });

  window.onresize = function () {
    ref.current?.layout();
  };

  const changeHandler = useCallback((value) => {
    onChange(value);
    // eslint-disable-next-line
  }, []);

  function handleEditorDidMount(editor) {
    ref.current = editor;
  }

  return (
    <Editor
      ref={ref}
      height="500px"
      width="100%"
      loading={null}
      defaultLanguage={language}
      value={value}
      onChange={(e) => changeHandler(e)}
      onMount={handleEditorDidMount}
      theme="myTheme"
      options={{
        wordWrap: true,
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
};

export default CodeEditor;
