import './player';
import logger from '../utils/logger';
import colors from '../utils/colors';
import hospitals from '../../data/hospitals';

export class PlayerManager {
  constructor() {
    mp.events.add({
      playerJoin: this.playerJoin,
      playerReady: this.playerReady,
      playerQuit: this.playerQuit,
      playerChat: this.playerChat,
      playerDeath: this.playerDeath,
    });
  }

  playerJoin(player: UGPlayerMp) {
    logger('RAGE', 'join', `${player.name} has joined the server.`, 'info');
  }

  playerReady(player: UGPlayerMp) {
    logger('RAGE', 'player', `${player.name} is ready.`, 'info');

    player.call('setupInterface');
    player.exists()
      .then(() => player.call('doesAccountExist', [true]))
      .catch(() => player.call('doesAccountExists', [false]));
  }

  playerQuit(player: UGPlayerMp, exitType: string, reason: string) {
    if (player.logged) {
      const name = player.name;
      player.save()
        .then(() => logger('RAGE', 'account', `Account ${name} has been saved.`, 'info'))
        .catch((err: string) => logger('RAGE', 'account', `Failed to save account. '${name}' - (Error: ${err})`, 'info'));
    }

    switch (exitType) {
      case 'disconnect': {
        logger('RAGE', 'quit', `${player.name} has left the server.`, 'info');
        break;
      }

      case 'timeout': {
        logger('RAGE', 'quit', `${player.name} has left the server. (Timed out)`, 'info');
        break;
      }

      case 'kicked': {
        logger('RAGE', 'quit', `${player.name} has been kicked from the server. (Reason: ${reason})`, 'info');
        break;
      }
    }
  }

  playerChat(player: UGPlayerMp, text: string) {
    logger('RAGE', 'chat', `${player.name}: ${text}`, 'info');
    mp.players.call('outputChatBox', [player.name, text, '#fff']);
  }

  playerDeath(player: UGPlayerMp, reason: number, killer: UGPlayerMp) {
    if (killer) {
      mp.players.call('outputChatBox', ['Server', `${killer.name} has killed ${player.name}.`, colors.grey]);
      logger('RAGE', 'death', `${killer.name} has killed ${player.name}. (${reason})`, 'info');
    } else {
      mp.players.call('outputChatBox', ['Server', `${player.name} has died.`, colors.grey]);
      logger('RAGE', 'death', `${player.name} has died.`, 'info');
    }

    player.respawnTimer = setTimeout(
      () => {
        let closest = hospitals[0];
        let minDist = 9999.0;

        hospitals.forEach((hospital: Vector3Mp) => {
          const dist = player.dist(hospital);
          if (dist < minDist) {
            minDist = dist;
            closest = hospital;
          }
        });

        clearTimeout(player.respawnTimer);

        player.spawn(closest);
        player.health = 100;
        player.respawnTimer = null;
      },
      1000);
  }
}
