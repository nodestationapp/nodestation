import { useState } from "react";

import IconButton from "components/IconButton";
import TableStack from "components/TableStack";
import PreviewModal from "./components/PreviewModal";
import RequestsModal from "components/RequestsModal";
import IconButtonMenu from "components/IconButtonMenu";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import DeleteIncomeFormModal from "page_components/forms/components/DeleteIncomeFormModal";

import { useForm } from "context/client/form";
import { useTableWrapper } from "context/client/table-wrapper";

import getHost from "libs/helpers/getHost";

import {
  TrashIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
  EnvelopeOpenIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";

const FormContentWrapper = () => {
  const { data, loading, readHandler, archived } = useForm();

  const [preview_modal, setPreviewModal] = useState(false);

  const form = data?.form;
  const incoming = data?.incoming;

  let fields =
    data?.form?.fields?.map((item) => ({
      key: item?.type,
      value: item?.name,
      type: item?.type,
      slug: item?.slug,
    })) || [];

  fields = [
    ...fields,
    {
      key: "date",
      value: "Created at",
      type: "date",
      slug: "created_at",
    },
  ];

  const columns =
    fields?.map((item) => ({
      key: item?.type,
      value: item?.value,
      type: item?.type,
      slug: item?.slug,
    })) || [];

  const meta = incoming?.map((item) => ({
    id: item?.id,
    disabled: item?.is_read,
    created_at: item?.created_at,
  }));

  const table_menu = [
    {
      label: "Incoming",
      href: `/forms/${form?.id}`,
    },
    {
      label: "Archived",
      href: `/forms/${form?.id}/archived`,
    },
  ];

  return (
    <>
      <TableStack
        key={archived}
        meta={meta}
        columns={columns}
        loading={loading}
        menu={table_menu}
        rowClick={(row) => setPreviewModal(row)}
        data={incoming?.map((item) => ({
          id: item?.id,
          archived: item?.archived,
          is_read: item?.is_read,
          ...item?.data,
        }))}
      />
      {!!preview_modal && (
        <PreviewModal
          // name={preview_modal?.name}
          data={preview_modal}
          fields={form?.fields}
          readHandler={readHandler}
          onClose={() => setPreviewModal(false)}
        />
      )}
    </>
  );
};

const checkIsReadValue = (rows) => {
  let currentIsRead = null;
  const firstValue = rows[0]?.original?.is_read;
  const allSame = rows?.every((item) => item.original?.is_read === firstValue);

  if (!!allSame) {
    currentIsRead = !!firstValue;
  }

  return currentIsRead;
};

const FormContent = () => {
  const { table, selectedRows } = useTableWrapper();
  const { data, id, loading, archived, updateIncomeForm } = useForm();

  const [archive_modal, setArchiveModal] = useState(false);
  const [request_modal, setRequestModal] = useState(false);

  const form = data?.form;

  const isReadSelected = checkIsReadValue(selectedRows || []);

  const breadcrumps = [
    {
      icon: <PaperAirplaneIcon />,
      label: "Forms",
      href: "/forms",
    },
    {
      label: !!loading ? null : form?.name || "Create form",
      href: !!archived ? `/forms/${id}` : null,
    },
    ...(!!archived
      ? [
          {
            label: "Archived",
          },
        ]
      : []),
  ];

  const host = getHost();

  const requests_modal_data = [
    {
      label: "Create form entry",
      url: `${host}/api/system/forms/${form?.id}`,
      body: form?.fields,
    },
  ];

  const asideMenu = [
    {
      type: "select",
      icon: <TrashIcon />,
      label: "Delete",
      onClick: () => setArchiveModal(form),
    },
  ];

  const toolbar = {
    menu: [
      {
        label: "Incoming",
        href: `/forms/${id}`,
      },
      {
        label: "Archived",
        href: `/forms/${id}/archived`,
      },
    ],
    action: [
      <IconButton
        size="small"
        icon={<Cog6ToothIcon />}
        href={`/forms/${id}/settings`}
      />,
      <IconButtonMenu icon={<EllipsisHorizontalIcon />} data={asideMenu} />,
    ],
    selectAction: [
      {
        icon: !!isReadSelected ? (
          <EnvelopeIcon color="#F0F1F3" />
        ) : isReadSelected === null ? null : (
          <EnvelopeOpenIcon color="#F0F1F3" />
        ),
        // icon: !!is_read ? (
        //   <EnvelopeIcon color="#F0F1F3" />
        // ) : (
        //   <EnvelopeOpenIcon color="#F0F1F3" />
        // ),
        onClick: (row) => onReadHandler(row),
      },
      {
        icon: !!archived ? (
          <ArchiveBoxIcon color="#F0F1F3" />
        ) : (
          <ArchiveBoxArrowDownIcon color="#F0F1F3" />
        ),
        onClick: (row) => onArchiveHandler(row),
      },
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: (row) => setArchiveModal(row),
      },
    ],
  };

  const onArchiveHandler = async (rows) => {
    try {
      let nextArchived;
      const firstValue = rows[0].original?.archived;
      const allSame = rows.every(
        (item) => item.original?.archived === firstValue
      );

      if (!!allSame) {
        nextArchived = !!!firstValue;
      }

      for await (const row of rows) {
        updateIncomeForm(row?.original?.id, {
          archived: nextArchived,
        });
      }

      table.setRowSelection({});
    } catch (err) {
      console.error(err);
    }
  };

  const onReadHandler = async (rows) => {
    try {
      for await (const row of rows) {
        updateIncomeForm(row?.original?.id, {
          is_read: !!!isReadSelected,
        });
      }

      table.setRowSelection({});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DashboardContentLayout
        noContentPadding
        toolbar={toolbar}
        breadcrumps={breadcrumps}
      >
        <FormContentWrapper
          archive_modal={archive_modal}
          setArchiveModal={setArchiveModal}
        />
      </DashboardContentLayout>
      {!!archive_modal && (
        <DeleteIncomeFormModal
          type="list"
          data={archive_modal}
          onClose={() => setArchiveModal(false)}
        />
      )}
      {request_modal && (
        <RequestsModal
          data={requests_modal_data}
          onClose={() => setRequestModal(null)}
        />
      )}
    </>
  );
};

export default FormContent;
