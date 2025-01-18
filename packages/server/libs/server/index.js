import ExpressServer from "./ExpressServer.js";

class Nodestation {
  constructor(config = {}) {
    this.server = new ExpressServer(config);
  }

  start() {
    this.server.start();
  }
}

export default Nodestation;
