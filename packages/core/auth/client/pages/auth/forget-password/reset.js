import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { api } from "@nstation/design-system/utils";
import { ColorModeDropdown } from "@nstation/design-system";

const ForgetPasswordContent = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [reset_sent, setResetSent] = useState(false);

  const query = new URLSearchParams(search);
  const token = query.get("token");

  useEffect(() => {
    (async () => {
      try {
        await api.get(`/admin-api/auth/reset-password?token=${token}`);
        setLoading(false);
      } catch (err) {
        navigate("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await api.post("/admin-api/auth/reset-password/confirm", {
        ...values,
        token,
      });
      setResetSent(true);
    } catch (err) {
      setErrors(err?.response?.data?.errors);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      password2: "",
    },
    onSubmit,
  });

  if (!!loading) return null;

  return !reset_sent ? (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 380 }}>
        <Stack
          direction="column"
          gap={1}
          sx={{
            marginBottom: "30px",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            textAlign="center"
            sx={{ width: "100%", fontSize: 20 }}
          >
            Reset your password
          </Typography>
          <Typography variant="body2" textAlign="center">
            Provide your new password
          </Typography>
        </Stack>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            type="password"
            name="password"
            label="New password"
            variant="outlined"
            error={formik.errors.password}
            value={formik.values.password}
            helperText={formik.errors.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="password"
            name="password2"
            label="Confirm new password"
            variant="outlined"
            error={formik.errors.password2}
            value={formik.values.password2}
            helperText={formik.errors.password2}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={formik.isSubmitting}
            color="primary"
          >
            Submit
          </Button>
          <Stack direction="row" justifyContent="center" marginTop={1}>
            <Typography
              component={Link}
              variant="body2"
              color="textPrimary"
              fontWeight={500}
              to="/login"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Back to login
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", top: 15, right: 15 }}>
        <ColorModeDropdown />
      </Box>
    </Box>
  ) : (
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
        <Typography variant="h5" textAlign="center">
          Password has been changed successfully!
        </Typography>
        <Typography variant="body">Now you can login to dashboard.</Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          LinkComponent={Link}
          to="/login"
        >
          Go to login
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPasswordContent;
