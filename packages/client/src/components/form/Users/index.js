import queryString from "query-string";
import { useEffect, useState } from "react";

import AsyncSelect from "components/form/AsyncSelect";

import api from "libs/api";

const UsersInput = ({
  value,
  name,
  label,
  onChange,
  size,
  noArrow,
  variant,
}) => {
  const [users, setUsers] = useState([]);
  const [selectValue, setSelectValue] = useState(null);

  useEffect(() => {
    (async function () {
      if (!!!value) return;

      if (value?.id) {
        setSelectValue(value);
      } else {
        const data = await fetchData(undefined, value);
        setSelectValue(data?.entries?.[0]);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const fetchData = async (value, id) => {
    try {
      const data = await api.get(
        `/tables/auth?${queryString.stringify({
          id,
          first_name: value,
        })}`
      );

      setUsers(data?.entries);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const current_value = {
    id: selectValue?.id,
    label: !!selectValue?.first_name
      ? `${selectValue?.first_name} ${selectValue?.last_name}`
      : selectValue?.label,
    photo: selectValue?.photo?.url
      ? selectValue?.photo?.url
      : selectValue?.photo,
  };

  const options = users
    ?.map((item) => ({
      id: item?.id,
      label: `${item?.first_name} ${item?.last_name}`,
      photo: item?.photo?.url,
    }))
    ?.filter((item) => item?.id !== selectValue?.id);

  return (
    <AsyncSelect
      variant={variant}
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
      placeholder="Select"
    />
  );
};

export default UsersInput;
