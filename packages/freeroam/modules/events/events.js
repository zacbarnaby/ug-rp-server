'use strict';

const helpers = require('../utils/helpers');
const logger = require('../utils/logger');
const colors = require('../utils/colors');

class EventManager {
  constructor() {
    this._init();
    this._custom();
  }

  _init() {
    mp.events.add({
      'playerChat': (player, text) => {
          logger('RAGE', 'chat', `${player.name}: ${text}`, 'info');
          mp.players.call('outputChatBox', [player.name, text, '#fff']);
      },
      'playerDeath': (player, reason, killer) => {
        if(killer) {
          mp.players.call('outputChatBox', ['Server', `${killer.name} has killed ${player.name}.`, colors.grey]);
          logger('RAGE', 'death', `${killer.name} has killed ${player.name}. (${reason})`, 'info');
        } else {
          mp.players.call('outputChatBox', ['Server', `${player.name} has died.`, colors.grey]);
          logger('RAGE', 'death', `${player.name} has died.`, 'info');
        }
        player.respawnTimer = setTimeout(respawnHospital, 1000, player);
      }
    })
  }

  _custom() {
    mp.events.add({
        'recieveClientData': (player, data) => {
            let array = JSON.parse(data);
            console.log(data);
            switch(array['action']) {
                case 'register': {
                  player.register(player.name, array['password'])
                    .then((account) => {
                        logger('RAGE', 'account', `${player.name} has created an account. (Id: ${account.id})`, 'info');
                        player.call('toggleAuthentication', [false]);
                        player.call('authResult', [JSON.stringify({ action: 'register', success: true })]);
                        player.call('outputChatBox', ['Server', `Welcome ${player.name}. You have succesfully created a new account.`, colors.green]);
                        player.logged = true;
                        player.uid = account.id;
                        player.admin = account.admin;
                        player.spawnedVehicles = [];
                    })
                    .catch((err) => {
                        logger('RAGE', 'account', `Error creating an account for ${player.name}. (Error: ${err})`, 'error');
                    });
                  break;
                }
                case 'login': {
                  player.login(player.name, array['password'])
                    .then((account) => {
                        logger('RAGE', 'account', `${player.name} has logged in. (Id: ${account.id})`, 'info');
                        player.call('toggleAuthentication', [false]);
                        player.call('authResult', [JSON.stringify({ action: 'login', success: true })]);
                        player.call('outputChatBox', ['Server', `Welcome back ${player.name}. You have succesfully logged in.`, colors.green]);
                        player.logged = true;
                        player.uid = account.id;
                        player.admin = account.admin;
                        player.spawnedVehicles = [];
                        player.spawn(JSON.parse(account.position));   
                    })
                    .catch((err) => {
                        logger('RAGE', 'account', `Error logging in account ${player.name}. (Error: ${err})`, 'error');
                        player.call('authResult', [JSON.stringify({ success: false, error: 'Incorrect Username or Password'} )]);
                    });
                  break;
                }
            }
        },
        'onAdminSpawnedVehicle': (player, model, display) => {
          const spawnedVehicle = mp.vehicles.new(mp.joaat(model), xyInFrontOfPos(player.position, player.heading, 3.0), {heading: player.heading, numberPlate: player.name, dimension: player.dimension});
          player.spawnedVehicles.push(spawnedVehicle);
          player.putIntoVehicle(spawnedVehicle, -1);
          player.call('outputChatBox', ['Server', `You have spawned a ${display}.`, colors.blue]);
          logger('RAGE', 'server', `${player.name} has spawned a ${display}.`, 'info');
        }
    });
  }
}

module.exports = new(EventManager);