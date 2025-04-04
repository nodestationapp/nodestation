import "./styles.scss";

import {
  Box,
  FormControl,
  FormLabel,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import ColorModeDropdown from "components/ColorModeDropdown";

import { useApp } from "context/app";

import LogoIcon from "assets/icons/logo-sygnet.svg";

const LoginContent = () => {
  const { login } = useApp();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values);
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
        <Box
          sx={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <LogoIcon style={{ width: 50, height: 50 }} />
          <Typography
            component="h1"
            variant="h4"
            textAlign="center"
            sx={{ width: "100%", fontSize: 20 }}
          >
            Log in to your account
          </Typography>
        </Box>

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
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={formik.errors.email}
              helperText={formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
              full
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={formik.errors.password}
              helperText={formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={formik.isSubmitting}
            color="primary"
          >
            Sign in
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", top: 15, right: 15 }}>
        <ColorModeDropdown />
      </Box>
    </Box>
  );
};

export default LoginContent;
