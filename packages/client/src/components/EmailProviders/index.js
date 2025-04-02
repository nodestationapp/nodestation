import "./styles.scss";

import { useState } from "react";

import Switch from "components/form/Switch";
import EmailProviderModal from "./components/EmailProviderModal";

import { useEmails } from "context/client/emails";
import activeEmailChecker from "libs/helpers/activeEmailChecker";

import { InboxStackIcon } from "@heroicons/react/24/outline";

import AwsLogo from "assets/icons/email-providers/aws.svg";
import MailgunLogo from "assets/icons/email-providers/mailgun.svg";
// import { ReactComponent as SendgridLogo } from "assets/icons/email-providers/sendgrid.svg";
import MailchimpLogo from "assets/icons/email-providers/mailchimp.svg";
import ElasticEmailLogo from "assets/icons/email-providers/elastic-email.svg";

const mainClass = "email-providers";

const EmailProviders = () => {
  const { email_settings, updateEmailSettings } = useEmails();
  const [email_provider_modal, setEmailProviderModal] = useState(false);

  const email_active = activeEmailChecker(email_settings);

  // TODO: add sendgrid

  const email_type_data = [
    {
      icon: <InboxStackIcon height={20} width={20} />,
      label: "SMTP",
      value: "smtp",
      ready: email_active?.smtp,
      active: email_settings?.active === "smtp",
    },
    // {
    //   icon: <SendgridLogo />,
    //   value: "sendgrid",
    //   ready: email_active?.sendgrid,
    //   active: email_settings?.active === "sendgrid",
    // },
    {
      icon: <MailchimpLogo />,
      value: "mailchimp",
      ready: email_active?.mailchimp,
      active: email_settings?.active === "mailchimp",
    },
    {
      icon: <MailgunLogo />,
      value: "mailgun",
      ready: email_active?.mailgun,
      active: email_settings?.active === "mailgun",
    },
    {
      icon: <AwsLogo />,
      label: "Amazon SES",
      value: "aws",
      ready: email_active?.aws,
      active: email_settings?.active === "aws",
    },
    {
      icon: <ElasticEmailLogo />,
      value: "elastic",
      ready: email_active?.elastic,
      active: email_settings?.active === "elastic",
    },
  ];

  const onChangeHandler = (e) => {
    const current_select =
      email_settings?.active !== e.target.name ? e.target.name : null;

    updateEmailSettings({ type: "active", active: current_select });
  };

  return (
    <div className={mainClass}>
      {email_type_data?.map((item, index) => (
        <button
          key={index}
          onClick={() => setEmailProviderModal(item?.value)}
          className={`${mainClass}__item`}
        >
          <div className={`${mainClass}__item__label`}>
            {item?.icon}
            {item?.label}
          </div>
          {/* {item?.active && <CheckCircleIcon height={20} width={20} />} */}
          <Switch
            name={item?.value}
            onClick={(e) => e.stopPropagation()}
            checked={!!item?.active}
            onChange={onChangeHandler}
            disabled={!!!item?.ready}
          />
        </button>
      ))}
      {!!email_provider_modal && (
        <EmailProviderModal
          type={email_provider_modal}
          onClose={() => setEmailProviderModal(false)}
        />
      )}
    </div>
  );
};

export default EmailProviders;
