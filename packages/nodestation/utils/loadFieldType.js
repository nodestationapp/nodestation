let fieldTypes = {};

const addFieldTypes = (values) => {
  fieldTypes = { ...fieldTypes, ...values };
};

const getFieldTypes = () => fieldTypes;

export { addFieldTypes, getFieldTypes };
