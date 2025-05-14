import { useState } from "react";
import { Card, CardActionArea, Stack, Switch, Typography } from "@mui/material";

import { useEmails } from "../contexts/emails.js";
import activeEmailChecker from "../utils/activeEmailChecker.js";

import AwsLogo from "../icons/aws.svg";
import MailgunLogo from "../icons/mailgun.svg";
import MailchimpLogo from "../icons/mailchimp.svg";
import StorageIcon from "@mui/icons-material/Storage";
import ElasticEmailLogo from "../icons/elastic-email.svg";
import ProviderSettingsModal from "./ProviderSettingsModal.js";

const EmailProviders = () => {
  const { email_settings, updateEmailSettings } = useEmails();
  const [provider_settings_modal, setProviderSettingsModal] = useState(false);

  const email_active = activeEmailChecker(email_settings);

  const email_type_data = [
    {
      icon: <StorageIcon height={20} width={20} />,
      label: "SMTP",
      value: "smtp",
      ready: email_active?.smtp,
      active: email_settings?.active === "smtp",
    },
    {
      icon: <MailchimpLogo width={95} height={24} />,
      value: "mailchimp",
      ready: email_active?.mailchimp,
      active: email_settings?.active === "mailchimp",
    },
    {
      icon: <MailgunLogo width={85} height={24} />,
      value: "mailgun",
      ready: email_active?.mailgun,
      active: email_settings?.active === "mailgun",
    },
    {
      icon: <AwsLogo height={22} width={36} />,
      label: "Amazon SES",
      value: "aws",
      ready: email_active?.aws,
      active: email_settings?.active === "aws",
    },
    {
      icon: <ElasticEmailLogo width={110} height={24} />,
      value: "elastic",
      ready: email_active?.elastic,
      active: email_settings?.active === "elastic",
    },
  ];

  const onChangeHandler = (e) => {
    const current_select =
      email_settings?.active !== e.target.name ? e.target.name : null;

    updateEmailSettings({ active: current_select });
  };

  return (
    <Stack direction="row" gap={1.5} flexWrap="wrap">
      {email_type_data?.map((item, index) => (
        <Card key={index} sx={{ padding: 0, width: 230 }}>
          <CardActionArea
            onClick={() => setProviderSettingsModal(item?.value)}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              padding: 2,
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" gap={2} alignItems="center">
              {item?.icon}
              <Typography>{item?.label}</Typography>
            </Stack>
            <Switch
              size="small"
              name={item?.value}
              disabled={!item?.ready}
              checked={!!item?.active}
              onChange={onChangeHandler}
              onClick={(e) => e.stopPropagation()}
            />
          </CardActionArea>
        </Card>
      ))}
      {!!provider_settings_modal && (
        <ProviderSettingsModal
          open={provider_settings_modal}
          onClose={() => setProviderSettingsModal(false)}
        />
      )}
    </Stack>
  );
};

export default EmailProviders;
