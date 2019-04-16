import logger from '../utils/logger';
import colors from '../utils/colors';
import { xyInFrontOfPos } from '../utils/helpers';
import './player';

export class EventManager {
  constructor() {
    mp.events.add({
      recieveClientData: this.recieveClientData,
      onAdminSpawnedVehicle: this.onAdminSpawnedVehicle,
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
            player.call('outputChatBox', ['Server', `Welcome ${player.name}. You have succesfully created a new account.`, colors.green]);
            player.handleLogin(account);
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
            player.call('outputChatBox', ['Server', `Welcome back ${player.name}. You have succesfully logged in.`, colors.green]);
            player.handleLogin(account);
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
    player.call('outputChatBox', ['Server', `You have spawned a ${display}.`, colors.blue]);
    logger('RAGE', 'server', `${player.name} has spawned a ${display}.`, 'info');
  }
}
