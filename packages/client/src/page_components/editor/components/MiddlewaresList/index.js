import "./styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import TableStack from "components/TableStack";
import IconButton from "components/IconButton";
import EditorContentLayout from "components/layouts/EditorContentLayout";
import ArchiveMiddlewareModal from "./components/ArchiveMiddlewareModal";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEditor } from "context/client/editor";

const MiddlewaresList = () => {
  const navigate = useNavigate();
  const { editor } = useEditor();

  const middlewares = editor?.filter((item) => item?.type === "mid");

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
        hideHeader
        data={middlewares}
        toolbar={{
          menu: [{ label: "Middlewares", variant: "label" }],
          hideColumnOrder: true,
        }}
        columns={columns}
        disabledSelect={true}
        rowClick={({ row }) =>
          navigate(`/editor/middlewares${row?.slug}/${row?.id}`)
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
        <ArchiveMiddlewareModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
    </>
  );
};

export default MiddlewaresList;
