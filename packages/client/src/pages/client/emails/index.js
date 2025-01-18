import EmailsProvider from "context/client/emails";
import EmailsContent from "page_components/emails/Content";

const Emails = () => (
  <EmailsProvider>
    <EmailsContent />
  </EmailsProvider>
);

export default Emails;
