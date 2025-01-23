import FormikInput from "components/formik/FormikInput";
import FormikSelect from "components/formik/FormikSelect";
import FormikDateTime from "components/formik/FormikDateTime";
import FormikTextarea from "components/formik/FormikTextarea";
import FormikPhotoInput from "components/formik/FormikPhotoInput";

const tableInputRender = (item) => {
  let select_data = null;

  if (item?.type === "enumeration") {
    const options = item?.options?.split("\n");

    select_data = options?.map((item) => ({
      label: item,
      value: item,
    }));
  }

  if (item?.type === "boolean") {
    select_data = [
      {
        label: "NULL",
        value: null,
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
    case "enumeration":
      return (
        <FormikSelect
          name={item?.slug}
          label={item?.name}
          options={select_data}
        />
      );
    case "media":
      return (
        <FormikPhotoInput
          variant="light"
          name={item?.slug}
          label={item?.name}
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
          type={item?.type === "password" ? "password" : "text"}
          disabled={!!item?.read_only}
        />
      );
  }
};

export default tableInputRender;
