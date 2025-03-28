import { fs } from "@nstation/utils";

const getRelatedFields = (relationSlug) => {
  const relation = fs.getFiles(`/src/schemas/tables/${relationSlug}.json`);
  return relation?.[0]?.fields || [];
};

const populateRelationsRecursively = (table, field) => {
  let fieldsToPopulate = [
    `${field?.type === "user" ? "nodestation_users" : field?.relation}.*`,
  ];

  if (field?.relation) {
    const relatedFields = getRelatedFields(field.relation);

    relatedFields.forEach((relatedField) => {
      if (relatedField?.relation || relatedField?.type === "user") {
        // Rekurencyjnie sprawdzamy, czy relacja ma swoje dalsze relacje
        fieldsToPopulate = [
          ...fieldsToPopulate,
          ...populateRelationsRecursively(table, relatedField),
        ];
      }
    });
  }

  return fieldsToPopulate;
};

const populateRelations = (populate, query, table) => {
  if (populate === "*") {
    const relations = table?.fields.filter(
      (field) => !!field?.relation || field?.type === "user"
    );

    const temp_populate = relations.reduce((acc, relation) => {
      const fields = populateRelationsRecursively(table, relation);

      acc[relation?.slug] = fields;
      return acc;
    }, {});

    populate = temp_populate;
  }

  Object.entries(populate).forEach(([alias, fields]) => {
    fields?.forEach((field, index) => {
      const relationTable = field.split(".")[0];

      let relationFields = [];

      if (fields.includes(`${relationTable}.*`)) {
        let table;
        if (relationTable === "nodestation_users") {
          table = fs.getFiles(`/src/schemas/auth.json`);
        } else {
          table = fs.getFiles(`/src/schemas/tables/${relationTable}.json`);
        }

        relationFields = table?.[0]?.fields?.map(
          (col) => `${relationTable}.${col.slug} as ${alias}.${col.slug}`
        );
      } else {
        console.log("DUPA");
        // relationFields = fields.map((field) => {
        //   const [column, aliasName] = field.includes(" as ")
        //     ? field.split(" as ")
        //     : [field, field.split(".")[1]];
        //   return `${relationTable}.${column.split(".")[1]} as ${alias}.${aliasName}`;
        // });

        // relationFields = fields.map((field) => {
        //   const [column, aliasName] = field.includes(" as ")
        //     ? field.split(" as ")
        //     : [field, field.split(".")[1]];
        //   console.log(
        //     `${relationTable}.${column.split(".")[1]} as ${alias}.${aliasName}`
        //   );
        // });

        relationFields = ["paliwo.name as relation.paliwko"];
      }

      if (index === 1) {
        table.id = "paliwo";
        alias = "id";
      }

      console.log(`${table?.id}.${alias}`, relationTable);

      query = !!relationFields?.length
        ? query
            .leftJoin(
              relationTable,
              `${table?.id}.${alias}`,
              `${relationTable}.id`
            )
            .select(`${table?.id}.*`, ...relationFields)
        : query;
    });
  });

  return query;
};

export default populateRelations;
