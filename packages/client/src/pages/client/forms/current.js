import { useParams } from "react-router-dom";

import FormContent from "page_components/forms/CurrentContent";
import TableProvider from "context/client/table";

const Form = () => {
  const { id } = useParams();

  return (
    <TableProvider id={id}>
      <FormContent />
    </TableProvider>
  );
};

export default Form;
