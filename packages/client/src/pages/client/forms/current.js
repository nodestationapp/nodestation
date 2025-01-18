import FormContent from "page_components/forms/CurrentContent";
import FormProvider from "context/client/form";

const Form = ({ archived }) => (
  <FormProvider archived={archived}>
    <FormContent />
  </FormProvider>
);

export default Form;
