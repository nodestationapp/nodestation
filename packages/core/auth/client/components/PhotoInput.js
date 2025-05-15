import { useState } from "react";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { api } from "@nstation/design-system/utils";
import { useAuth } from "../contexts/authMiddleware.js";

const PhotoInput = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const onPhotoUpload = async (photo) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("photo", photo);

      await api.put(`/auth/me`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // getUserData(cookies?.access_token);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Avatar src={user?.photo?.url} sx={{ width: 50, height: 50 }} />
      <Button
        variant="contained"
        color="primary"
        size="small"
        component="label"
        loading={!!loading}
        htmlFor="account-settings-upload-image"
      >
        Change
        <input
          hidden
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => onPhotoUpload(e.target.files?.[0])}
          id="account-settings-upload-image"
        />
      </Button>
    </Stack>
  );
};

export default PhotoInput;
