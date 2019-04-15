const logger = require('../utils/logger');
const helpers = require('../utils/helpers');
const colors = require('../utils/colors');

class Commands {
    constructor() {
        this._admin();
    }

    _admin = () => {
        mp.events.addCommand({
          'gmx': (player, fullText) => {
              let save = new Promise((resolve, reject) => {
                  mp.players.forEach((player, id) => {
                    player.save()
                      .then(() => {
                        logger('RAGE', 'account', `Account ${player.name} has been saved.`, 'info');
                        resolve();
                      })
                      .catch((err) => {
                        logger('RAGE', 'account', `Failed to save account. '${player.name}' - (Error: ${err})`, 'info');
                      })
                    if(id === mp.players.length -1) {
                      resolve();
                    }
                });
              });
              save.then(() => {
                process.exit(0);
              })
          },
          'goto': (player, fullText, name, silent) => {
              if(name) {
                  let target = getPlayer(name);
                  if(!target) return player.call('outputChatBox', ['Error', `That player is not online.`, colors.red]);
                  if(!target.logged) return player.call('outputChatBox', ['Error', `That player has not logged in yet.`, colors.red]);

                  player.position = target.position;

                  if(target.vehicle) {
                      player.putIntoVehicle(target.vehicle, 0);
                  }

                  if(silent == "0") {
                      player.call('outputChatBox', ['Server', `An admin has teleported to your location.`, colors.blue]);
                  }

                  player.call('outputChatBox', ['Server', `You have teleported to ${target.name}'s position.`, colors.blue]);
                  logger('RAGE', 'admin', `${player.name} has teleported to ${target.name}.`, 'info');
              } else {
                  player.call('outputChatBox', ['Error', `Incorrect Usage: /goto [name]`, colors.red]);
              }
          },
          'veh': (player, fullText, param) => {
            if(param) {
              let veh = getVehicle(param);
              if(veh) {
                player.call('getAdminVehicleName', [veh]);
              } else {
                player.call('outputChatBox', ['Error', `That vehicle does not exist.`, colors.red]);
              }
            } else {
              player.call('outputChatBox', ['Error', `Incorrect Usage: /veh [name/id]`, colors.red]);
            }
          },
          'del': (player, fullText) => {
            if(player.spawnedVehicles) {
              player.spawnedVehicles.forEach((k, v) => {
                k.destroy();
              });
              player.spawnedVehicles = [];
              player.call('outputChatBox', ['Server', `You have despawned all your spawned vehicles.`, colors.blue]);
            } else {
              player.call('outputChatBox', ['Error', `You haven't spawned any vehicles.`, colors.red]);
            }
          },
          'wep': (player, fullText, param) => {
            if(param) {
              let wep = getWeapon(param);
              if(wep) {
                player.giveWeapon(mp.joaat(wep.name), 1000);
                player.call('outputChatBox', ['Server', `You have given yourself a ${wep.display}.`, colors.blue]);
              } else {
                player.call('outputChatBox', ['Error', `That weapon does not exist.`, colors.red]);
              }
            } else {
              player.call('outputChatBox', ['Error', `Incorrect Usage: /wep [name/id]`, colors.red]);
            }
          },
          'kill': (player, fullText) => {
            player.health = 0;
          },  
          'test': (player, fullText) => {
            
          }
        });
    }
}

module.exports = new(Commands);