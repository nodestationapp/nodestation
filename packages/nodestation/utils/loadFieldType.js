let fieldTypes = {};

// const loadfieldType = async (router, routes, type) => {};

const addFieldTypes = (values) => {
  fieldTypes = { ...fieldTypes, ...values };
};

const getFieldTypes = () => fieldTypes;

export { addFieldTypes, getFieldTypes };
