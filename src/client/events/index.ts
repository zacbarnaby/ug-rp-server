import './events/player';
import './events/camera';
import './events/banks';

mp.events.add('getAdminVehicleName', (model) => {
  const name = mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(mp.game.joaat(model)));
  mp.events.callRemote('onAdminSpawnedVehicle', model, name);
});
