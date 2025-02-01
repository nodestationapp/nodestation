import { useState } from "react";
import { Form, Formik } from "formik";

import Button from "components/Button";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
import SettingsForm from "components/SettingsForm";
import SectionHeader from "components/SectionHeader";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";
import ArchiveFormModal from "page_components/forms/components/ArchiveFormModal";

import { useForm } from "context/client/form";

import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";

const FormSettingsContent = () => {
  const { data, id, loading, createForm, updateForm } = useForm();

  const [archive_modal, setArchiveModal] = useState(false);

  const form = data?.form;

  const breadcrumps = [
    {
      icon: <PaperAirplaneIcon />,
      label: "Forms",
      href: "/forms",
    },
    {
      label: !!loading ? null : form?.name || "Create form",
      href: `/forms/${form?.id}`,
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
          placeholder: "Enter form name",
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
    {
      label: "Additional settings",
      items: [
        {
          name: "fields",
          type: "form_extras",
        },
      ],
    },
  ];

  const toolbar = ({ isSubmitting, dirty, submitForm }) => ({
    menu: [
      ...(id !== "new"
        ? [
            {
              label: "Incoming",
              href: `/forms/${id}`,
            },
            {
              label: "Archived",
              href: `/forms/${id}/archived`,
            },
          ]
        : []),
    ],
    action: [
      ...(id !== "new"
        ? [
            <IconButton
              size="small"
              onClick={() => setArchiveModal(form)}
              icon={<TrashIcon color="#FF3636" />}
            />,
          ]
        : []),

      <Button disabled={!!!dirty} loading={!!isSubmitting} onClick={submitForm}>
        Save <KeyViewer data={["⌘", "S"]} />
      </Button>,
    ],
  });

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      if (!!form?.id) {
        await updateForm(values);
      } else {
        await createForm(values);
      }

      resetForm({ values });
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: form?.name || "",
          fields: form?.fields || [],
          status: form?.status || "active",
          settings: {
            send_email_admin: {
              active: form?.settings?.send_email_admin?.active || false,
              value: form?.settings?.send_email_admin?.value,
            },
            auto_responder: {
              active: form?.settings?.auto_responder?.active || false,
              email_field: form?.settings?.auto_responder?.email_field,
              value: form?.settings?.auto_responder?.value,
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
              {id !== "new" && (
                <SectionHeader
                  title="Settings"
                  subtitle="Manage your form settings"
                />
              )}
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

export default FormSettingsContent;
