const logger = require('./modules/utils/logger');

class Framework {
  constructor() {
    this._start();
  }

  async _start() {
    await require('./loaders/database')();
    await require('./loaders/playermanager')();
    await require('./loaders/events')();
    await require('./loaders/commands')();
  }
}

const app = new Framework();
