import './modules/database/database';
import { EventManager } from './modules/events/eventManager';
import { Commands } from './modules/commands/commands';
import './modules/player/player';

class Framework {
  private commands: Commands;
  private eventManager: EventManager;

  constructor() {
    this.commands = new Commands();
    this.eventManager = new EventManager();
  }
}

const app = new Framework();
