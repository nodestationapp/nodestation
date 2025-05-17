import { useParams } from "react-router-dom";

import { SettingsForm } from "@nstation/design-system";
import { BaseLayout } from "@nstation/design-system/Layouts";

import InputElementsEditor from "../components/InputElementsEditor/index.js";

import TableProvider, { useTable } from "../contexts/table.js";

const TableSettingsContent = () => {
  const { data, updateTable } = useTable();

  const table = data?.table;

  const formInitialValues = {
    name: table?.name,
    tableName: table?.tableName,
    fields: table?.fields || [],
  };

  const settings_data = [
    {
      label: "Fields",
      component: (
        <InputElementsEditor data={formInitialValues} onSubmit={updateTable} />
      ),
    },
  ];

  const tabs = [
    {
      title: "Schema",
      href: `/tables/${table?.id}/settings`,
    },
  ];

  return (
    <BaseLayout
      tabs={tabs}
      title="Schema"
      subtitle="Manage your table schema"
      backButtonLink={`/tables/${table?.id}`}
    >
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

const TableSettings = () => {
  const { id } = useParams();

  return (
    <TableProvider id={id}>
      <TableSettingsContent />
    </TableProvider>
  );
};

export default TableSettings;
