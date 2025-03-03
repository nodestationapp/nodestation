import "./styles.scss";

import { Fragment } from "react";

import MediaProviders from "components/MediaProviders";
import EmailProviders from "components/EmailProviders";
import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";
import ChangePasswordForm from "components/ChangePasswordForm";
import InputElementsEditor from "components/InputElementsEditor";

import ExtraTableSettings from "components/ExtraTableSettings";

const mainClass = "settings-form";

const input_type_render = (type, item) => {
  switch (type) {
    case "input_editor":
      return <InputElementsEditor />;
    case "form_extras":
      return <ExtraTableSettings />;
    case "email_providers":
      return <EmailProviders />;
    case "media_providers":
      return <MediaProviders />;
    case "change_password":
      return <ChangePasswordForm />;
    case "select":
      return (
        <FormikSelect
          name={item?.name}
          disabled={item?.disabled}
          placeholder={item?.placeholder}
          options={item?.options || []}
          variant="dark"
        />
      );
    default:
      return (
        <FormikInput
          name={item?.name}
          disabled={item?.disabled}
          placeholder={item?.placeholder}
          variant="light"
        />
      );
  }
};

const SettingsForm = ({ data }) => {
  return (
    <div className={mainClass}>
      {data?.map((item, index) => (
        <div key={index} className={`${mainClass}__item`}>
          <div className={`${mainClass}__item__label`}>
            <span>{item?.label}</span>
          </div>
          <div className={`${mainClass}__item__value`}>
            {item?.items?.map((item, index) => (
              <Fragment key={index}>
                {input_type_render(item?.type, item)}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsForm;
