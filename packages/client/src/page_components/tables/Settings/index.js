import { useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "components/Button";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
import ArchiveTableModal from "./components/ArchiveTableModal";
import TableSettingsEditor from "components/TableSettingsEditor";

import { useTable } from "context/client/table";
import { TrashIcon, CircleStackIcon } from "@heroicons/react/24/outline";

const TableSettingsContent = () => {
  const { pathname } = useLocation();
  const { data } = useTable();

  const [archive_modal, setArchiveModal] = useState(false);

  const table = data?.table;
  const mainTablePath = pathname.split("/").slice(0, 3).join("/");

  const toolbar = ({ dirty, isSubmitting, submitForm }) => ({
    menu: [
      {
        label: "Entries",
        href: mainTablePath,
      },
    ],
    action: [
      <IconButton
        size="small"
        onClick={() => setArchiveModal(table)}
        icon={<TrashIcon color="#FF3636" />}
      />,
      <Button disabled={!!!dirty} loading={!!isSubmitting} onClick={submitForm}>
        Save <KeyViewer data={["⌘", "S"]} />
      </Button>,
    ],
  });

  const breadcrumps = [
    {
      icon: <CircleStackIcon />,
      label: "Tables",
    },
    {
      label: table?.name,
      href: mainTablePath,
    },
    {
      label: "Settings",
    },
  ];

  const settings_data = [
    {
      label: "Name",
      items: [
        {
          name: "name",
          disabled: true,
          placeholder: "Table name",
        },
      ],
    },
    {
      label: "Display name",
      items: [
        {
          type: "select",
          name: "display_name",
          placeholder: "Table name",
          options: table?.fields?.map((item) => ({
            label: item?.name,
            value: item?.slug,
          })),
        },
      ],
    },
    {
      label: "Fields",
      items: [
        {
          name: "fields",
          type: "input_editor",
        },
      ],
    },
  ];

  const formInitialValues = {
    name: table?.name,
    fields: table?.fields || [],
    display_name: table?.display_name || null,
  };

  return (
    <>
      <TableSettingsEditor
        settings={settings_data}
        breadcrumps={breadcrumps}
        toolbar={toolbar}
        form={formInitialValues}
      />
      {!!archive_modal && (
        <ArchiveTableModal
          data={archive_modal}
          onClose={() => setArchiveModal(false)}
        />
      )}
    </>
  );
};

export default TableSettingsContent;
