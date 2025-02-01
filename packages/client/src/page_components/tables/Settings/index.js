import { useState } from "react";
import { Form, Formik } from "formik";

import Button from "components/Button";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
import SettingsForm from "components/SettingsForm";
import SectionHeader from "components/SectionHeader";
import ArchiveFormModal from "../components/ArchiveTableModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useTable } from "context/client/table";

import { CircleStackIcon, TrashIcon } from "@heroicons/react/24/outline";

const TableSettingsContent = () => {
  const { data, id, loading, updateTable } = useTable();

  const [archive_modal, setArchiveModal] = useState(false);

  const table = data?.table;

  const breadcrumps = [
    {
      icon: <CircleStackIcon />,
      label: "Tables",
    },
    {
      label: table?.name,
      href: `/tables/${table?.id}`,
    },
    {
      label: "Settings",
    },
  ];

  const settings_data = [
    {
      label: "Name",
      items: [
        {
          name: "name",
          disabled: true,
          placeholder: "Table name",
        },
      ],
    },
    {
      label: "Fields",
      items: [
        {
          name: "fields",
          type: "input_editor",
        },
      ],
    },
  ];

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await updateTable(values);

      resetForm({ values });
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const toolbar = ({ dirty, isSubmitting, submitForm }) => ({
    menu: [
      {
        label: "Entries",
        href: `/tables/${id}`,
      },
    ],
    action: [
      <IconButton
        size="small"
        onClick={() => setArchiveModal(table)}
        icon={<TrashIcon color="#FF3636" />}
      />,
      <Button disabled={!!!dirty} loading={!!isSubmitting} onClick={submitForm}>
        Save <KeyViewer data={["⌘", "S"]} />
      </Button>,
    ],
  });

  return (
    <>
      <Formik
        initialValues={{
          name: table?.name,
          fields: table?.fields || [],
          status: table?.status || "active",
          settings: {
            send_email_admin: {
              active: table?.settings?.send_email_admin?.active || false,
              value: table?.settings?.send_email_admin?.value,
            },
            auto_responder: {
              active: table?.settings?.auto_responder?.active || false,
              value: table?.settings?.auto_responder?.value,
            },
          },
        }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ submitForm, isSubmitting, dirty }) => (
          <Form autoComplete="off" style={{ width: "100%" }}>
            <DashboardContentLayout
              loading={!!loading}
              breadcrumps={breadcrumps}
              toolbar={toolbar({ submitForm, isSubmitting, dirty })}
            >
              <SectionHeader
                title="Settings"
                subtitle="Manage your table settings"
              />
              <SettingsForm data={settings_data} />
            </DashboardContentLayout>
          </Form>
        )}
      </Formik>
      {!!archive_modal && (
        <ArchiveFormModal
          data={archive_modal}
          onClose={() => setArchiveModal(false)}
        />
      )}
    </>
  );
};

export default TableSettingsContent;
