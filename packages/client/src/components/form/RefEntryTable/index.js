import { useEffect, useState } from "react";

import AsyncSelect from "components/form/AsyncSelect";

import api from "libs/api";
import { useTable } from "context/client/table";
import { useOrganization } from "context/organization";

const RefEntryTable = ({
  value,
  name,
  label,
  onChange,
  size,
  noArrow,
  table,
}) => {
  const { id } = useTable();
  const { tables } = useOrganization();

  const [entries, setEntries] = useState([]);
  const [selectValue, setSelectValue] = useState(null);

  useEffect(() => {
    (async function () {
      if (!!!value) return;

      if (value?.id) {
        setSelectValue(value);
      } else {
        const data = await fetchData(value);
        setSelectValue({
          id: data?.id,
          label: data?.name,
        });
      }
    })();
    // eslint-disable-next-line
  }, []);

  const fetchData = async (id) => {
    try {
      const data = await api.get(`/tables/${table}`);

      if (!!!id) {
        setEntries(data?.entries);
      }

      return data?.table;
    } catch (err) {
      console.error(err);
    }
  };

  const current_value = {
    id: selectValue?.id,
    label: selectValue?.label,
  };

  const display_name = tables?.find((item) => item?.id === table)?.display_name;

  const options = entries
    ?.map((item) => ({
      id: item?.id,
      label: item?.[display_name],
    }))
    ?.filter((item) => item?.id !== selectValue?.id && item?.id !== id);

  return (
    <AsyncSelect
      name={name}
      label={label}
      value={current_value}
      options={options}
      size={size}
      getData={fetchData}
      noArrow={noArrow}
      onChange={(value) => {
        setSelectValue(value);
        onChange({ target: { name, value: value?.id || null } });
      }}
      placeholder="Type a value"
    />
  );
};

export default RefEntryTable;
