import vehicles from '../../data/vehicles';
import weapons from '../../data/weapons';

weapons.sort((a, b) => {
  const left = a.display.toLowerCase();
  const right = b.display.toLowerCase();

  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
});

// mp.events.add('clientLog', (player, type, string, error) => {
//     return logger('CLIENT', type, string, error);
// });

/**
 * Get a player by their nickname
 * @param name Name of the player
 */
export function getPlayer(name: string): UGPlayerMp {
  let ply: UGPlayerMp;
  mp.players.forEach((player: UGPlayerMp) => {
    if (player.name === name) {
      ply = player;
    }
  });

  return ply;
}

/**
 * Get a weapon by its name
 * @param name
 */
export function getWeaponFromName(name: string) {
  return weapons.find(weapon => weapon.name === name);
}

/**
 * Get a weapon by part of its name
 * @param part
 */
export function getWeaponFromPart(part: string) {
  return weapons.find(weapon => weapon.display.toLowerCase().includes(part.toLowerCase()));
}

/**
 * Get a weapon by its name, or part of its name
 * @param nameOrPart
 */
export function getWeapon(nameOrPart: string) {
  const weapon = getWeaponFromPart(nameOrPart);
  if (typeof weapon !== 'undefined') {
    return weapon;
  }

  return getWeaponFromName(nameOrPart);
}

/**
 * Get a vehicle by its name
 * @param name
 */
export function getVehicleFromName(name: string) {
  return vehicles.find((vehicle: string) => vehicle === name);
}

/**
 * Get a vehicle by part of its name
 * @param part
 */
export function getVehicleFromPart(part: string) {
  return vehicles.find((vehicle: string) => vehicle.includes(part));
}

/**
 * Get a vehicle by its name, or part of its name
 * @param nameOrPart
 */
export function getVehicle(nameOrPart: string) {
  const vehicle = getVehicleFromPart(nameOrPart);
  if (typeof vehicle !== 'undefined') {
    return vehicle;
  }

  return getVehicleFromName(nameOrPart);
}

/**
 * Get the coordinates infront of the position
 * @param position
 * @param heading
 * @param dist
 */
export function xyInFrontOfPos(position: Vector3Mp, heading: number, dist: number): Vector3Mp {
  const headingHalfPi = (heading * (Math.PI / 180));
  const x = (position.x + (dist * Math.sin(-headingHalfPi)));
  const y = (position.y + (dist * Math.cos(-headingHalfPi)));

  return new mp.Vector3(x, y, position.z);
}
