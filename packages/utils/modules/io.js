import { Server as socket } from "socket.io";

export default async ({ server, app }) => {
  const io = new socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", function (socket) {
    socket.on("join", (uid) => {
      socket.join(uid);
    });
  });

  app.use(function (req, _, next) {
    req.io = io;
    next();
  });
};
