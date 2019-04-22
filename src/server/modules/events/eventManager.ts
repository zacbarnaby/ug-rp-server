import logger from '../utils/logger';
import colors from '../utils/colors';
import { xyInFrontOfPos, savePlayers } from '../utils/helpers';
import './player';
import { banks } from '../banks';

export class EventManager {
  constructor() {
    mp.events.add({
      recieveClientData: this.recieveClientData,
      onAdminSpawnedVehicle: this.onAdminSpawnedVehicle,
      playerChat: this.playerChat,
      savePlayers: this.savePlayers,
      playerEnterColshape: this.playerEnterColshape,
      playerExitColshape: this.playerExitColshape,
    });
  }

  recieveClientData(player: UGPlayerMp, data: string) {
    const array = JSON.parse(data);
    console.log(array);

    const { action } = array;
    switch (action) {
      case 'register': {
        const { password } = array;
        player.register(player.name, password)
          .then((account: UGAccount) => {
            logger('RAGE', 'account', `${player.name} has created an account. (Id: ${account.id})`, 'info');
            player.call('authResult', [JSON.stringify({ action: 'register', success: true })]);
            player.call('notify', [`Welcome ${player.name}. You have succesfully created an account.`, 'Server', 'success']);
            player.handleLogin(account);
            player.dimension = 0;
            player.call('playerSetup', [5000]);
          })
          .catch(err => logger('RAGE', 'account', `Error creating an account for ${player.name}. (Error: ${err})`, 'error'));
        break;
      }

      case 'login': {
        const { password } = array;
        player.login(player.name, password)
          .then((account: UGAccount) => {
            logger('RAGE', 'account', `${player.name} has logged in. (Id: ${account.id})`, 'info');
            player.call('authResult', [JSON.stringify({ action: 'login', success: true })]);
            player.call('notify', [`Welcome back ${player.name}. You have succesfully logged in.`, 'Server', 'success']);
            player.handleLogin(account);
            player.dimension = 0;
            player.call('playerSetup', [5000]);
            player.spawn(JSON.parse(account.position));
          })
          .catch((err) => {
            logger('RAGE', 'account', `Error logging in account ${player.name}. (Error: ${err})`, 'error');
            player.call('authResult', [JSON.stringify({ success: false, error: 'Incorrect Username or Password' })]);
          });
        break;
      }
    }
  }

  onAdminSpawnedVehicle(player: UGPlayerMp, model: string, display: string) {
    const position = xyInFrontOfPos(player.position, player.heading, 3.0);
    const { heading, dimension } = player;
    const vehicle = mp.vehicles.new(mp.joaat(model), position, {
      heading,
      dimension,
      numberPlate: player.name,
    });

    player.spawnedVehicles.push(vehicle);
    player.putIntoVehicle(vehicle, -1);
    player.call('notify', [`You have spawned a ${display}.`, 'Admin']);
    logger('RAGE', 'server', `${player.name} has spawned a ${display}.`, 'info');
  }

  playerChat(player: UGPlayerMp, text: string) {
    mp.players.broadcast(`${player.name}: ${text}`);
  }

  savePlayers() {
    savePlayers(() => {
      process.exit(0);
    });
  }

  playerEnterColshape(player: UGPlayerMp, shape: ColshapeMp) {
    if (player.logged) {
      banks.forEach((bank) => {
        if (shape.id === bank.col_id) {
          console.log(`${player.name} is inside of ${bank.name}`);
          player.setVariable('currentBank', bank);
        }
        bank.markers.forEach((marker) => {
          if (shape.id === marker) {
            player.call('toggleButtonForBank', [true]);
          }
        });
      });
    }
  }

  playerExitColshape(player: UGPlayerMp, shape: ColshapeMp) {
    if (player.logged) {
      banks.forEach((bank) => {
        if (shape.id === bank.col_id) {
          console.log(`${player.name} has exited bank ${bank.name}.`);
          player.setVariable('currentBank', null);
        }
        bank.markers.forEach((marker) => {
          if (shape.id === marker) {
            player.call('toggleButtonForBank', [false]);
          }
        });
      });
    }
  }
}
