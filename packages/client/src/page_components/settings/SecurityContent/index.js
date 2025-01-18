import "./styles.scss";
import SettingsForm from "components/SettingsForm";

const mainClass = "settings-general";

const SecurityContent = () => {
  const settings_data = [
    {
      label: "Change password",
      items: [
        {
          type: "change_password",
        },
      ],
    },
  ];

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__header`}>
        <h1>Security</h1>
        <span>Manage your security settings</span>
      </div>
      <SettingsForm data={settings_data} />
    </div>
  );
};

export default SecurityContent;
