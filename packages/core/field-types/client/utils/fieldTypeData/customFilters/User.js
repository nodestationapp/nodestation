import { getGridSingleSelectOperators } from "@mui/x-data-grid";

import UserInput from "../inputRender/UserInput.js";

const UserFilter = (column) => {
  return getGridSingleSelectOperators().map((op) => ({
    ...op,
    InputComponent: (props) => (
      <UserInput
        filterMode
        formik={{
          values: {
            [column.slug]: props.item?.value,
          },
          setFieldValue: (_, value) =>
            props.applyValue({ ...props.item, value }),
        }}
        size="small"
      />
    ),
  }));
};

export default UserFilter;
