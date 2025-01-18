import { useState } from "react";
import { Form, Formik } from "formik";

import Button from "components/Button";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
import SettingsForm from "components/SettingsForm";
import RequestsModal from "components/RequestsModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";
import ArchiveFormModal from "page_components/forms/components/ArchiveFormModal";

import getHost from "libs/helpers/getHost";
import { useForm } from "context/client/form";

import {
  CodeBracketIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const FormSettingsContent = () => {
  const { data, id, loading, createForm, updateForm } = useForm();

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
      href: `/forms/${form?.id}`,
    },
    {
      label: "Settings",
    },
  ];

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
      <Formik
        initialValues={{
          name: form?.name,
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
              breadcrumps={breadcrumps}
              submenu={id !== "new" ? submenu_data : null}
              loading={!!loading}
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
                  <Button
                    disabled={!!!dirty}
                    loading={!!isSubmitting}
                    onClick={submitForm}
                  >
                    Save <KeyViewer data={["⌘", "S"]} />
                  </Button>
                </>
              }
            >
              {/* <SectionHeader
                title="Settings"
                subtitle="Manage your form settings"
              /> */}
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
      {request_modal && (
        <RequestsModal
          data={requests_modal_data}
          onClose={() => setRequestModal(null)}
        />
      )}
    </>
  );
};

export default FormSettingsContent;
