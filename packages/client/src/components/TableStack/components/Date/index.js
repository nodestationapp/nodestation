import moment from "moment";

const mainClass = "table__date";

const Date = ({ data }) => {
  return (
    <div className={mainClass}>
      <span>{!!data ? moment(data)?.format("DD MMM YYYY, hh:mm A") : "-"}</span>
    </div>
  );
};

export default Date;
