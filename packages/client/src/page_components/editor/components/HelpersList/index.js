import "./styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import ArchiveHelperModal from "./components/ArchiveHelperModal";
import EditorContentLayout from "components/layouts/EditorContentLayout";

import { useEditor } from "context/client/editor";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import TableStack from "components/TableStack";
import IconButton from "components/IconButton";

const HelpersList = () => {
  const navigate = useNavigate();
  const { editor } = useEditor();

  const helpers = editor?.filter((item) => item?.type === "fn");

  const [archive_modal, setArchiveModal] = useState();

  const columns = [
    {
      key: "name",
      value: "Name",
      slug: "name",
      type: "name",
    },
  ];

  return (
    <>
      <TableStack
        fullWidth
        data={helpers}
        hideHeader
        toolbar={{
          menu: [{ label: "Helpers", variant: "label" }],
          hideColumnOrder: true,
        }}
        columns={columns}
        disabledSelect={true}
        rowClick={({ row }) =>
          navigate(`/editor/helpers${row?.slug}/${row?.id}`)
        }
        rowAction={({ row }) => (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setArchiveModal(row);
            }}
            icon={<TrashIcon color="#FF3636" />}
          />
        )}
      />
      {!!archive_modal && (
        <ArchiveHelperModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
    </>
  );
};

export default HelpersList;
