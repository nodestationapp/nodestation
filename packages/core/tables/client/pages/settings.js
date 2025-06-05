import { useState } from "react";
import { useParams } from "react-router-dom";

import { MenuItem, Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { SettingsForm } from "@nstation/design-system";
import { BaseLayout } from "@nstation/design-system/Layouts";

import DeleteTableModal from "../components/DeleteTableModal/index.js";
import InputElementsEditor from "../components/InputElementsEditor/index.js";

import TableProvider, { useTable } from "../contexts/table.js";

import DeleteIcon from "@mui/icons-material/Delete";

const TableSettingsContent = () => {
  const { data, updateTable, loading } = useTable();
  const [deleteTableModal, setDeleteTableModal] = useState(false);

  const table = data?.table;

  const formInitialValues = {
    name: table?.name,
    tableName: table?.tableName,
    displayName: table?.displayName,
    fields: table?.fields || [],
  };

  const updateDisplayName = (value) => {
    let temp = formInitialValues;
    temp.displayName = value;
    updateTable(temp);
  };

  const display_name_options = data?.table?.fields?.filter(
    (item) =>
      item?.type === "id" || item?.type === "text" || item?.type === "numeric"
  );

  const settings_data = [
    {
      label: "Display field",
      component: !loading ? (
        <Select
          fullWidth
          size="medium"
          name="displayName"
          disabled={process.env.NODE_ENV !== "development"}
          defaultValue={table?.displayName}
          onChange={(e) => updateDisplayName(e.target.value)}
        >
          {display_name_options?.map((item) => (
            <MenuItem value={item?.slug}>{item?.name}</MenuItem>
          ))}
        </Select>
      ) : null,
    },
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
      action={process.env.NODE_ENV === "development" ? actions : null}
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
