import queryString from "query-string";
import { useEffect, useState } from "react";

import AsyncSelect from "components/form/AsyncSelect";

import api from "libs/api";
import { useLocation } from "react-router-dom";
import { useTable } from "context/client/table";

const RefTable = ({ value, name, label, onChange, size, noArrow }) => {
  const { id } = useTable();

  const [tables, setTables] = useState([]);
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
      const data = await api.get(`/tables/${id}`);

      if (!!!id) {
        setTables(data);
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

  const options = tables
    ?.map((item) => ({
      id: item?.id,
      label: item?.name,
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

export default RefTable;
