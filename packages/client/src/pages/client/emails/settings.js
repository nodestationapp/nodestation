import EmailsProvider from "context/client/emails";
import EmailsContentSettings from "page_components/emails/Settings";

const Email = () => (
  <EmailsProvider>
    <EmailsContentSettings />
  </EmailsProvider>
);

export default Email;
