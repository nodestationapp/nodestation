import "./styles.scss";
import Pill from "components/Pill";

const mainClass = "status-chip";

const StatusChip = ({ field, status, columns }) => {
  const schemaOptions = columns?.find((item) => item?.slug === field);

  let values =
    schemaOptions?.variant === "status"
      ? [status?.properties?.status]
      : status?.split(",");

  return (
    <div className={mainClass}>
      {values?.map((item, index) => {
        const selectedOption = schemaOptions?.options?.find(
          (element) => element?.value === item
        );

        return (
          <Pill
            key={index}
            label={selectedOption?.label}
            color={selectedOption?.color}
            textColor={
              schemaOptions?.variant === "status"
                ? selectedOption?.color
                : "#F0F1F3"
            }
            variant={schemaOptions?.variant}
          />
        );
      })}
    </div>
  );
};

export default StatusChip;
