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

  const display_name = tables?.find((item) => item?.id === table)?.display_name;

  useEffect(() => {
    (async function () {
      if (!!!value) return;

      if (value?.id) {
        setSelectValue(value);
      } else {
        const data = await fetchData(undefined, value);
        setSelectValue({
          id: data?.id,
          label: data?.[display_name],
        });
      }
    })();
    // eslint-disable-next-line
  }, []);

  const fetchData = async (value, id) => {
    try {
      const data = await api.get(`/tables/${table}?${display_name}=${value}`);
      const entry_data = await api.get(`/tables/${table}?id=${id}`);

      if (!!!id) {
        setEntries(data?.entries);
      }

      return entry_data?.entries?.[0];
    } catch (err) {
      console.error(err);
    }
  };

  const current_value = {
    id: selectValue?.id,
    label: selectValue?.label,
  };

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
