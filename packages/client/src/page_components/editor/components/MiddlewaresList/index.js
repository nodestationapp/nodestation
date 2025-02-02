import "./styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import TableStack from "components/TableStack";
import EditorContentLayout from "components/layouts/EditorContentLayout";
import ArchiveMiddlewareModal from "./components/ArchiveMiddlewareModal";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEditor } from "context/client/editor";
import IconButton from "components/IconButton";

const MiddlewaresList = () => {
  const navigate = useNavigate();
  const { editor } = useEditor();

  const middlewares = editor?.filter((item) => item?.type === "mid");

  const [archive_modal, setArchiveModal] = useState();

  // const table_data = {
  //   keys: [...fields],
  //   items: middlewares?.map((item) => ({
  //     onclick: () => navigate(`/editor/middlewares/${item?.id}`),
  //     actions: (
  //       <>
  //         <IconButton
  //           icon={<TrashIcon color="#FF3636" />}
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             setArchiveModal(item);
  //           }}
  //         />
  //       </>
  //     ),
  //     data: [
  //       {
  //         key: "name",
  //         value: item?.name,
  //       },
  //     ],
  //   })),
  // };

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
      <EditorContentLayout
        with_padding
        action={
          <Button href="/editor/new?type=mid" icon={<PlusIcon />}>
            Add middleware
          </Button>
        }
      >
        <TableStack
          fullWidth
          data={middlewares}
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
