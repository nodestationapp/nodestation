const validate =
  ({ schema, getValidationSchema }) =>
  async (req, res, next) => {
    try {
      const currentSchema = schema || getValidationSchema(req);

      const body = {
        ...Object.assign({}, req.body),
        ...req?.files?.reduce((acc, item) => {
          acc[item?.fieldname] = item;
          return acc;
        }, {}),
      };
      const data = { body, params: req?.params, query: req?.query };

      await currentSchema.validate(data, { abortEarly: false });

      return next();
    } catch (err) {
      const validateErrors = err?.inner?.reduce((acc, curr) => {
        const key = curr?.path?.split(".")?.[1];

        acc[key] = curr?.errors?.[0];
        return acc;
      }, {});

      return res.status(500).json({ errors: validateErrors });
    }
  };

export default validate;
