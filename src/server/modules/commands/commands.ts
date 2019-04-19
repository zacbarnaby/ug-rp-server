import { getPlayer, getWeapon, getVehicle, savePlayers } from '../utils/helpers';
import colors from '../utils/colors';
import { resolve } from 'bluebird';

export class Commands {
  constructor() {
    mp.events.addCommand({
      gmx: this.reloadServer,
      goto: this.gotoPlayer,
      veh: this.spawnVehicle,
      del: this.deleteSpawnedVehicles,
      wep: this.spawnWeapon,
      kill: this.suicide,
      test: this.test,
    });
  }

  reloadServer(player: UGPlayerMp, fullText: string, time: string) {
    if (time) {
      player.call('playerServerClose', [time]);
    } else {
      player.call('playerServerClose');
      savePlayers(() => {
        process.exit(0);
      });
    }
  }

  gotoPlayer(player: UGPlayerMp, fullText: string, name: string, silent: string) {
    if (!name) {
      //return player.call('outputChatBox', ['Error', 'Incorrect Usage: /goto [name]', colors.red]);
      player.call('notify', ['/goto [name]', 'Incorrect Usage', 'error']);
    }

    // find the player
    const target = getPlayer(name);
    if (!target) {
      //return player.call('outputChatBox', ['Error', 'That player is not online.', colors.red]);
    }

    if (!target.logged) {
      //return player.call('outputChatBox', ['Error', 'That player has not logged in yet.', colors.red]);
    }

    player.position = target.position;

    if (target.vehicle) {
      player.putIntoVehicle(target.vehicle, 0);
    }

    if (silent === '0') {
      //target.call('outputChatBox', ['Server', 'An admin has teleported to your location.', colors.blue]);
    }

    //player.call('outputChatBox', ['Server', `You have teleported to ${target.name}'s position.`, colors.blue]);
  }

  spawnVehicle(player: UGPlayerMp, fullText: string, name: string) {
    if (!name) {
      return player.call('outputChatBox', ['Error', 'Incorrect Usage: /veh [name/id]', colors.red]);
    }

    const vehicle = getVehicle(name);
    if (!vehicle) {
      return player.call('outputChatBox', ['Error', 'That vehicle does not exist.', colors.red]);
    }

    player.call('getAdminVehicleName', [vehicle]);
  }

  deleteSpawnedVehicles(player: UGPlayerMp, fullText: string) {
    if (player.spawnedVehicles.length === 0) {
      //return player.call('outputChatBox', ['Error', 'You haven\'t spawned any vehicles.', colors.red]);
    }

    player.spawnedVehicles.forEach((vehicle: VehicleMp) => vehicle.destroy());
    player.spawnedVehicles = [];
    //player.call('outputChatBox', ['Server', 'You have despawned all your spawned vehicles.', colors.blue]);
  }

  spawnWeapon(player: UGPlayerMp, fullText: string, name: string) {
    if (!name) {
      //return player.call('outputChatBox', ['Error', 'Incorrect Usage: /wep [name/id]', colors.red]);
    }

    const weapon = getWeapon(name);
    if (!weapon) {
      //return player.call('outputChatBox', ['Error', 'That weapon does not exist.', colors.red]);
    }

    player.giveWeapon(mp.joaat(weapon.name), 1000);
    //player.call('outputChatBox', ['Server', `You have given yourself a ${weapon.display}.`, colors.blue]);
  }

  suicide(player: UGPlayerMp) {
    player.health = 0;
  }

  test(player: UGPlayerMp) {
    player.call('notify', ['hey']);
  }
}
