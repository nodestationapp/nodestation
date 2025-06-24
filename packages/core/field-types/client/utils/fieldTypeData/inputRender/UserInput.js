import { useEffect, useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { api } from "@nstation/design-system/utils";

import UserProfile from "@nstation/tables/client/components/MuiTable/components/UserProfile/index.js";

const UserInput = ({ data, formik, size = "medium", filterMode = false }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(null);

  const value = formik.values[data?.slug]?.id || formik.values[data?.slug];

  useEffect(() => {
    if (!!!value) return;

    (async () => {
      const { entries } = await api.get(
        `/admin-api/tables/nodestation_users?filters=id:equals:${value}`
      );

      setInputValue({
        id: entries[0]?.id,
        first_name: entries[0]?.first_name,
        last_name: entries[0]?.last_name,
        photo: entries[0]?.photo,
      });
    })();
  }, []);

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

  const onChange = (_, newValue) => {
    const value = {
      id: newValue?.id,
      first_name: newValue?.first_name,
      last_name: newValue?.last_name,
      photo: newValue?.photo,
    };

    setInputValue(value);
    formik?.setFieldValue(data?.slug, value?.id);
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
          size={30}
          data={{
            id: option?.id,
            first_name: option?.first_name,
            last_name: option?.last_name,
            photo: option?.photo,
          }}
        />
      )}
      value={inputValue}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={data?.name}
          name={data?.slug}
          variant="standard"
          size={size}
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
