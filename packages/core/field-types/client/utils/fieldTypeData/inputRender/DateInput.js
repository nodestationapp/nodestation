import moment from "moment";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/index.js";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment/index.js";

const DateInput = ({ data, formik }) => {
  const value = formik.values[data?.slug];

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FormControl fullWidth>
        <DatePicker
          label={data?.name}
          format="DD/MM/YYYY"
          value={!!value ? moment.unix(value) : null}
          onChange={(newDate) => {
            formik.setFieldValue(data?.slug, moment(newDate).unix());
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
};

export default DateInput;
