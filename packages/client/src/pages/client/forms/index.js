import FormsContent from "page_components/forms/Content";
import FormsProvider from "context/client/forms";

const Forms = () => (
  <FormsProvider>
    <FormsContent />
  </FormsProvider>
);

export default Forms;
