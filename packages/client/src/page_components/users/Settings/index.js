import { Form, Formik } from "formik";

import Button from "components/Button";
import KeyViewer from "components/KeyViewer";
import SettingsForm from "components/SettingsForm";
import SectionHeader from "components/SectionHeader";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useUsers } from "context/client/users";

import { UsersIcon } from "@heroicons/react/24/outline";

const TableSettingsContent = () => {
  const { settings, loading, updateAuth } = useUsers();

  const breadcrumps = [
    {
      icon: <UsersIcon />,
      label: "Authentication",
      href: "/authentication",
    },
    {
      label: "Settings",
    },
  ];

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await updateAuth(values);

      resetForm({ values });
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  const settings_data = [
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

  const toolbar = ({ dirty, isSubmitting, submitForm }) => ({
    menu: [
      {
        label: "Users",
        href: `/authentication`,
      },
    ],
    action: [
      <Button disabled={!!!dirty} loading={!!isSubmitting} onClick={submitForm}>
        Save <KeyViewer data={["⌘", "S"]} />
      </Button>,
    ],
  });

  return (
    <>
      <Formik
        initialValues={{
          fields: settings?.fields || [],
        }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ submitForm, isSubmitting, dirty }) => (
          <Form autoComplete="off" style={{ width: "100%" }}>
            <DashboardContentLayout
              toolbar={toolbar({ submitForm, isSubmitting, dirty })}
              breadcrumps={breadcrumps}
              loading={!!loading}
            >
              <SectionHeader
                title="Settings"
                subtitle="Manage your authentication settings"
              />
              <SettingsForm data={settings_data} />
            </DashboardContentLayout>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TableSettingsContent;
