import { useState } from "react";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useAuth } from "../contexts/authMiddleware.js";
import MediaDialog from "../../../media/client/components/MediaDialog/index.js";

const PhotoInput = () => {
  const { user, userUpdate } = useAuth();

  const [loading, setLoading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleSubmit = async (value) => {
    try {
      setLoading(true);

      await userUpdate({ photo: value?.id });
      setUploadDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar src={user?.photo?.url} sx={{ width: 50, height: 50 }} />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setUploadDialogOpen(true)}
        >
          Change
        </Button>
      </Stack>
      <MediaDialog
        loading={loading}
        open={uploadDialogOpen}
        onSubmit={handleSubmit}
        value={{ id: user?.photo?.id }}
        onClose={() => setUploadDialogOpen(false)}
      />
    </>
  );
};

export default PhotoInput;
