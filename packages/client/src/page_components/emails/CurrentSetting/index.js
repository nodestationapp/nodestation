import "./styles.scss";

import Card from "components/Card";
import SmtpSettings from "./components/SmtpSettings";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useEmails } from "context/client/emails";
import activeEmailChecker from "libs/helpers/activeEmailChecker";

import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const breadcrumps = [
  {
    icon: <AtSymbolIcon />,
    label: "Emails",
    href: "/emails",
  },
  {
    label: "Settings",
    href: "/emails/settings",
  },
  {
    label: "SMTP",
  },
];

const EmailCurrentSetting = () => {
  const { email_settings } = useEmails();

  const email_active = activeEmailChecker(email_settings);

  const submenu_data = [
    {
      label: "Templates",
      href: "/emails",
    },
    {
      label: "Settings",
      href: "/emails/settings",
      icon: !!!email_active ? <ExclamationCircleIcon color="#FFD00D" /> : null,
    },
  ];

  const toolbar = {
    menu: [
      {
        label: "Templates",
        href: "/emails",
      },
      // {
      //   label: "Settings",
      //   href: "/emails/settings",
      //   icon: !!!email_settings?.active ? (
      //     <ExclamationCircleIcon color="#FFD00D" />
      //   ) : null,
      // },
    ],
  };

  return (
    <DashboardContentLayout breadcrumps={breadcrumps} toolbar={toolbar}>
      <div className="email-current__settings">
        <Card title="SMTP settings">
          <SmtpSettings />
        </Card>
      </div>
    </DashboardContentLayout>
  );
};

export default EmailCurrentSetting;
