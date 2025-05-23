import Stack from "@mui/material/Stack";

import Id from "./components/Id/index.js";
import Date from "./components/Date/index.js";
import Text from "./components/Text/index.js";
import Select from "./components/Select/index.js";
import Boolean from "./components/Boolean/index.js";
import Json from "./components/Json/index.js";

const extra_input_render = (type, locked) => {
  console.log(type);
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
    case "json":
      return <Json locked={locked} />;
    default:
      return (
        <>
          {/* <FormikSwitch label="Required" name="required" disabled={locked} /> */}
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
