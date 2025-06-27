import { useNavigate, useLocation } from "react-router-dom";

export default function useUpdateQueryParam() {
  const navigate = useNavigate();
  const location = useLocation();

  const updateQueryParam = (key, value) => {
    const params = new URLSearchParams(location.search);

    if (value === undefined || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return updateQueryParam;
}
