import "./styles.scss";

import { useState } from "react";

import Switch from "components/form/Switch";
import MediaProviderModal from "./components/MediaProviderModal";
import ChangeProviderModal from "components/SettingsForm/components/ChangeProviderModal";

import { useMedia } from "context/client/media";
import activeEmailChecker from "libs/helpers/activeEmailChecker";

import { InboxStackIcon } from "@heroicons/react/24/outline";
import AwsLogo from "assets/icons/email-providers/aws.svg";
// import { ReactComponent as GoogleLogo } from "assets/icons/media-providers/google.svg";
// import { ReactComponent as WasabiLogo } from "assets/icons/media-providers/wasabi.svg";
import DigitalOceanLogo from "assets/icons/media-providers/digitalocean.svg";

const mainClass = "media-providers";

const MediaProviders = () => {
  const { media, media_settings, updateMediaSettings } = useMedia();
  const [email_provider_modal, setEmailProviderModal] = useState(false);
  const [change_provider_info, setChangeProviderInfo] = useState(false);

  const media_active = activeEmailChecker(media_settings);

  const media_type_data = [
    {
      icon: <InboxStackIcon height={20} width={20} />,
      label: "Local disk",
      value: "local",
      ready: true,
      active: media_settings?.active === "local",
    },
    {
      icon: <AwsLogo />,
      label: "AWS S3",
      value: "aws",
      ready: media_active?.aws,
      active: media_settings?.active === "aws",
    },
    {
      icon: <DigitalOceanLogo />,
      value: "digitalocean",
      ready: media_active?.digitalocean,
      active: media_settings?.active === "digitalocean",
    },
  ];

  const onChangeHandler = (e) => {
    if (media_settings?.active === e.target.name) {
      return;
    }

    if (media_settings?.active !== e.target.name && !!media?.length) {
      const selected_name = media_type_data?.find(
        (item) => item?.value === e.target.name
      )?.label;

      setChangeProviderInfo({ label: selected_name, value: e.target.name });

      return;
    }

    updateMediaSettings({ active: e.target.name });
  };

  return (
    <div className={mainClass}>
      {media_type_data?.map((item, index) => (
        <button
          key={index}
          onClick={() => setEmailProviderModal(item?.value)}
          className={`${mainClass}__item`}
        >
          <div className={`${mainClass}__item__label`}>
            {item?.icon}
            {item?.label}
          </div>
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
        <MediaProviderModal
          type={email_provider_modal}
          onClose={() => setEmailProviderModal(false)}
        />
      )}
      {!!change_provider_info && (
        <ChangeProviderModal
          data={change_provider_info}
          onClose={() => setChangeProviderInfo(false)}
        />
      )}
    </div>
  );
};

export default MediaProviders;
