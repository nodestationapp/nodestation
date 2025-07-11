import { useEffect, useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { api } from "@nstation/design-system/utils";

import UserProfile from "@nstation/tables/client/components/MuiTable/components/UserProfile/index.js";

const UserInput = ({ data, formik, size = "medium" }) => {
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

    let options = [...entries];

    setOptions(options);
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
      open={open}
      options={options}
      loading={loading}
      onOpen={handleOpen}
      onClose={handleClose}
      sx={{ "& .MuiOutlinedInput-root": { pl: "14px !important" } }}
      getOptionLabel={(option) =>
        option !== "null" ? (
          <UserProfile
            size={30}
            data={{
              id: option?.id,
              first_name: option?.first_name,
              last_name: option?.last_name,
              photo: option?.photo,
            }}
          />
        ) : (
          "\u00A0"
        )
      }
      value={inputValue}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Value"
          name={data?.slug}
          size={size}
          InputLabelProps={
            size === "small"
              ? {
                  shrink: true,
                }
              : null
          }
          variant={size !== "small" ? "standard" : "outlined"}
          sx={{ whiteSpace: "nowrap" }}
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
      renderValue={
        size !== "small"
          ? (tagValue) => (
              <UserProfile
                size={30}
                data={{
                  id: tagValue?.id,
                  first_name: tagValue?.first_name,
                  last_name: tagValue?.last_name,
                  photo: tagValue?.photo,
                }}
              />
            )
          : (tagValue) => `${tagValue?.first_name} ${tagValue?.last_name}`
      }
    />
  );
};

export default UserInput;
