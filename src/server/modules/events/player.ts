import logger from '../utils/logger';
import colors from '../utils/colors';
import { robbingWeapon } from '../utils/helpers';

mp.events.add('playerJoin', (player: UGPlayerMp) => {
  logger('RAGE', 'join', `${player.name} has joined the server.`, 'info');
});

mp.events.add('playerReady', (player: UGPlayerMp) => {
  logger('RAGE', 'player', `${player.name} is ready.`, 'info');
  player.position = new mp.Vector3(0, 0, 0);
  player.dimension = player.dimension + 1;
  player.exists()
    .then(() => {
      player.call('setupInterface', [true]);
      mp.players.call('notify', [`${player.name} has joined the server.`, 'Join']);
    })
    .catch(() => player.call('setupInterface', [false]));
});

mp.events.add('playerQuit', (player: UGPlayerMp, exitType: string, reason: string) => {
  if (player.logged) {
    const name = player.name;
    player.save()
      .then(() => logger('RAGE', 'account', `Account ${name} has been saved.`, 'info'))
      .catch((err: string) => logger('RAGE', 'account', `Failed to save account. '${name}' - (Error: ${err})`, 'info'));
  }

  switch (exitType) {
    case 'disconnect': {
      logger('RAGE', 'quit', `${player.name} has left the server.`, 'info');
      mp.players.call('notify', [`${player.name} has left the server.`, 'Quit']);
      break;
    }

    case 'timeout': {
      logger('RAGE', 'quit', `${player.name} has left the server. (Timed out)`, 'info');
      mp.players.call('notify', [`${player.name} has left the server. (Timed out)`, 'Quit']);
      break;
    }

    case 'kicked': {
      logger('RAGE', 'quit', `${player.name} has been kicked from the server. (Reason: ${reason})`, 'info');
      if (reason) {
        mp.players.call('notify', [`${player.name} has been kicked from the server.`, 'Quit']);
      } else {
        mp.players.call('notify', [`${player.name} has been kicked from the server. Reason: ${reason}`, 'Quit']);
      }
      break;
    }
  }
});

mp.events.add('playerDeath', (player: UGPlayerMp, reason: number, killer: UGPlayerMp) => {
  if (killer) {
    logger('RAGE', 'death', `${killer.name} has killed ${player.name}. (${reason})`, 'info');
  } else {
    logger('RAGE', 'death', `${player.name} has died.`, 'info');
  }
});

mp.events.add('playerIsAiming', (player: UGPlayerMp) => {
  const currentBank = player.getVariable('currentBank');
  const isRobbing = player.getVariable('isRobbing');

  if (currentBank && !isRobbing && !robbingWeapon(player.weapon)) {
    player.call('initiateRobbery', [currentBank.name]);
    player.setVariable('isRobbing', true);
  }
});

/*
mp.events.add('playerAimingAt', (player: UGPlayerMp) => {
  player.outputChatBox(`Your are aiming at: ${player.aimTarget}`);
});
*/

mp.events.add('playerStoppedAiming', (player: UGPlayerMp) => {
  player.outputChatBox('playerStoppedAiming');
});
