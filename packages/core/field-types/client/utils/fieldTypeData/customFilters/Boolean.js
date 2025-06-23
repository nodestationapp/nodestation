import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { getGridSingleSelectOperators } from "@mui/x-data-grid";

const booleanOptions = [
  { value: 1, label: "True" },
  { value: 0, label: "False" },
];

const BooleanFilter = () => {
  return getGridSingleSelectOperators().map((op) => ({
    ...op,
    InputComponent: (props) => (
      <FormControl variant="outlined" size="small">
        <InputLabel id="table-filter-value">Value</InputLabel>
        <Select
          label="Value"
          labelId="table-filter-value"
          placeholder="Select Value"
          onChange={(e) =>
            props.applyValue({ ...props.item, value: e.target.value })
          }
          value={props.item?.value}
        >
          {booleanOptions?.map((item) => (
            <MenuItem value={item?.value}>{item?.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
  }));
};

export default BooleanFilter;
