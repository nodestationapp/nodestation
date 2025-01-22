import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: function (_, res) {
    res.status(429).json({
      message: "You have exceeded the request limit. Please try again later.",
      error: "Too many requests",
    });
  },
});

export default limiter;
