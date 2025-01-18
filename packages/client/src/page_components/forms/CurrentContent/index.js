import { useState } from "react";

import Table from "components/Table";
import Tooltip from "components/Tooltip";
import IconButton from "components/IconButton";
import PreviewModal from "./components/PreviewModal";
import RequestsModal from "components/RequestsModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import ArchiveFormModal from "page_components/forms/components/ArchiveFormModal";
import DeleteIncomeFormModal from "page_components/forms/components/DeleteIncomeFormModal";

import { useForm } from "context/client/form";

import getHost from "libs/helpers/getHost";

import {
  PaperAirplaneIcon,
  TrashIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  EnvelopeOpenIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { CodeBracketIcon } from "@heroicons/react/24/solid";

const FormContentWrapper = () => {
  // const { setFormsCount } = useApp();
  const {
    data,
    updateIncomeForm,
    loading,
    readHandler,
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

  const Actions = ({ item }) => (
    <>
      <Tooltip text={!!item?.is_read ? "Mark as unread" : "Mark as read"}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            readHandler(item?.id, item?.is_read);
          }}
          icon={
            !!item?.is_read ? (
              <EnvelopeIcon color="#F0F1F3" />
            ) : (
              <EnvelopeOpenIcon color="#F0F1F3" />
            )
          }
        />
      </Tooltip>
      <Tooltip text={!!item?.archived ? "Move to incoming" : "Move to archive"}>
        <IconButton
          icon={
            !!item?.archived ? (
              <ArchiveBoxIcon color="#F0F1F3" />
            ) : (
              <ArchiveBoxArrowDownIcon color="#F0F1F3" />
            )
          }
          onClick={(e) => {
            e.stopPropagation();
            updateIncomeForm(item?.id, {
              archived: !!item?.archived ? false : true,
            });
          }}
        />
      </Tooltip>
      <Tooltip text={"Delete"}>
        <IconButton
          icon={<TrashIcon color="#FF3636" />}
          onClick={(e) => {
            e.stopPropagation();
            setArchiveModal(item);
          }}
        />
      </Tooltip>
    </>
  );

  const table_data = {
    keys: !!fields ? [...fields] : null,
    items: incoming?.map((item) => ({
      id: item?.id,
      onclick: () => setPreviewModal(item),
      actions: <Actions item={item} />,
      disabled: !!item?.is_read,
      data: fields?.map((element, index) => {
        return {
          key: fields?.[index]?.type,
          type: index === 0 ? "new_message_name" : element?.type,
          value:
            index === 0
              ? {
                  value: item?.data?.[element?.slug] || "-",
                  is_read: !!item?.is_read,
                }
              : item?.[element?.slug] || item?.data?.[element?.slug] || "-",
        };
      }),
    })),
  };

  //TODO

  return (
    <>
      <Table
        // filters={true}
        data={table_data}
        loading={loading}
        toolbar={Actions}
        hide_header={loading}
        // checkChange={(e) => setChecked(e)}
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
          name={preview_modal?.name}
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

  const submenu_data = [
    {
      label: "Incoming",
      href: `/forms/${id}`,
    },
    {
      label: "Archived",
      href: `/forms/${id}/archived`,
    },
    {
      label: "Settings",
      href: `/forms/${id}/settings`,
    },
  ];

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

  return (
    <>
      <DashboardContentLayout
        breadcrumps={breadcrumps}
        submenu={!!id ? submenu_data : []}
        action={
          <>
            {!!form?.id && (
              <>
                <IconButton
                  onClick={() => setRequestModal(true)}
                  icon={<CodeBracketIcon color="#F0F1F3" />}
                />
                <span className="separetor" />
                <IconButton
                  onClick={() => setArchiveModal(form)}
                  icon={<TrashIcon color="#FF3636" />}
                />
              </>
            )}
          </>
        }
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
