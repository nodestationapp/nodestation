import { useFormik } from "formik";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ColorModeDropdown } from "@nstation/design-system";

const ForgetPasswordContent = () => {
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // await login(values);
    } catch (err) {
      setErrors(err?.response?.data?.errors);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            Forgot your password?
          </Typography>
          <Typography variant="body2" textAlign="center">
            We will send you instructions to your email address
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
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            autoComplete="email"
            error={formik.errors.email}
            value={formik.values.email}
            helperText={formik.errors.email}
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
            Reset password
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
  );
};

export default ForgetPasswordContent;
