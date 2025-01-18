import { Form, Formik } from "formik";

import Button from "components/Button";
import KeyViewer from "components/KeyViewer";
import SettingsForm from "components/SettingsForm";
import SectionHeader from "components/SectionHeader";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useUsers } from "context/client/users";

import { UsersIcon } from "@heroicons/react/24/outline";

const submenu_data = [
  {
    label: "Users",
    href: `/authentication`,
  },
  {
    label: "Settings",
    href: `/authentication/settings`,
  },
];

const CollectionSettingsContent = () => {
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
              breadcrumps={breadcrumps}
              submenu={submenu_data}
              loading={!!loading}
              action={
                <>
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

export default CollectionSettingsContent;
