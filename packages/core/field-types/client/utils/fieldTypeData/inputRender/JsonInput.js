import ReactJsonViewRaw from "@microlink/react-json-view";
const ReactJsonView = ReactJsonViewRaw.default;

const JsonInput = ({ data, formik }) => {
  const value = formik.values[data?.slug];

  return (
    <ReactJsonView
      src={value || {}}
      name={data?.name}
      theme="ocean"
      onAdd={(e) => formik?.setFieldValue(data?.slug, e?.updated_src)}
      onEdit={(e) => formik?.setFieldValue(data?.slug, e?.updated_src)}
      onDelete={(e) => formik?.setFieldValue(data?.slug, e?.updated_src)}
      enableClipboard={false}
      displayDataTypes={false}
      shouldCollapse={({ src }) => {
        return typeof src === "object" && Object.keys(src).length > 6;
      }}
    />
  );
};

export default JsonInput;
