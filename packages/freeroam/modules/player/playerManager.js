'use strict';

const logger = require('../utils/logger');
const Player = require('../player/player');

class PlayerManager {
  constructor() {
    this._init();
  }

  _init() {
    mp.events.add({
      'playerJoin': (player) => {
          logger('RAGE', 'join', `${player.name} has joined the server.`, 'info');
      },
      'playerReady': (player) => {
        logger('RAGE', 'player', `${player.name} is ready.`, 'info');
        player.call('setupInterface');
        Object.assign(mp.Player.prototype, Player);

        player.exists(player.name)
          .then(() => {
              console.log('exists');
              player.call('doesAccountExist', [true]);
          })
          .catch((err) => {
              console.log(err);
              player.call('doesAccountExist', [false]);
          })
      },
      'playerQuit': (player, exitType, reason) => {
        if(player.logged) {
          let name = player.name;
          player.save()
            .then(() => {
              logger('RAGE', 'account', `Account ${name} has been saved.`, 'info');
            })
            .catch((err) => {
              logger('RAGE', 'account', `Failed to save account. '${name}' - (Error: ${err})`, 'info');
            })
        }
          
        switch(exitType) {
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
    });
  }
}

module.exports = new(PlayerManager);