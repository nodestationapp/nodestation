import { useState } from "react";
import { Form, Formik } from "formik";

import Button from "components/Button";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
import SettingsForm from "components/SettingsForm";
import SectionHeader from "components/SectionHeader";
import RequestsModal from "components/RequestsModal";
import ArchiveFormModal from "../components/ArchiveCollectionModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import getHost from "libs/helpers/getHost";

import { useCollection } from "context/client/collection";

import {
  CircleStackIcon,
  CodeBracketIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const CollectionSettingsContent = () => {
  const { data, id, loading, updateCollection } = useCollection();

  const [archive_modal, setArchiveModal] = useState(false);
  const [request_modal, setRequestModal] = useState(false);

  const collection = data?.collection;

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

  const breadcrumps = [
    {
      icon: <CircleStackIcon />,
      label: "Tables",
    },
    {
      label: collection?.name,
      href: `/collections/${collection?.id}`,
    },
    {
      label: "Settings",
    },
  ];

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await updateCollection(values);

      resetForm({ values });
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

  const host = getHost();

  const requests_modal_data = [
    {
      label: "Create form entry",
      url: `${host}/api/system/forms/${collection?.id}`,
      body: collection?.fields,
    },
  ];

  return (
    <>
      <Formik
        initialValues={{
          name: collection?.name,
          fields: collection?.fields || [],
          status: collection?.status || "active",
          settings: {
            send_email_admin: {
              active: collection?.settings?.send_email_admin?.active || false,
              value: collection?.settings?.send_email_admin?.value,
            },
            auto_responder: {
              active: collection?.settings?.auto_responder?.active || false,
              value: collection?.settings?.auto_responder?.value,
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
              submenu={!!id ? submenu_data : null}
              loading={!!loading}
              action={
                <>
                  {!!collection?.id && (
                    <>
                      <IconButton
                        onClick={() => setRequestModal(true)}
                        icon={<CodeBracketIcon color="#F0F1F3" />}
                      />
                      <span className="separetor" />
                      <IconButton
                        onClick={() => setArchiveModal(collection)}
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
      {request_modal && (
        <RequestsModal
          data={requests_modal_data}
          onClose={() => setRequestModal(null)}
        />
      )}
    </>
  );
};

export default CollectionSettingsContent;
