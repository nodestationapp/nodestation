import NStation from "./libs/server/index.js";

const nodestation = new NStation({
  port: process.env.PORT,
});

nodestation.start();
