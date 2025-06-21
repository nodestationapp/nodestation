import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SelectInput = ({ data, formik }) => {
  return (
    <Autocomplete
      fullWidth
      multiple={data?.variant === "multi"}
      options={data?.options}
      filterSelectedOptions={true}
      isOptionEqualToValue={(option, value) => option.value === value}
      value={
        !!formik.values[data?.slug]
          ? formik.values[data?.slug]?.toString()?.split(",")
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
        formik.setFieldValue(data?.slug, value || null);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={data?.name}
          variant="standard"
          size="medium"
          required={data?.required}
          error={!!formik?.errors?.[data?.slug]}
          helperText={formik?.errors?.[data?.slug]}
        />
      )}
      renderValue={(tagValue, getTagProps) => {
        if (!!!formik.values[data?.slug]) return undefined;
        return tagValue.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              {...tagProps}
              color={
                data?.options?.find(
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
};

export default SelectInput;
