import { useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { api } from "@nstation/design-system/utils";

const RelationInput = ({ data, formik, relation }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);

    setLoading(true);
    const { entries } = await api.get(
      `/admin-api/tables/${data?.relation?.table}?page=0`
    );
    setLoading(false);

    setOptions([...entries]);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  return (
    <Autocomplete
      fullWidth
      open={open}
      options={options}
      loading={loading}
      onOpen={handleOpen}
      onClose={handleClose}
      value={formik.values[data?.slug] || null}
      getOptionLabel={(option) => option?.[data?.relation?.displayName]}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => {
        formik.setFieldValue(data?.slug, {
          id: newValue?.id,
          [data?.relation?.displayName]:
            newValue?.[data?.relation?.displayName],
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={data?.name}
          name={data?.slug}
          variant="standard"
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
