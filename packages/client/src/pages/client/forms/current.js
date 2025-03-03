import TableProvider from "context/client/table";
import FormContent from "page_components/forms/CurrentContent";

const Form = () => {
  return (
    <TableProvider>
      <FormContent />
    </TableProvider>
  );
};

export default Form;
