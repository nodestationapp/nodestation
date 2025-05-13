import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import { fs } from "@nstation/utils";
import { queryBuilder } from "@nstation/db";

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        let result = null;

        if (!!jwtPayload?.id) {
          const table = fs.getSchema("nodestation_users");

          result = await queryBuilder({
            table,
            filters: [
              {
                field: "nodestation_users.id",
                value: jwtPayload.id,
                operator: "equals",
              },
              {
                field: "nodestation_users.status",
                value: "active",
                operator: "equals",
              },
            ],
          });
        }

        return done(null, result?.items?.[0]);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  )
);
