// import Pill from "components/Pill";
// import FormikUsers from "components/formik/FormikUsers";
// import FormikInput from "components/formik/FormikInput";
// import FormikSelect from "components/formik/FormikSelect";
// import FormikDateTime from "components/formik/FormikDateTime";
// import FormikTextarea from "components/formik/FormikTextarea";
// import FormikJsonInput from "components/formik/FormikJsonInput";
// import FormikPhotoInput from "components/formik/FormikPhotoInput";
// import FormikRefEntryTable from "components/formik/FormikRefEntryTable";
import { useFormikContext } from "formik";
import { FormControl, FormLabel, TextField } from "@mui/material";

const tableInputRender = (item, display_name, formik) => {
  console.log("s", formik);

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
    // case "text":
    //   switch (item?.variant) {
    //     case "long":
    //       return <FormikTextarea name={item?.slug} label={item?.name} />;
    //     default:
    //       return (
    //         <FormControl fullWidth>
    //           <FormLabel htmlFor="email">{item?.name}</FormLabel>
    //           <TextField
    //             value={formik.values[item?.slug]}
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //             id={item?.slug}
    //             type={item?.type === "password" ? "password" : "text"}
    //             name={item?.slug}
    //           />
    //         </FormControl>
    //       );
    //   }
    // case "boolean":
    // case "select":
    //   return (
    //     <FormikSelect
    //       multi={item?.multi}
    //       required={item?.required}
    //       name={item?.slug}
    //       label={item?.name}
    //       options={select_data}
    //       CustomValue={({ label, color }) => (
    //         <Pill
    //           label={label}
    //           color={color || "#5A5A5A"}
    //           textColor="#F0F1F3"
    //           size="small"
    //           readOnly
    //         />
    //       )}
    //     />
    //   );
    // case "json":
    //   return <FormikJsonInput label={item?.name} name={item?.slug} />;
    // case "user":
    //   return <FormikUsers label={item?.name} name={item?.slug} />;
    // case "media":
    //   return (
    //     <FormikPhotoInput
    //       variant="light"
    //       name={item?.slug}
    //       label={item?.name}
    //       required={item?.required}
    //     />
    //   );
    // case "date":
    //   return (
    //     <FormikDateTime
    //       name={item?.slug}
    //       label={item?.name}
    //       variant="light"
    //       type="datetime-local"
    //       disabled={!!item?.read_only}
    //     />
    //   );
    default:
      return (
        <TextField
          label={item?.name}
          variant="outlined"
          fullWidth
          value={formik.values[item?.slug]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id={item?.slug}
          type={item?.type === "password" ? "password" : "text"}
          name={item?.slug}
        />
      );
    // return item?.relation ? (
    //   <FormikRefEntryTable
    //     name={item?.slug}
    //     label={item?.name}
    //     table={item?.relation}
    //   />
    // ) : (
    //   <FormikInput
    //     name={item?.slug}
    //     label={item?.name}
    //     variant="light"
    //     required={!!item?.required}
    //     type={item?.type === "password" ? "password" : "text"}
    //     disabled={!!item?.read_only}
    //   />
    // );
  }
};

export default tableInputRender;
