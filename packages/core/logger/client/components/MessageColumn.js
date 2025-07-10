import { useSlot } from "@nstation/client/src/contexts/slots.js";

const MessageColumn = ({ data }) => {
  const columnTypes = useSlot("logger.table.types");

  const columnType = columnTypes
    .flatMap((type) => type)
    ?.find((type) => type.type === data?.source);

  return columnType?.Component ? <columnType.Component data={data} /> : "-";
};

export default MessageColumn;
