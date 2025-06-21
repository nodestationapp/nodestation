import { useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { api } from "@nstation/design-system/utils";

import UserProfile from "@nstation/tables/client/components/MuiTable/components/UserProfile/index.js";

const UserInput = ({ data, formik }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);

    setLoading(true);
    const { entries } = await api.get(
      "/admin-api/tables/nodestation_users?page=0"
    );
    setLoading(false);

    setOptions([...entries]);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const value = formik.values[data?.slug];

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
          size={30}
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
        formik?.setFieldValue(data?.slug, {
          id: newValue?.id,
          first_name: newValue?.first_name,
          last_name: newValue?.last_name,
          photo: newValue?.photo,
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={data?.name}
          name={data?.slug}
          variant="standard"
          size="medium"
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
          size={30}
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
