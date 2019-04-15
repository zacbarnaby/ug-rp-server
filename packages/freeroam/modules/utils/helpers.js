const logger = require('./logger');
const vehicles = require('../../data/vehicles.json');
const hospitalCoords = require('../../data/hospitals');
const weapons = require('../../data/weapons.json');


mp.events.add('clientLog', (player, type, string, error) => {
    return logger('CLIENT', type, string, error);
}); 

weapons.sort((a, b) => {
	const _a = a.display.toLowerCase();
	const _b = b.display.toLowerCase();

	if (_a < _b) return -1;
	else if (_a > _b) return 1;
	return 0;
});

getPlayer = (name) => {
    let _player = false;
    mp.players.forEach((player, id) => {
        if(name == player.name) {
            _player = player;
        }
    });
    return _player;
}



getWeaponFromName = (name) => {
  return weapons.find(v => v.name === name);
}

getWeaponFromPart = (name) => {
  return weapons.find(w => w.display.toLowerCase().includes(name.toLowerCase()));
}

getVehicleFromName = (name) => {
  return vehicles.find(v => v === name);
}

getVehicleFromPart = (name) => {
  return vehicles.find(a => a.includes(name));
}

getWeapon = (name) => {
  let weapon = getWeaponFromPart(name);
  if(weapon !== undefined) {
    return weapon;
  }
  weapon = getWeaponFromName(name);
  if(weapon !== undefined) {
    return weapon;
  }
  return false;
}

getVehicle = (param) => {
  let name = getVehicleFromPart(param);
  if(name !== undefined) {
    return name;
  }
  name = getVehicleFromPart(param);
  if(name !== undefined) {
    return name;
  }
  return false;
}

xyInFrontOfPos = (pos, heading, dist) => {
  heading *= Math.PI / 180;
  pos.x += (dist * Math.sin(-heading));
  pos.y += (dist * Math.cos(-heading));
  return pos;
}

respawnHospital = (player) => {
  let closest = 0;
  let minDist = 9999.0;

  for (let i = 0, max = hospitalCoords.length; i < max; i++) {
      let dist = player.dist(hospitalCoords[i]);
      if (dist < minDist) {
          minDist = dist;
          closest = i;
      }
  }

  player.spawn(hospitalCoords[closest]);
	player.health = 100;
	
	clearTimeout(player.respawnTimer);
	player.respawnTimer = null;
}

module.exports = {
    getPlayer: getPlayer,
    getVehicle: getVehicle,
    xyInFrontOfPos: xyInFrontOfPos,
    respawnHospital: respawnHospital
}