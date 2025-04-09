import BaseLayout from "layouts/BaseLayout";
import SettingsForm from "components/SettingsForm";
import InputElementsEditor from "components/InputElementsEditor";

import { useTable } from "context/client/table";
import TableProvider from "context/client/table";
import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";

import { Photo } from "@mui/icons-material";

const MediaSettingsContent = () => {
  const { data } = useTable();

  useSetBreadcrumbs([
    {
      icon: Photo,
      label: "Media",
      href: "/media",
    },
    {
      label: "Settings",
    },
  ]);

  const table = data?.table;

  const formInitialValues = {
    name: "auth",
    fields: table?.fields || [],
  };

  const settings_data = [
    {
      label: "Fields",
      component: <InputElementsEditor data={formInitialValues} />,
    },
  ];

  const tabs = [
    {
      title: "Entries",
      href: "/media",
    },
  ];

  return (
    <BaseLayout
      title="Settings"
      subtitle="Manage your authentication settings"
      tabs={tabs}
    >
      {/* <Toolbar tabs={[]} action={action} /> */}
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

const MediaSettings = () => {
  return (
    <TableProvider id="nodestation_media">
      <MediaSettingsContent />
    </TableProvider>
  );
};

export default MediaSettings;
