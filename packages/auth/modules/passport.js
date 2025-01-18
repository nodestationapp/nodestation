import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import { knex } from "@nstation/db";

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
          result = await knex("nodestation_users")
            .where({
              id: jwtPayload.id,
              status: "active",
            })
            .first();
        }

        return done(null, result);
      } catch (err) {
        return done(err);
      }
    }
  )
);
