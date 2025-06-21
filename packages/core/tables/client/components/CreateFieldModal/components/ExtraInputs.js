import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { clientfieldTypes } from "@nstation/field-types";

const ExtraInputs = ({ locked, type }) => {
  if (!!!type) return null;

  const selected_type = clientfieldTypes()?.find((item) => item?.key === type);

  return (
    <Stack direction="column" gap={2}>
      <Divider />
      {selected_type?.extraFields && selected_type?.extraFields({ locked })}
    </Stack>
  );
};

export default ExtraInputs;
