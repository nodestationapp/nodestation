import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useApiKeys } from "../contexts/api-keys.js";

const expiration_options = [
  { label: "7 days", value: "7" },
  { label: "30 days", value: "30" },
  { label: "90 days", value: "90" },
  { label: "Unlimited", value: "unlimited" },
];

const ApiTokenModal = ({ open, onClose }) => {
  const theme = useTheme();
  const { addApiKey } = useApiKeys();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await addApiKey(values);
      onClose();
    } catch (err) {
      setSubmitting(false);
      setErrors(err?.response?.data?.errors);
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      expiration: "",
    },
    onSubmit,
  });

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: 520,
          width: "100%",
          ...(fullScreen && {
            maxWidth: "unset",
            borderRadius: 0,
          }),
        },
      }}
      onClose={onClose}
    >
      <DialogTitle>Create API key</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Stack gap={1.5} direction="column">
          <TextField
            required
            fullWidth
            name="name"
            label="Name"
            variant="standard"
            onBlur={formik.handleBlur}
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={!!formik?.errors?.name}
            helperText={formik?.errors?.name}
          />
          <FormControl
            fullWidth
            variant="standard"
            required
            error={formik?.errors?.expiration}
          >
            <InputLabel id="default-select-label">Expiration</InputLabel>
            <Select
              name="expiration"
              label="Expiration"
              disabled={false}
              labelId="default-select-label"
              value={formik.values.expiration}
              onChange={(e) =>
                formik.setFieldValue("expiration", e.target.value)
              }
              onBlur={formik.handleBlur}
              error={formik.errors.expiration}
            >
              {expiration_options.map((item, index) => (
                <MenuItem key={item.value || index} value={item?.value}>
                  {item?.label}
                </MenuItem>
              ))}
            </Select>
            {!!formik?.errors?.expiration && (
              <FormHelperText>{formik?.errors?.expiration}</FormHelperText>
            )}
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 2 }}>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" variant="contained" onClick={formik.handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiTokenModal;
