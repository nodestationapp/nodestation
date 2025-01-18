import "./styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "components/Table";
import Button from "components/Button";
import IconButton from "components/IconButton";
import ArchiveHelperModal from "./components/ArchiveHelperModal";
import EditorContentLayout from "components/layouts/EditorContentLayout";

import { useEditor } from "context/client/editor";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const HelpersList = () => {
  const navigate = useNavigate();
  const { editor } = useEditor();

  const helpers = editor?.filter((item) => item?.type === "fn");

  const [archive_modal, setArchiveModal] = useState();

  const fields = [
    {
      key: "name",
      value: "Name",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: helpers?.map((item) => ({
      onclick: () => navigate(`/editor/helpers/${item?.id}`),
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
          <Button href="/editor/new?type=fn" icon={<PlusIcon />}>
            Add helper
          </Button>
        }
      >
        <Table data={table_data} />
      </EditorContentLayout>
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
