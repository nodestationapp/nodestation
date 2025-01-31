import { useState } from "react";

import IconButton from "components/IconButton";
import TableStack from "components/TableStack";
import PreviewModal from "./components/PreviewModal";
import RequestsModal from "components/RequestsModal";
import IconButtonMenu from "components/IconButtonMenu";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import ArchiveFormModal from "page_components/forms/components/ArchiveFormModal";
import DeleteIncomeFormModal from "page_components/forms/components/DeleteIncomeFormModal";

import { useForm } from "context/client/form";

import getHost from "libs/helpers/getHost";

import {
  PaperAirplaneIcon,
  TrashIcon,
  ArchiveBoxIcon,
  Cog6ToothIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const FormContentWrapper = () => {
  // const { setFormsCount } = useApp();
  const {
    data,
    // updateIncomeForm,
    loading,
    readHandler,
    archived,
    // setChecked
  } = useForm();

  const [preview_modal, setPreviewModal] = useState(false);
  const [archive_modal, setArchiveModal] = useState(false);

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

  // const Actions = ({ item }) => (
  //   <>
  //     <Tooltip text={!!item?.is_read ? "Mark as unread" : "Mark as read"}>
  //       <IconButton
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           readHandler(item?.id, item?.is_read);
  //         }}
  //         icon={
  //           !!item?.is_read ? (
  //             <EnvelopeIcon color="#F0F1F3" />
  //           ) : (
  //             <EnvelopeOpenIcon color="#F0F1F3" />
  //           )
  //         }
  //       />
  //     </Tooltip>
  //     <Tooltip text={!!item?.archived ? "Move to incoming" : "Move to archive"}>
  //       <IconButton
  //         icon={
  //           !!item?.archived ? (
  //             <ArchiveBoxIcon color="#F0F1F3" />
  //           ) : (
  //             <ArchiveBoxArrowDownIcon color="#F0F1F3" />
  //           )
  //         }
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           updateIncomeForm(item?.id, {
  //             archived: !!item?.archived ? false : true,
  //           });
  //         }}
  //       />
  //     </Tooltip>
  //     <Tooltip text={"Delete"}>
  //       <IconButton
  //         icon={<TrashIcon color="#FF3636" />}
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           setArchiveModal(item);
  //         }}
  //       />
  //     </Tooltip>
  //   </>
  // );

  return (
    <>
      <TableStack
        key={archived}
        meta={meta}
        columns={columns}
        loading={loading}
        menu={table_menu}
        rowClick={(row) => setPreviewModal(row)}
        data={incoming?.map((item) => item?.data)}
      />
      {!!archive_modal && (
        <DeleteIncomeFormModal
          type="list"
          data={archive_modal}
          onClose={() => setArchiveModal(false)}
        />
      )}
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

const FormContent = () => {
  const { data, id, loading, archived } = useForm();

  const [archive_modal, setArchiveModal] = useState(false);
  const [request_modal, setRequestModal] = useState(false);

  const form = data?.form;

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
        icon: <ArchiveBoxIcon color="#F0F1F3" />,
      },
      {
        icon: <TrashIcon color="#FF3636" />,
      },
    ],
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
        <ArchiveFormModal
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
