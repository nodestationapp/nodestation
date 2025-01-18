import "./styles.scss";

import { useFormikContext } from "formik";

import Alert from "components/Alert";
import Button from "components/Button";
import FormikSelect from "components/formik/FormikSelect";
import FormikSwitchAccordion from "components/formik/FormikSwitchAccordion";

import { useForm } from "context/client/form";
import { useEmails } from "context/client/emails";

import field_type_data from "libs/field_type_data";
import activeEmailChecker from "libs/helpers/activeEmailChecker";

const mainClass = "forms__extra-settings";

const ExtraSettings = () => {
  const { emails } = useForm();
  const { values } = useFormikContext();
  const { email_settings } = useEmails();

  const email_active = !!!email_settings
    ? true
    : activeEmailChecker(email_settings);

  const formatted_emails = emails?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const auto_responder_fields = values?.fields?.map((item) => ({
    icon: field_type_data?.find((element) => element?.value === item?.type)
      ?.icon,
    label: item?.name,
    value: item?.slug,
  }));

  return (
    <>
      {/* <Card title="Additional settings"> */}
      <div className={mainClass}>
        <div className={`${mainClass}__items`}>
          <FormikSwitchAccordion
            label="Send e-mail to admins"
            name="settings.send_email_admin.active"
            content={
              <>
                {!!!email_active && (
                  <Alert
                    text="To send email messages, you must first configure your settings."
                    action={
                      <Button variant="transparent" href="/emails/settings">
                        Configure
                      </Button>
                    }
                  />
                )}
                <FormikSelect
                  label="Template"
                  name="settings.send_email_admin.value"
                  options={formatted_emails}
                  disabled={!!!email_active}
                />
              </>
            }
          />

          {/* <FormikSwitchAccordion
              label="Function after receiving the message"
              name="settings.function_after.active"
              content={
                <FormikSelect
                  name="settings.function_after.value"
                  placeholder="Select function"
                  options={formatted_functions}
                />
              }
            /> */}
          <FormikSwitchAccordion
            label="Auto responder"
            name="settings.auto_responder.active"
            content={
              <>
                {!!!email_active && (
                  <Alert
                    text="To send email messages, you must first configure your settings."
                    action={
                      <Button variant="transparent" href="/emails/settings">
                        Configure
                      </Button>
                    }
                  />
                )}
                <div className={`${mainClass}__auto-responder`}>
                  <FormikSelect
                    label="Email address field"
                    disabled={!!!email_active}
                    name="settings.auto_responder.email_field"
                    options={auto_responder_fields}
                  />
                  <FormikSelect
                    label="Template"
                    name="settings.auto_responder.value"
                    disabled={!!!email_active}
                    options={formatted_emails}
                  />
                </div>
              </>
            }
          />
        </div>
      </div>
      {/* </Card> */}
    </>
  );
};

export default ExtraSettings;
