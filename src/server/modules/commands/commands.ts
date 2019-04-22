import { getPlayer, getWeapon, getVehicle, savePlayers } from '../utils/helpers';
import colors from '../utils/colors';
import { resolve } from 'bluebird';
import vehicles from 'data/vehicles';
import logger from '../utils/logger';

export class Commands {
  constructor() {
    mp.events.addCommand({
      gmx: this.reloadServer,
      goto: this.gotoPlayer,
      veh: this.spawnVehicle,
      del: this.deleteSpawnedVehicles,
      wep: this.spawnWeapon,
      kill: this.suicide,
      revive: this.revive,
      pos: this.pos,
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
      return player.call('notify', ['/goto [name]', 'Incorrect Usage', 'error']);
    }

    // find the player
    const target = getPlayer(name);
    if (!target) {
      return player.call('notify', ['That player is not online.', 'Error', 'error']);
    }

    if (!target.logged) {
      return player.call('notify', ['That player is not logged in.', 'Error', 'error']);
    }

    player.position = target.position;

    if (target.vehicle) {
      player.position = target.position;
      player.putIntoVehicle(target.vehicle, 0);
    }

    if (silent === '0') {
      player.call('notify', ['An admin has teleported to your position.', 'Server', 'warn']);
    }

    player.call('notify', [`You have teleported to ${target.name}'s position`, 'Admin']);
  }

  spawnVehicle(player: UGPlayerMp, fullText: string, name: string) {
    if (!name) {
      return player.call('notify', ['/veh [name/id]', 'Incorrect Usage', 'error']);
    }

    const vehicle = getVehicle(name);
    if (!vehicle) {
      return player.call('notify', ['That vehicle does not exist.', 'Error', 'error']);
    }

    player.call('getAdminVehicleName', [vehicle]);
  }

  deleteSpawnedVehicles(player: UGPlayerMp, fullText: string) {
    if (player.spawnedVehicles.length === 0) {
      player.call('notify', ['You haven\'t spawned any vehicles.', 'Error', 'error']);
    }

    player.spawnedVehicles.forEach((vehicle: VehicleMp) => vehicle.destroy());
    player.spawnedVehicles = [];
    player.call('notify', ['You have despawned all of your spawned vehicles.', 'Admin']);
  }

  spawnWeapon(player: UGPlayerMp, fullText: string, name: string) {
    if (!name) {
      return player.call('notify', ['/wep [name/id]', 'Incorrect Usage', 'error']);
    }

    const weapon = getWeapon(name);
    if (!weapon) {
      return player.call('notify', ['That weapon does not exist.', 'Error', 'error']);
    }

    player.giveWeapon(mp.joaat(weapon.name), 1000);
    player.call('notify', [`You have given yourself a ${weapon.display}.`, 'Admin']);
  }

  suicide(player: UGPlayerMp) {
    player.health = 0;
    player.call('notify', ['You have killed yourself.', 'Admin']);
  }

  revive(player: UGPlayerMp) {
    player.health = 100;
    player.position.x += 1;
    player.spawn(player.position);
    player.call('notify', ['You have revived yourself.', 'Admin']);
  }

  pos(player: UGPlayerMp) {
    logger('RAGE', 'server', `${player.position.x}, ${player.position.y}, ${player.position.z}, ${player.heading}`, 'info');
  }

  test(player: UGPlayerMp) {
   
  }
}
