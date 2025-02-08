import Pill from "components/Pill";
import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";
import FormikDateTime from "components/formik/FormikDateTime";
import FormikTextarea from "components/formik/FormikTextarea";
import FormikPhotoInput from "components/formik/FormikPhotoInput";

const tableInputRender = (item) => {
  let select_data = null;

  if (item?.type === "select") {
    select_data = item?.options?.map((item) => ({
      label: item?.label,
      value: item?.label,
      color: item?.color,
    }));
  }

  if (item?.type === "boolean") {
    select_data = [
      {
        label: "NULL",
        value: "",
      },
      {
        label: "TRUE",
        value: 1,
      },
      {
        label: "FALSE",
        value: 0,
      },
    ];
  }

  switch (item?.type) {
    case "long_text":
      return <FormikTextarea name={item?.slug} label={item?.name} />;
    case "boolean":
    case "select":
      return (
        <FormikSelect
          multi={item?.multi}
          required={item?.required}
          name={item?.slug}
          label={item?.name}
          options={select_data}
          CustomValue={({ label, color }) => (
            <Pill label={label} color={color} textColor="#F0F1F3" readOnly />
          )}
        />
      );
    case "media":
      return (
        <FormikPhotoInput
          variant="light"
          name={item?.slug}
          label={item?.name}
          required={item?.required}
        />
      );
    case "date":
      return (
        <FormikDateTime
          name={item?.slug}
          label={item?.name}
          variant="light"
          type="datetime-local"
          disabled={!!item?.read_only}
        />
      );
    default:
      return (
        <FormikInput
          name={item?.slug}
          label={item?.name}
          variant="light"
          required={!!item?.required}
          type={item?.type === "password" ? "password" : "text"}
          disabled={!!item?.read_only}
        />
      );
  }
};

export default tableInputRender;
