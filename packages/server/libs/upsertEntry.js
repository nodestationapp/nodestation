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

function extractUploadPath(fullPath) {
  const uploadIndex = fullPath.indexOf("/uploads/");
  if (uploadIndex !== -1) {
    return fullPath.substring(uploadIndex);
  }
  return null;
}

const upsertEntry = async ({
  type,
  id,
  body,
  files,
  entry_id,
  extraFields = [],
}) =>
  new Promise(async (resolve, reject) => {
    const allSchemas = !!type ? fs.getFiles([type]) : fs.getFiles();
    const schema = allSchemas?.find((item) => item?.id?.toString() === id);
    let schemaFields = schema?.fields;

    schemaFields = [...schemaFields, ...extraFields];

    try {
      if (files?.length > 0) {
        files?.forEach((item) => {
          const is_field = schemaFields?.find(
            (element) => element?.slug === item?.fieldname
          );

          if (!!is_field) {
            const upload_path = !!item?.path
              ? extractUploadPath(item?.path)
              : item?.location;

            body[item?.fieldname] = JSON.stringify({
              name: item?.originalname,
              type: item?.mimetype,
              url: upload_path,
              size: item?.size,
            });
          }
        });
      }

      let formatted_body = schemaFields.reduce((acc, curr) => {
        acc[curr.slug] = body?.[curr.slug];
        return acc;
      }, {});

      const data = removeUndefinedProperties(formatted_body);

      if (entry_id) {
        await knex(schema?.slug || schema?.id)
          .where({ id: entry_id })
          .update(data);
      } else {
        await knex(schema?.slug || schema?.id).insert(data);
      }

      resolve(true);
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });

export default upsertEntry;
