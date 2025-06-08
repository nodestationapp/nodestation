import { useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { api } from "@nstation/design-system/utils";

import UserProfile from "../../MuiTable/components/UserProfile/index.js";

const UserInput = ({ label, slug, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);

    setLoading(true);
    const { entries } = await api.get("/tables/nodestation_users?page=0");
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
      getOptionLabel={(option) => (
        <UserProfile
          data={{
            id: option?.id,
            first_name: option?.first_name,
            last_name: option?.last_name,
            photo: option?.photo,
          }}
        />
      )}
      value={value?.id ? value : null}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => {
        onChange(slug, {
          id: newValue?.id,
          first_name: newValue?.first_name,
          last_name: newValue?.last_name,
          photo: newValue?.photo,
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
      renderValue={(tagValue) => (
        <UserProfile
          data={{
            id: tagValue?.id,
            first_name: tagValue?.first_name,
            last_name: tagValue?.last_name,
            photo: tagValue?.photo,
          }}
        />
      )}
    />
  );
};

export default UserInput;
