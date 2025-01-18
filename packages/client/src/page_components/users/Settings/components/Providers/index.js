import "./styles.scss";

import Table from "components/Table";

import { EnvelopeIcon } from "@heroicons/react/24/outline";

const mainClass = "authentication__providers";

const providers_data = [
  {
    label: "Email/Password",
    status: "active",
  },
];

const Providers = () => {
  const fields = [
    {
      key: "name",
      value: "Name",
    },
    {
      key: "status",
      value: "Status",
      align: "right",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: providers_data?.map((item) => ({
      data: [
        {
          key: "name",
          value: (
            <>
              <EnvelopeIcon height={18} width={18} />
              {item?.label}
            </>
          ),
        },
        {
          key: "status",
          type: "status",
          value: item?.status,
          align: "right",
        },
      ],
    })),
  };

  return (
    <>
      <div className={mainClass}>
        <div className={`${mainClass}__items`}>
          <Table data={table_data} hide_header={true} />
        </div>
      </div>
    </>
  );
};

export default Providers;
