import "./styles.scss";
import Pill from "components/Pill";

const mainClass = "status-chip";

const StatusChip = ({ field, status, tableSchema }) => {
  const schemaOptions = tableSchema?.find(
    (item) => item?.slug === field
  )?.options;

  const selectedStatus = status?.split(",");

  return (
    <div className={mainClass}>
      {selectedStatus?.map((item, index) => {
        const selectedOption = schemaOptions?.find(
          (element) => element?.label === item
        );

        return (
          <Pill
            key={index}
            label={selectedOption?.label}
            color={selectedOption?.color}
            textColor="#F0F1F3"
          />
        );
      })}
    </div>
  );
};

export default StatusChip;
