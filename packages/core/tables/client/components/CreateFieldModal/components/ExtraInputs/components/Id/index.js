import { useState } from "react";
import { useFormikContext } from "formik";
import { useQuery } from "@tanstack/react-query";

import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";

import { api } from "@nstation/design-system/utils";

const variant_options = [
  {
    label: "generate_id()",
    value: "generate_id()",
  },
];

const Id = ({ locked }) => {
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();

  const [open, setOpen] = useState(false);

  const { data: tables, isLoading: tablesLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: () => api.get("/tables"),
    enabled: !!open,
  });

  const selectedTable = tables?.find(
    (table) => table.tableName === values?.relation
  );

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="default-select-label">Default</InputLabel>
        <Select
          key={values?.default}
          name="default"
          label="Default"
          disabled={locked}
          variant="outlined"
          labelId="default-select-label"
          value={values.default}
          onChange={(e) => setFieldValue("default", e.target.value)}
          onBlur={handleBlur}
          error={errors.default}
          helperText={errors.default}
        >
          {variant_options?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        fullWidth
        open={open}
        options={tables}
        loading={tablesLoading}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={selectedTable}
        isOptionEqualToValue={(option, value) =>
          option.tableName === value.name
        }
        getOptionLabel={(option) => option.name}
        onChange={(_, newValue) => {
          setFieldValue("relation", newValue?.tableName);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Relation"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {tablesLoading ? (
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
      <FormControlLabel
        name="required"
        label="Required"
        control={<Switch checked={values?.required} disabled={locked} />}
        onChange={(e) => setFieldValue("required", e.target.checked)}
      />
    </>
  );
};

export default Id;
