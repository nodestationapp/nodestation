import FormSettingsContent from "page_components/forms/Settings";

import FormProvider from "context/client/form";
import EmailsProvider from "context/client/emails";

const FormSettings = () => (
  <FormProvider>
    <EmailsProvider>
      <FormSettingsContent />
    </EmailsProvider>
  </FormProvider>
);

export default FormSettings;
