import './modules/database/database';
import { PlayerManager } from './modules/player/playerManager';
import { EventManager } from './modules/events/eventManager';
import { Commands } from './modules/commands/commands';

class Framework {
  private commands: Commands;
  private eventManager: EventManager;
  private playerManager: PlayerManager;

  constructor() {
    this.commands = new Commands();
    this.eventManager = new EventManager();
    this.playerManager = new PlayerManager();
  }
}

const app = new Framework();
