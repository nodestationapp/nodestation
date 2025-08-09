const mainClass = "table__wysiwyg";

const Wysiwyg = ({ data }) => {
  return (
    <div className={mainClass}>
      <span>{data?.html}</span>
    </div>
  );
};

export default Wysiwyg;
