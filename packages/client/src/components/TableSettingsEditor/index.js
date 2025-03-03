import { Form, Formik } from "formik";

import SettingsForm from "components/SettingsForm";
import SectionHeader from "components/SectionHeader";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useTable } from "context/client/table";

const TableSettingsEditor = ({ breadcrumps, toolbar, settings, form }) => {
  const { loading, updateTable } = useTable();

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await updateTable(values);

      resetForm({ values });
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={form}
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
            <SettingsForm data={settings} />
          </DashboardContentLayout>
        </Form>
      )}
    </Formik>
  );
};

export default TableSettingsEditor;
