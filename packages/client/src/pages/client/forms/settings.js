import FormSettingsContent from "page_components/forms/Settings";

import FormProvider from "context/client/form";
import TableProvider from "context/client/table";
import EmailsProvider from "context/client/emails";

const FormSettings = () => (
  <FormProvider>
    <EmailsProvider>
      <TableProvider>
        <FormSettingsContent />
      </TableProvider>
    </EmailsProvider>
  </FormProvider>
);

export default FormSettings;
