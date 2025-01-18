import "./styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "components/Table";
import Button from "components/Button";
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

  const fields = [
    {
      key: "name",
      value: "Name",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: middlewares?.map((item) => ({
      onclick: () => navigate(`/editor/middlewares/${item?.id}`),
      actions: (
        <>
          <IconButton
            icon={<TrashIcon color="#FF3636" />}
            onClick={(e) => {
              e.stopPropagation();
              setArchiveModal(item);
            }}
          />
        </>
      ),
      data: [
        {
          key: "name",
          value: item?.name,
        },
      ],
    })),
  };

  return (
    <>
      <EditorContentLayout
        with_padding
        action={
          <Button href="/editor/new?type=mid" icon={<PlusIcon />}>
            Add middleware
          </Button>
        }
      >
        <Table data={table_data} />
      </EditorContentLayout>
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
