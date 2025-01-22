import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:1337"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

export default cors(corsOptions);
