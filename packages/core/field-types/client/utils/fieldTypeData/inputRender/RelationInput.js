import { useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { api } from "@nstation/design-system/utils";

const RelationInput = ({ data, formik, size }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = formik.values[data?.slug];

  const handleOpen = async () => {
    setOpen(true);

    setLoading(true);
    const { entries } = await api.get(
      `/admin-api/tables/${data?.relation?.table}?page=0&pageSize=1000`
    );
    setLoading(false);

    setOptions([...entries]);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const onChange = (_, newValue) => {
    if (data?.variant !== "multi") {
      if (newValue?.length > 1) {
        newValue = [newValue?.[newValue?.length - 1]];
      }
    }

    formik.setFieldValue(data?.slug, newValue || []);
  };

  return (
    <Autocomplete
      open={open}
      multiple={true}
      options={options}
      loading={loading}
      onOpen={handleOpen}
      onClose={handleClose}
      // value={inputValue}
      value={value || []}
      getOptionLabel={(option) => option?.name}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={data?.name}
          name={data?.slug}
          variant={size === "small" ? "outlined" : "standard"}
          sx={{ whiteSpace: "nowrap", height: "100%" }}
          InputLabelProps={
            size === "small"
              ? {
                  shrink: true,
                }
              : null
          }
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default RelationInput;
