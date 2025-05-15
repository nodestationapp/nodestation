import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { api } from "@nstation/design-system/utils";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Verify = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [email_confirmed, setEmailConfirmed] = useState(false);

  useEffect(() => {
    const token = query.get("token");
    (async () => {
      try {
        await api.post(`/auth/activation`, {
          token,
        });
        setEmailConfirmed(true);
      } catch (err) {
        navigate("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (!!!email_confirmed) return null;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 54, color: "success.light", mb: 1 }}
        />
        <Typography variant="h5">
          Email address has been verified successfully!
        </Typography>
        <Typography variant="body">You can now access your account.</Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          LinkComponent={Link}
          to="/login"
        >
          Go to login page
        </Button>
      </Box>
    </Box>
  );
};

export default Verify;
