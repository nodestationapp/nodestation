import { useParams } from "react-router-dom";
import FormSettingsContent from "page_components/forms/Settings";

import TableProvider from "context/client/table";
import EmailsProvider from "context/client/emails";

const FormSettings = () => {
  const { id } = useParams();

  return (
    <EmailsProvider>
      <TableProvider id={id}>
        <FormSettingsContent />
      </TableProvider>
    </EmailsProvider>
  );
};

export default FormSettings;
