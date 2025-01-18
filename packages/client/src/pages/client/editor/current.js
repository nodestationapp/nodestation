import EditorProvider from "context/client/editor";
import EditorCurrentContent from "page_components/editor/CurrentContent";

const Endpoints = () => (
  <EditorProvider>
    <EditorCurrentContent />
  </EditorProvider>
);

export default Endpoints;
