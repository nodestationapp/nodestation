import { useState } from "react";
import { useParams } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import { SettingsForm } from "@nstation/design-system";
import { BaseLayout } from "@nstation/design-system/Layouts";

import DeleteTableModal from "../components/DeleteTableModal/index.js";
import InputElementsEditor from "../components/InputElementsEditor/index.js";

import TableProvider, { useTable } from "../contexts/table.js";

import DeleteIcon from "@mui/icons-material/Delete";

const TableSettingsContent = () => {
  const { data, updateTable } = useTable();
  const [deleteTableModal, setDeleteTableModal] = useState(false);

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

  const actions = () => (
    <IconButton onClick={() => setDeleteTableModal(table)} size="micro">
      <DeleteIcon sx={{ color: "error.light" }} />
    </IconButton>
  );

  return (
    <BaseLayout
      tabs={tabs}
      title="Schema"
      action={actions}
      subtitle="Manage your table schema"
      backButtonLink={`/tables/${table?.id}`}
    >
      <SettingsForm data={settings_data} />
      <DeleteTableModal
        open={deleteTableModal}
        onClose={() => setDeleteTableModal(false)}
      />
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
