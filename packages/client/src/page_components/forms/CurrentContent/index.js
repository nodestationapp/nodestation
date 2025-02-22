import { useState } from "react";

import TableStack from "components/TableStack";
import PreviewModal from "./components/PreviewModal";
import RequestsModal from "components/RequestsModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import DeleteIncomeFormModal from "page_components/forms/components/DeleteIncomeFormModal";

import { useForm } from "context/client/form";
import { useTableWrapper } from "context/client/table-wrapper";

import getHost from "libs/helpers/getHost";

import {
  TrashIcon,
  EnvelopeIcon,
  ArchiveBoxIcon,
  EnvelopeOpenIcon,
  PaperAirplaneIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";

const FormContentWrapper = ({ toolbar }) => {
  const {
    data,
    loading,
    readHandler,
    archived,
    sort,
    setSort,
    filters,
    setFilters,
  } = useForm();

  const [preview_modal, setPreviewModal] = useState(false);

  const form = data?.form;
  const incoming = data?.incoming;

  let fields =
    data?.form?.fields?.map((item) => ({
      key: item?.type,
      name: item?.name,
      type: item?.type,
      slug: item?.slug,
    })) || [];

  fields = [
    ...fields,
    {
      key: "date",
      name: "Created at",
      type: "date",
      slug: "created_at",
    },
  ];

  const columns =
    fields?.map((item) => ({
      key: item?.type,
      value: item?.name,
      type: item?.type,
      slug: item?.slug,
    })) || [];

  const meta = incoming?.map((item) => ({
    id: item?.id,
    disabled: item?.is_read,
    created_at: item?.created_at,
  }));

  return (
    <>
      <TableStack
        key={[form?.id, archived, sort]}
        meta={meta}
        sort={sort}
        toolbar={toolbar}
        setSort={setSort}
        columns={columns}
        loading={loading}
        tableId={form?.id}
        filters={filters}
        setFilters={setFilters}
        tableSchema={data?.form?.fields}
        rowClick={(row) => setPreviewModal(row)}
        data={incoming?.map((item) => ({
          id: item?.id,
          archived: item?.archived,
          is_read: item?.is_read,
          ...item,
        }))}
      />
      {!!preview_modal && (
        <PreviewModal
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

  const [request_modal, setRequestModal] = useState(false);
  const [incoming_archive_modal, setIncomingArchiveModal] = useState(false);

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
    selectAction: [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: () => setIncomingArchiveModal(true),
      },
      {
        icon: !!isReadSelected ? (
          <EnvelopeIcon color="#F0F1F3" />
        ) : isReadSelected === null ? null : (
          <EnvelopeOpenIcon color="#F0F1F3" />
        ),
        onClick: () => onReadHandler(),
      },
      {
        icon: !!archived ? (
          <ArchiveBoxIcon color="#F0F1F3" />
        ) : (
          <ArchiveBoxArrowDownIcon color="#F0F1F3" />
        ),
        onClick: () => onArchiveHandler(),
      },
    ],
    settingsButtonHandler: `/forms/${id}/settings`,
  };

  const onArchiveHandler = async () => {
    try {
      const itemsToArchive = table.getSelectedRowModel()?.rows;

      let nextArchived;
      const firstValue = itemsToArchive[0].original?.archived;
      const allSame = itemsToArchive.every(
        (item) => item.original?.archived === firstValue
      );

      if (!!allSame) {
        nextArchived = !!!firstValue;
      }

      for await (const row of itemsToArchive) {
        updateIncomeForm(row?.original?.id, {
          archived: nextArchived,
        });
      }

      table.setRowSelection({});
    } catch (err) {
      console.error(err);
    }
  };

  const onReadHandler = async () => {
    try {
      const itemsToRead = table.getSelectedRowModel()?.rows;

      for await (const row of itemsToRead) {
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
      <DashboardContentLayout breadcrumps={breadcrumps}>
        <FormContentWrapper toolbar={toolbar} />
      </DashboardContentLayout>
      {!!incoming_archive_modal && (
        <DeleteIncomeFormModal
          type="list"
          data={incoming_archive_modal}
          onClose={() => setIncomingArchiveModal(false)}
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
