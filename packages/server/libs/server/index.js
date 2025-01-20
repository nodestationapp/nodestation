import ExpressServer from "./ExpressServer.js";

class Nodestation {
  constructor(config = {}) {
    this.server = new ExpressServer(config);
  }

  start() {
    this.server.start();
  }

  close() {
    this.server.close();
  }
}

export default Nodestation;
