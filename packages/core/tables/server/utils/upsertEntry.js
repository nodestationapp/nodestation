import { knex } from "@nstation/db";
import { fs } from "@nstation/utils";

function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}

const upsertEntry = async ({ id, body, entry_id, extraFields = [] }) =>
  new Promise(async (resolve, reject) => {
    for (const key in body) {
      if (body[key] === "null" || body[key] === "") {
        body[key] = null;
      }
    }

    const schema = fs.getSchema(id);
    let schemaFields = schema?.fields;

    schemaFields = [...schemaFields, ...extraFields];

    try {
      let formatted_body = schemaFields.reduce((acc, curr) => {
        let value = body?.[curr.slug];

        if (curr?.type === "json") {
          value = JSON.stringify(value);
        }

        acc[curr.slug] = value;
        return acc;
      }, {});

      const data = removeUndefinedProperties(formatted_body);

      if (entry_id) {
        await knex(schema.tableName).where({ id: entry_id }).update(data);
      } else {
        delete data?.id;
        await knex(schema.tableName).insert(data);
      }

      resolve(true);
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });

export default upsertEntry;
