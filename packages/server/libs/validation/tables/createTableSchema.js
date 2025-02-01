import { object, string } from "yup";

let createTableSchema = object({
  body: object({
    name: string().required("Field is required"),
  }),
});

export default createTableSchema;
