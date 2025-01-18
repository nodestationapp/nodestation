import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PlaceholderPage from "components/PlaceholderPage";

import api from "libs/api";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const VerifyContent = () => {
  const [email_confirmed, setEmailConfirmed] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();

  const query = new URLSearchParams(search);

  useEffect(() => {
    const token = query.get("token");
    (async () => {
      try {
        await api.post(`/auth/activation`, {
          token,
        });
        setEmailConfirmed(true);
      } catch (err) {
        navigate("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (!!!email_confirmed) return null;

  return (
    <PlaceholderPage
      icon={<CheckCircleIcon />}
      header="Email address has been verified successfully!"
      sub_header="You can now access your account."
      action={{
        label: "Go to login page",
        href: "/login",
      }}
    />
  );
};

export default VerifyContent;
