import moment from "moment";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/index.js";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment/index.js";

import UserInput from "./UserInput.js";
import JsonInput from "./JsonInput.js";
import MediaInput from "./MediaInput.js";
import BooleanInput from "./BooleanInput.js";
import RelationInput from "./RelationInput.js";

const tableInputRender = (item, formik) => {
  if (!!item?.relation) {
    return (
      <RelationInput
        label={item?.name}
        slug={item?.slug}
        relation={item?.relation}
        value={formik.values[item?.slug]}
        onChange={formik.setFieldValue}
      />
    );
  }

  switch (item?.type) {
    case "list":
      return (
        <FormControl fullWidth>
          <InputLabel id={item?.slug}>{item?.name}</InputLabel>
          <Select
            fullWidth
            label={item?.name}
            size="medium"
            variant="outlined"
            name={item?.slug}
            labelId={item?.slug}
            onChange={formik.handleChange}
            value={formik.values[item?.slug]}
          >
            {item?.options?.map((item) => (
              <MenuItem value={item?.value}>{item?.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case "boolean":
      return (
        <BooleanInput
          label={item?.name}
          slug={item?.slug}
          value={formik.values[item?.slug]}
          onChange={formik.handleChange}
        />
      );
    case "user":
      return (
        <UserInput
          slug={item?.slug}
          label={item?.name}
          value={formik.values[item?.slug]}
          onChange={formik.setFieldValue}
        />
      );
    case "select":
      return (
        <Autocomplete
          fullWidth
          multiple={item?.variant === "multi"}
          options={item?.options}
          filterSelectedOptions={true}
          isOptionEqualToValue={(option, value) => option.value === value}
          value={
            !!formik.values[item?.slug]
              ? formik.values[item?.slug]?.toString()?.split(",")
              : []
          }
          onChange={(_, newValue) => {
            let value = newValue?.value;
            if (Array.isArray(newValue)) {
              newValue = newValue?.map((item) =>
                typeof item === "object" ? item?.value : item
              );

              value = newValue?.join(",");
            }

            formik.setFieldValue(item?.slug, value || null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={item?.name}
              variant="standard"
              size="medium"
              required={item?.required}
              error={!!formik?.errors?.[item?.slug]}
              helperText={formik?.errors?.[item?.slug]}
            />
          )}
          renderValue={(tagValue, getTagProps) => {
            if (!!!formik.values[item?.slug]) return undefined;

            return tagValue.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  {...tagProps}
                  color={
                    item?.options?.find(
                      (item) => item?.value?.toString() === option?.toString()
                    )?.color
                  }
                  label={option}
                />
              );
            });
          }}
        />
      );
    case "date":
      return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormControl fullWidth>
            <DatePicker
              label={item?.name}
              format="DD/MM/YYYY"
              value={
                !!formik.values[item?.slug]
                  ? moment.unix(formik.values[item?.slug])
                  : null
              }
              onChange={(newDate) => {
                formik.setFieldValue(item?.slug, moment(newDate).unix());
              }}
              slotProps={{
                nextIconButton: { size: "small" },
                previousIconButton: { size: "small" },
                field: {
                  variant: "standard",
                },
                openPickerButton: {
                  size: "micro",
                },
              }}
            />
          </FormControl>
        </LocalizationProvider>
      );
    case "json":
      return (
        <JsonInput
          label={item?.name}
          name={item?.slug}
          defaultValue={item?.default}
          value={formik.values[item?.slug]}
          onChange={formik.handleChange}
        />
      );
    case "media":
      return (
        <MediaInput
          label={item?.name}
          value={formik.values[item?.slug]}
          onChange={(value) => {
            formik.setFieldValue(item?.slug, value);
          }}
        />
      );
    default:
      return (
        <TextField
          fullWidth
          name={item?.slug}
          label={item?.name}
          variant="standard"
          required={item?.required}
          onBlur={formik.handleBlur}
          disabled={!!item?.read_only}
          onChange={formik.handleChange}
          value={formik.values[item?.slug]}
          error={!!formik?.errors?.[item?.slug]}
          helperText={formik?.errors?.[item?.slug]}
          type={item?.type === "password" ? "password" : "text"}
        />
      );
    // return item?.relation ? (
    //   <FormikRefEntryTable
    //     name={item?.slug}
    //     label={item?.name}
    //     table={item?.relation}
    //   />
  }
};

export default tableInputRender;
