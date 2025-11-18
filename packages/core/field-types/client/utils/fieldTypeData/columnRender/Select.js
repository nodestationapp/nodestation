import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ColorfulChip from "../components/ColorfulChip.js";

const Select = ({ data, column }) => {
  const colors = column?.options?.reduce((acc, item) => {
    acc[item?.value] = item?.color;
    return acc;
  }, {});

  const values = data?.toString()?.split(",");

  if (!!!values) return "-";

  return (
    <Stack direction="row" spacing={0.5} alignItems="center" height="100%">
      {values?.map((value) => {
        const label = column?.options?.find(
          (item) => item?.value?.toString() === value?.toString()
        )?.label;

        return value === "superadmin" ? (
          <ColorfulChip
            label={label || value}
            color={colors[value]}
            size="small"
          />
        ) : (
          <Chip label={label || value} color={colors[value]} size="small" />
        );
      })}
    </Stack>
  );
};

export default Select;
