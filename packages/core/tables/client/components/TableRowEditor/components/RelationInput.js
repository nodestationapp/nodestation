import { useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { api } from "@nstation/design-system/utils";

const RelationInput = ({ label, slug, value, onChange, relation }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);

    setLoading(true);
    const data = await api.get(`/admin-api/tables/${relation?.table}?page=0`);
    setLoading(false);

    setOptions([...data?.entries]);
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
      value={value?.id ? value : null}
      getOptionLabel={(option) => option?.[relation?.displayName]}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => {
        onChange(slug, {
          id: newValue?.id,
          [relation?.displayName]: newValue?.[relation?.displayName],
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={slug}
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
