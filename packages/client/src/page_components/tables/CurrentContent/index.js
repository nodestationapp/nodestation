import { useState } from "react";

import TableStack from "components/TableStack";
import TableContentEditor from "./components/TableContentEditor";
import ArchiveTableEntryModal from "../components/ArchiveTableEntryModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useTable } from "context/client/table";

import { CircleStackIcon, TrashIcon } from "@heroicons/react/24/outline";
import PreviewModal from "page_components/forms/CurrentContent/components/PreviewModal";

const FormContent = () => {
  const { data, id, loading, type, saveTableTransaction } = useTable();

  const [content_editor, setContentEditor] = useState(null);
  const [archive_entry_modal, setArchiveEntryModal] = useState(false);
  const [preview_modal, setPreviewModal] = useState(false);

  const table = data?.table;
  const entries = data?.entries || [];

  const breadcrumps = [
    {
      icon: <CircleStackIcon />,
      label: "Tables",
    },
    {
      label: table?.name,
    },
  ];

  const columns =
    data?.columns?.map((item) => ({
      key: item?.type,
      value: item?.name,
      type: item?.type,
      slug: item?.slug,
    })) || [];

  let formatted_fields = columns?.filter((item) => item?.slug !== "id");

  const new_entry_schema = formatted_fields?.reduce((obj, item) => {
    obj[item.slug] = null;
    return obj;
  }, {});

  const toolbar = {
    menu: [
      {
        label: "Entries",
        href: `/tables/${id}`,
      },
    ],
    selectAction: [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: () => setArchiveEntryModal(true),
      },
    ],
    settingsButtonHandler: `/tables/${id}/settings`,
    newButtonHandler: () => setContentEditor(new_entry_schema),
  };

  return (
    <>
      <DashboardContentLayout breadcrumps={breadcrumps}>
        <TableStack
          tableId={id}
          data={entries}
          preferences={data?.preferences}
          toolbar={toolbar}
          loading={loading}
          columns={columns}
          filtering={true}
          tableSchema={table?.fields}
          saveTransaction={saveTableTransaction}
          rowClick={(row) =>
            type === "forms" ? setPreviewModal(row) : setContentEditor(row)
          }
        />
        {!!content_editor && (
          <TableContentEditor
            data={content_editor?.row || content_editor}
            onClose={() => setContentEditor(null)}
          />
        )}
      </DashboardContentLayout>
      {!!archive_entry_modal && (
        <ArchiveTableEntryModal
          data={archive_entry_modal}
          onClose={() => setArchiveEntryModal(false)}
        />
      )}
      {!!preview_modal && (
        <PreviewModal
          data={preview_modal}
          fields={data?.columns}
          // readHandler={readHandler}
          onClose={() => setPreviewModal(false)}
        />
      )}
    </>
  );
};

export default FormContent;
