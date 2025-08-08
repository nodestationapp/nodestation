import knex from "../knex.js";

const relationFieldPopulate = async (fields, objects, settings) => {
  for await (const field of fields) {
    if (field?.type === "relation") {
      for await (const object of objects) {
        let value = object?.[field?.slug];

        if (value) {
          value = value?.toString()?.split(",");
          let formatted_data = [];

          for await (const relation of value) {
            const relation_entry = await knex(field?.relation?.table)
              .where({
                id: relation,
              })
              .first();

            formatted_data.push(relation_entry);
          }

          object[field?.slug] = formatted_data;
        }
      }
    }
  }

  return objects;
};

export default relationFieldPopulate;
