import { EventManager } from './modules/events/eventManager';
import { Commands } from './modules/commands/commands';
import { loadBanks } from './modules/banks';

import './modules/database/database';
import './modules/player/player';

class Framework {
  private commands: Commands;
  private eventManager: EventManager;

  constructor() {
    this.commands = new Commands();
    this.eventManager = new EventManager();
    loadBanks();
  }
}

const app = new Framework();
