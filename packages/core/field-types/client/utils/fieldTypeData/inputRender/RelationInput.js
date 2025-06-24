import { useEffect, useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { api } from "@nstation/design-system/utils";

const RelationInput = ({ data, formik, size }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(null);

  const value = formik.values[data?.slug]?.id || formik.values[data?.slug];

  useEffect(() => {
    if (!!!value) return;

    (async () => {
      const { entries } = await api.get(
        `/admin-api/tables/${data?.relation?.table}?filters=id:equals:${value}`
      );

      console.log(entries[0]);

      setInputValue({
        id: entries[0]?.id,
        [data?.relation?.displayName]:
          entries[0]?.[data?.relation?.displayName],
      });
    })();
  }, []);

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

  const onChange = (_, newValue) => {
    const value = {
      id: newValue?.id,
      [data?.relation?.displayName]: newValue?.[data?.relation?.displayName],
    };

    setInputValue(value);
    formik?.setFieldValue(data?.slug, value?.id);
  };

  console.log(data);

  return (
    <Autocomplete
      open={open}
      options={options}
      loading={loading}
      onOpen={handleOpen}
      onClose={handleClose}
      value={inputValue}
      getOptionLabel={(option) => option?.[data?.relation?.displayName]}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Value"
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
