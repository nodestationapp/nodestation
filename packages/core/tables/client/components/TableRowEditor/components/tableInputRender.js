import { clientFieldTypes } from "@nstation/field-types";

const tableInputRender = (data, formik) => {
  const fieldTypes = clientFieldTypes();

  const InputRender = fieldTypes?.find(
    (item) => data?.type === item?.key || "text"
  )?.inputRender;

  if (!!InputRender) {
    return <InputRender data={data} formik={formik} />;
  } else {
    return null;
  }
};

export default tableInputRender;
