import { fs } from "@nstation/utils";
import { queryBuilder } from "@nstation/db";

export default async (req, res) => {
  const id = req?.route?.path?.split("/")?.[4];
  let { page = 0, sort, filters, pageSize = 20 } = req?.query || {};

  page = parseInt(page);
  pageSize = parseInt(pageSize);

  try {
    if (sort) {
      sort = sort?.split(":");
      sort = {
        field: sort?.[0],
        sort: sort?.[1],
      };
    }

    if (filters) {
      filters = filters?.split(",");

      filters = filters
        ?.map((item) => {
          item = item?.split(":");
          return { field: item?.[0], operator: item?.[1], value: item?.[2] };
        })
        ?.filter((item) => item?.value !== "undefined");
    }

    const table = fs.getSchema(id);

    const entries = await queryBuilder({
      table,
      filters,
      sort,
      pagination: { page, pageSize },
    });

    return res.status(200).json({
      data: entries?.items,
      pagination: { page, pageSize, count: entries?.count },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
