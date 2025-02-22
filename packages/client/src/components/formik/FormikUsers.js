import { useState } from "react";
import { useField } from "formik";
import queryString from "query-string";

import AsyncSelect from "components/form/AsyncSelect";

import api from "libs/api";

const FormikUsers = ({ type, name, ...rest }) => {
  const [users, setUsers] = useState([]);

  const fetchData = async (value) => {
    try {
      const data = await api.get(
        `/auth?${queryString.stringify({
          first_name: value,
        })}`
      );

      setUsers(data);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const [field, meta] = useField({ name, type });

  const value = {
    id: field?.value?.id,
    label: !!field?.value?.first_name
      ? `${field?.value?.first_name} ${field?.value?.last_name}`
      : field?.value?.label,
    photo: field?.value?.photo?.url
      ? field?.value?.photo?.url
      : field?.value?.photo,
  };

  const options = users
    ?.map((item) => ({
      id: item?.id,
      label: `${item?.first_name} ${item?.last_name}`,
      photo: item?.photo?.url,
    }))
    ?.filter((item) => item?.id !== field?.value?.id);

  return (
    <AsyncSelect
      {...rest}
      {...field}
      {...meta}
      value={value}
      options={options}
      getData={fetchData}
    />
  );
};

export default FormikUsers;
