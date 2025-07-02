import passport from "passport";

const authMiddleware = (roles) => {
  return (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (err, user) => {
      if (roles?.length > 0 && !roles?.includes("public")) {
        if (roles?.includes(user?.type)) {
          req.user = user;
          return next();
        }
        return res.status(401).json({
          error:
            "Unauthorized access. Please authenticate yourself to proceed.",
          code: "unauthorized",
        });
      } else {
        if (err || !user) {
          return next(err);
        }

        req.user = user;
        return next();
      }
    })(req, res, next);
  };
};
export default authMiddleware;
