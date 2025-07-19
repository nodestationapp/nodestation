import jwt from "jsonwebtoken";

import { fs } from "@nstation/utils";
import { queryBuilder } from "@nstation/db";

const checkApiToken = async (req, res, next) => {
  try {
    let apiToken = null;
    if (req.headers["api-key"]) {
      apiToken = req.headers["api-key"].split(" ")[1];
    } else {
      return next();
    }

    const table = fs.getSchema("nodestation_users_api_tokens");

    const result = await queryBuilder({
      table,
      filters: [
        {
          field: "token",
          value: apiToken,
          operator: "equals",
        },
      ],
    });

    const payload = jwt.verify(
      result?.items?.[0]?.token,
      process.env.TOKEN_SECRET
    );

    let user = null;
    if (!!payload?.id) {
      const table = fs.getSchema("nodestation_users");

      user = await queryBuilder({
        table,
        filters: [
          {
            field: "id",
            value: payload.id,
            operator: "equals",
          },
          {
            field: "status",
            value: "active",
            operator: "equals",
          },
        ],
      });

      user = user?.items?.[0];
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error(err);
    return next();
  }
};

export default checkApiToken;
