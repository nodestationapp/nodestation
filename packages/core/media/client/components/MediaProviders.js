import { useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useColorScheme } from "@mui/material";

import { useMedia } from "../contexts/media.js";
import activeEmailChecker from "../utils/activeEmailChecker.js";
import ProviderSettingsModal from "./ProviderSettingsModal.js";

import AwsLogo from "../icons/aws.svg";
import AwsLogoDark from "../icons/aws-dark.svg";
import StorageIcon from "@mui/icons-material/Storage";
import DigitalOceanLogo from "../icons/digitalocean.svg";

const MediaProviders = () => {
  const { mode } = useColorScheme();
  const { media_settings, updateMediaSettings } = useMedia();
  const [provider_settings_modal, setProviderSettingsModal] = useState(false);

  const media_active = activeEmailChecker(media_settings);

  const media_type_data = [
    {
      icon: <StorageIcon height={20} width={20} />,
      label: "Local disk",
      value: "local",
      ready: true,
      active: media_settings?.active === "local",
    },
    {
      icon:
        mode === "dark" ? (
          <AwsLogo height={22} width={36} />
        ) : (
          <AwsLogoDark height={22} width={36} />
        ),
      label: "AWS S3",
      value: "aws",
      ready: media_active?.aws,
      active: media_settings?.active === "aws",
    },
    {
      icon: <DigitalOceanLogo width={110} height={20} />,
      value: "digitalocean",
      ready: media_active?.digitalocean,
      active: media_settings?.active === "digitalocean",
    },
  ];

  const onChangeHandler = (e) => {
    if (media_settings?.active === e.target.name) {
      return;
    }

    // if (media_settings?.active !== e.target.name && !!media?.length) {
    //   const selected_name = media_type_data?.find(
    //     (item) => item?.value === e.target.name
    //   )?.label;

    //   setChangeProviderInfo({ label: selected_name, value: e.target.name });

    //   return;
    // }

    updateMediaSettings({ active: e.target.name });
  };

  return (
    <Stack direction="row" gap={1.5} flexWrap="wrap">
      {media_type_data?.map((item, index) => (
        <Card key={index} sx={{ padding: 0, width: { xs: "100%", sm: 230 } }}>
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

export default MediaProviders;
