import "dotenv/config";
import ExpressServer from "../../packages/server/libs/server/ExpressServer";

export default () => new ExpressServer({ port: 3000 }).server;
