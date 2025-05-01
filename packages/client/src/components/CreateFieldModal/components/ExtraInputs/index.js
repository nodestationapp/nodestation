import { Stack } from "@mui/material";

import Id from "./components/Id";
import Date from "./components/Date";
import Text from "./components/Text";
import Select from "./components/Select";
import Boolean from "./components/Boolean";
import FormikSwitch from "components/formik/FormikSwitch";

const extra_input_render = (type, locked) => {
  switch (type) {
    case "id":
      return <Id locked={locked} />;
    case "boolean":
      return <Boolean />;
    case "select":
      return <Select locked={locked} />;
    case "text":
      return <Text locked={locked} />;
    case "date":
      return <Date locked={locked} />;
    default:
      return (
        <>
          <FormikSwitch label="Required" name="required" disabled={locked} />
        </>
      );
  }
};

const ExtraInputs = ({ locked, type }) => {
  if (!!!type) return null;

  return (
    <Stack direction="column" gap={2}>
      {extra_input_render(type, locked)}
    </Stack>
  );
};

export default ExtraInputs;
