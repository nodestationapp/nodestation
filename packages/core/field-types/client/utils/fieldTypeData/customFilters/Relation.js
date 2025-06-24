import { getGridSingleSelectOperators } from "@mui/x-data-grid";

import RelationInput from "../inputRender/RelationInput.js";

const RelationFilter = (column) => {
  return getGridSingleSelectOperators().map((op) => ({
    ...op,
    InputComponent: (props) => (
      <RelationInput
        data={column}
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

export default RelationFilter;
