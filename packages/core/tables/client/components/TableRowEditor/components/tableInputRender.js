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
import MediaInput from "./MediaInput.js";
import BooleanInput from "./BooleanInput.js";
// import JsonInput from "./JsonInput.js";

const tableInputRender = (item, formik, display_name) => {
  let select_data = null;

  if (item?.type === "select") {
    select_data = item?.options?.map((item) => ({
      label: item?.label,
      value: item?.label,
      color: item?.color,
    }));
  }

  if (item?.type === "boolean") {
    select_data = [
      {
        label: "NULL",
        value: "",
      },
      {
        label: "TRUE",
        value: 1,
      },
      {
        label: "FALSE",
        value: 0,
      },
    ];
  }

  switch (item?.type) {
    // case "text":
    //   switch (item?.variant) {
    //     case "long":
    //       return <FormikTextarea name={item?.slug} label={item?.name} />;
    //     default:
    //       return (
    //         <FormControl fullWidth>
    //           <FormLabel htmlFor="email">{item?.name}</FormLabel>
    //           <TextField
    //             value={formik.values[item?.slug]}
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //             id={item?.slug}
    //             type={item?.type === "password" ? "password" : "text"}
    //             name={item?.slug}
    //           />
    //         </FormControl>
    //       );
    //   }
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
          multiple={!item?.multi}
          options={item?.options}
          value={!!formik.values[item?.slug] ? [formik.values[item?.slug]] : []}
          onChange={(_, newValue) => {
            formik.setFieldValue(
              item?.slug,
              newValue?.[newValue?.length - 1]?.value
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={item?.name}
              required={item?.required}
              error={!!formik?.errors?.[item?.slug]}
              helperText={formik?.errors?.[item?.slug]}
            />
          )}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  {...tagProps}
                  color={
                    item?.options?.find((item) => item?.value === option)?.color
                  }
                  label={option}
                />
              );
            })
          }
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
                openPickerButton: {
                  size: "micro",
                },
              }}
            />
          </FormControl>
        </LocalizationProvider>
      );
    // case "json":
    //   return (
    //     <JsonInput
    //       label={item?.name}
    //       name={item?.slug}
    //       value={formik.values[item?.slug]}
    //       onChange={formik.handleChange}
    //     />
    //   );
    // case "user":
    //   return <FormikUsers label={item?.name} name={item?.slug} />;
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
    //   return (
    //     <FormikPhotoInput
    //       variant="light"
    //       name={item?.slug}
    //       label={item?.name}
    //       required={item?.required}
    //     />
    //   );
    default:
      return (
        <TextField
          fullWidth
          name={item?.slug}
          label={item?.name}
          variant="outlined"
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
