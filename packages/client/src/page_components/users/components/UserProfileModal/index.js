import { Formik, Form } from "formik";
import { useQueryClient } from "@tanstack/react-query";

import KeyViewer from "components/KeyViewer";
import AsideModal from "components/AsideModal";

import api from "libs/api";
import tableInputRender from "libs/tableInputRender";

import { useUsers } from "context/client/users";

const UserProfileModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();
  const { settings } = useUsers();

  const onSubmit = async (values, setSubmitting, setErrors) => {
    try {
      const formData = new FormData();
      Object.keys(values)?.forEach((item) => {
        if (!!!values?.[item]?.size) {
          formData.append(item, values?.[item]?.file || values?.[item]);
        }
      });

      if (data?.id) {
        await api.put(`/auth/${data?.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post(`/auth`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      queryClient.refetchQueries({ queryKey: ["users"] });
      onClose();
    } catch (err) {
      setErrors(err?.response?.data?.errors);
      setSubmitting(false);
      console.error(err);
    }
  };

  const formatted_data = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === undefined ? null : value,
    ])
  );

  return (
    <Formik
      initialValues={formatted_data}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        onSubmit(values, setSubmitting, setErrors);
      }}
    >
      {({ isSubmitting, submitForm, values }) => (
        <Form autoComplete="off" style={{ width: "100%" }}>
          <AsideModal
            header={
              !!data?.id ? `${data?.first_name} ${data?.last_name}` : "Add user"
            }
            onClose={onClose}
            onSubmit={submitForm}
            loading={isSubmitting}
            submit_label={
              <>
                Save
                <KeyViewer data={["⌘", "S"]} />
              </>
            }
            size="full"
          >
            <div className="form form--wrap">
              {settings?.fields?.map((item, index) => {
                if (!!!data?.id) {
                  if (item?.slug === "id") return null;
                  if (item?.slug === "created_at") return null;
                }

                return (
                  <div
                    key={index}
                    style={item?.type === "long_text" ? { width: "100%" } : {}}
                  >
                    {tableInputRender(item)}
                  </div>
                );
              })}
            </div>
          </AsideModal>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileModal;
