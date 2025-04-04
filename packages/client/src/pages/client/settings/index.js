import { SettingsRounded } from "@mui/icons-material";
import Form from "page_components/settings/GeneralContent/Form";
import PhotoInput from "page_components/settings/GeneralContent/PhotoInput";

import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";

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
