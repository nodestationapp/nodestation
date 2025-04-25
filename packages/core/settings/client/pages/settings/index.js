import { SettingsRounded } from "@mui/icons-material";
import Form from "../../components/Form.js";
import PhotoInput from "../../components/PhotoInput.js";

import useSetBreadcrumbs from "@nstation/utils/ui/hooks/useSetBreadcrumbs.js";

const SettingsGeneral = () => {
  useSetBreadcrumbs([
    {
      icon: SettingsRounded,
      label: "Settings",
    },
  ]);

  return (
    <>
      <PhotoInput />
      <Form />
    </>
  );
};

export default SettingsGeneral;
