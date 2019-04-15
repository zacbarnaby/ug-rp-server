
class clientEvents {
  constructor() {
    this._init();
  }

  _init() {
    
  }
}

const _clientEvents = new clientEvents();

mp.events.add('getAdminVehicleName', (model) => {
  var vehicleName = mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(mp.game.joaat(model)));
  mp.events.callRemote('onAdminSpawnedVehicle', model, vehicleName);
});
