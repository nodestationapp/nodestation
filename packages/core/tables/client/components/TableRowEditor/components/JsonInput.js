import ReactJsonViewRaw from "@microlink/react-json-view";
const ReactJsonView = ReactJsonViewRaw.default;

const JsonInput = ({ label, name, value, onChange }) => {
  return (
    <ReactJsonView
      src={value || {}}
      name={label}
      theme="ocean"
      onEdit={(e) => onChange({ target: { name, value: e?.updated_src } })}
      onAdd={(e) => onChange({ target: { name, value: e?.updated_src } })}
      onDelete={(e) => onChange({ target: { name, value: e?.updated_src } })}
      enableClipboard={false}
      displayDataTypes={false}
      shouldCollapse={({ src }) => {
        return typeof src === "object" && Object.keys(src).length > 6;
      }}
    />
  );
};

export default JsonInput;
