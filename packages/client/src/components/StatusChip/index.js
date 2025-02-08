import "./styles.scss";
import Pill from "components/Pill";

const mainClass = "status-chip";

const StatusChip = ({ field, status, tableSchema }) => {
  const schemaOptions = tableSchema?.find(
    (item) => item?.slug === field
  )?.options;

  const selectedOption = schemaOptions?.find((item) => item?.label === status);

  return (
    <div className={mainClass}>
      <Pill
        label={selectedOption?.label}
        color={selectedOption?.color}
        textColor="#F0F1F3"
      />
    </div>
  );
};

export default StatusChip;
