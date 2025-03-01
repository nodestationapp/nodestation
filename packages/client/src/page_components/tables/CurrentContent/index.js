import { useState } from "react";

import TableStack from "components/TableStack";
import TableContentEditor from "./components/TableContentEditor";
import ArchiveTableEntryModal from "../components/ArchiveTableEntryModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";
import PreviewModal from "page_components/forms/CurrentContent/components/PreviewModal";

import { useTable } from "context/client/table";

import {
  CircleStackIcon,
  UsersIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import tableToolbarRender from "libs/helpers/tableToolbarRender";

const breadcrumpsRender = (type, tableName) => {
  switch (type) {
    case "auth":
      return [
        {
          icon: <UsersIcon />,
          label: "Authentication",
        },
      ];
    case "forms":
      return [
        {
          icon: <PaperAirplaneIcon />,
          label: "Forms",
          href: "/forms",
        },
        {
          label: tableName,
        },
      ];
    default:
      return [
        {
          icon: <CircleStackIcon />,
          label: "Tables",
        },
        {
          label: tableName,
        },
      ];
  }
};

const TableContent = () => {
  const { data, id, loading, type, saveTableTransaction } = useTable();

  const [content_editor, setContentEditor] = useState(null);
  const [archive_entry_modal, setArchiveEntryModal] = useState(false);
  const [preview_modal, setPreviewModal] = useState(false);

  const table = data?.table;
  const entries = data?.entries || [];

  const columns =
    data?.columns?.map((item) => ({
      key: item?.type,
      value: item?.name,
      type: item?.type,
      slug: item?.slug,
    })) || [];

  let formatted_fields = columns?.filter((item) => item?.slug !== "id");

  const toolbar = tableToolbarRender(
    id,
    type,
    formatted_fields,
    setContentEditor,
    setArchiveEntryModal
  );
  const breadcrumps = breadcrumpsRender(type, table?.name);
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

export default TableContent;
