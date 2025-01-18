import "./styles.scss";

import { useFormikContext } from "formik";
import { useCallback, useRef } from "react";
import { Editor, loader } from "@monaco-editor/react";

import theme from "./theme.json";

const CodeEditor = ({ language = "javascript" }) => {
  const ref = useRef();
  const { values, setFieldValue } = useFormikContext();

  loader.init().then((monaco) => {
    monaco.editor.defineTheme("myTheme", theme);
  });

  window.onresize = function () {
    ref.current?.layout();
  };

  const onChange = useCallback((value) => {
    setFieldValue("content", value);
    // eslint-disable-next-line
  }, []);

  function handleEditorDidMount(editor) {
    ref.current = editor;
  }

  return (
    <Editor
      ref={ref}
      height="100%"
      width="100%"
      defaultLanguage={language}
      value={values?.content}
      onChange={(e) => onChange(e)}
      onMount={handleEditorDidMount}
      theme="myTheme"
      options={{
        wordWrap: true,
        minimap: { enabled: false }, // Wyłączenie minimapy
      }}
    />
  );
};

export default CodeEditor;
