import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";

import ColorModeDropdown from "components/ColorModeDropdown";

import api from "libs/api";

import LogoIcon from "assets/icons/logo-sygnet.svg";
import { useAuth } from "../../contexts/authMiddleware.js";

const RegisterContent = () => {
  const { setIsAdmin } = useAuth();
  const navigate = useLocation();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await api.post("/auth/register", values);
      setIsAdmin(true);
      navigate("/login");
    } catch (err) {
      setSubmitting(false);
      setErrors(err?.response?.data?.errors);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
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
            Sign up your admin account
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
          <TextField
            fullWidth
            type="text"
            name="first_name"
            label="First name"
            variant="outlined"
            autoComplete="first_name"
            error={formik.errors.first_name}
            value={formik.values.first_name}
            helperText={formik.errors.first_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="text"
            name="last_name"
            label="Last name"
            variant="outlined"
            autoComplete="last_name"
            error={formik.errors.last_name}
            value={formik.values.last_name}
            helperText={formik.errors.last_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
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
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            error={formik.errors.password}
            value={formik.values.password}
            autoComplete="current-password"
            helperText={formik.errors.password}
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
            Sign up
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", top: 15, right: 15 }}>
        <ColorModeDropdown />
      </Box>
    </Box>
  );
};

export default RegisterContent;
