import EditorProvider from "context/client/editor";
import EndpointsList from "page_components/editor/components/EndpointsList";

const Endpoints = () => (
  <EditorProvider>
    <EndpointsList />
  </EditorProvider>
);

export default Endpoints;
