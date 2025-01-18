import "./styles.scss";

import { useState } from "react";
import { Form, Formik } from "formik";

import Button from "components/Button";
import Input from "components/form/Input";
import KeyViewer from "components/KeyViewer";
import PhotoForm from "components/form/PhotoForm";
import FormikInput from "components/formik/FormikInput";
import FormikSaveListener from "components/formik/FormikSaveListener";

import api from "libs/api";
import generateBase64 from "libs/helpers/generateBase64";

import { useApp } from "context/app";

const mainClass = "settings-general";

const GeneralContent = () => {
  const { user, userUpdate, getUserData } = useApp();
  const [uploaded_preview, setUploadedPreview] = useState(null);

  const onSubmit = async (values, setSubmitting, resetForm) => {
    try {
      await userUpdate(values);
      resetForm({ values });
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  const onPhotoUpload = async (photo) => {
    try {
      const formData = new FormData();
      formData.append("photo", photo);

      const preview = await generateBase64(photo);

      await api.put(`/user/me`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage?.getItem("access_token")}`,
        },
      });

      setUploadedPreview({ url: preview });
      getUserData(localStorage?.getItem("access_token"));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__header`}>
        <h1>General</h1>
        <span>Manage your general profile settings</span>
      </div>
      <Formik
        initialValues={{
          first_name: user?.first_name,
          last_name: user?.last_name,
        }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form
            className="form form--settings"
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <PhotoForm
              photo={uploaded_preview || user?.photo}
              onChange={onPhotoUpload}
            />
            <div className="row">
              <FormikInput
                name="first_name"
                label="First name"
                variant="light"
              />
              <FormikInput name="last_name" label="Last name" variant="light" />
            </div>
            <Input
              label="Email address"
              value={user?.email}
              disabled={true}
              variant="light"
            />
            <Button type="submit" disabled={!!!dirty} loading={isSubmitting}>
              Save
              <KeyViewer data={["⌘", "S"]} />
            </Button>
            <FormikSaveListener />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralContent;
