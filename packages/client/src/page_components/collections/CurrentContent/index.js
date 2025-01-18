import { useState } from "react";

import Table from "components/Table";
import IdViewer from "components/IdViewer";
import IconButton from "components/IconButton";
import NoItemsFound from "components/List/components/NoItemsFound";
import ArchiveCollectionModal from "../components/ArchiveCollectionModal";
import CollectionContentEditor from "./components/CollectionContentEditor";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import fieldsParser from "libs/helpers/fieldsParser";
import { useCollection } from "context/client/collection";

import { CircleStackIcon, TrashIcon } from "@heroicons/react/24/outline";

const FormContentWrapper = () => {
  const { data } = useCollection();

  const [content_editor, setContentEditor] = useState(null);

  const entries = [];
  const collection = data?.collection;

  const fields = collection?.fields?.map((item) => ({
    key: item?.type,
    value: item?.name,
    type: item?.type,
    slug: item?.slug,
  }));

  const table_data = {
    keys: [...fields],
    items: entries?.map((item) => ({
      onclick: () => setContentEditor(item),
      data: fields?.map((element, index) => {
        return {
          key: fields?.[index]?.type,
          type: element?.type,
          value: item?.[element?.slug],
        };
      }),
    })),
  };

  const formatted_forms =
    entries?.length > 0
      ? [
          {
            items: [
              ...entries?.map((item) => ({
                ...item,
                parsed_fields: fieldsParser(data?.form?.fields, item?.data),
              })),
            ],
          },
        ]
      : [];

  return (
    <>
      {formatted_forms?.length === 0 ? (
        <NoItemsFound />
      ) : (
        <Table data={table_data} />
      )}
      {!!content_editor && (
        <CollectionContentEditor
          data={content_editor}
          onClose={() => setContentEditor(null)}
        />
      )}
    </>
  );
};

const FormContent = () => {
  const { data, id, loading } = useCollection();
  const [archive_modal, setArchiveModal] = useState(false);

  const collection = data?.collection;

  const breadcrumps = [
    {
      icon: <CircleStackIcon />,
      label: "Tables",
    },
    {
      label: collection?.name,
    },
  ];

  const submenu_data = [
    {
      label: "Entries",
      href: `/collections/${id}`,
    },
    {
      label: "Settings",
      href: `/collections/${id}/settings`,
    },
  ];

  return (
    <>
      <DashboardContentLayout
        loading={loading}
        breadcrumps={breadcrumps}
        submenu={!!collection?.id ? submenu_data : []}
        action={
          <>
            {!!collection?.id && (
              <>
                <IdViewer id={collection?.id} />
                <IconButton
                  onClick={() => setArchiveModal(collection)}
                  icon={<TrashIcon color="#FF3636" />}
                />
              </>
            )}
          </>
        }
      >
        <FormContentWrapper />
      </DashboardContentLayout>
      {!!archive_modal && (
        <ArchiveCollectionModal
          data={archive_modal}
          onClose={() => setArchiveModal(false)}
        />
      )}
    </>
  );
};

export default FormContent;
