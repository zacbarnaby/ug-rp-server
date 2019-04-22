import bankData from './bankData';
import logger from '../utils/logger';

export const banks = [];

export const loadBanks = () => {
  bankData.forEach((data) => {
    if (data) {
      const blip = createBlip(data.name, data.coords);
      const col = createColshape(data.npcs[1].x, data.npcs[1].y, data.npcs[1].z, data.size);
      const theMarkers = [];

      data.markers.forEach((marker) => {
        const id = createColshape(marker.x, marker.y, marker.z, 2);
        theMarkers.push(id);
      });

      const object = { name: data.name, blip_id: blip, col_id: col, markers: theMarkers };
      banks.push(object);
      console.log(banks);

    } else {
      logger('RAGE', 'banks', 'Failed to load any banks.', 'info');
    }
  });
  logger('RAGE', 'banks', `Loaded ${banks.length} bank${banks.length > 1 ? 's' : ''}.`, 'info');
};

const createBlip = (name, pos) => {
  const blip = mp.blips.new(108, pos, {
    name,
    color: 2,
    shortRange: true,
  });
  return blip.id;
};

const createColshape = (x, y, z, size) => {
  const col = mp.colshapes.newSphere(x, y, z, size);
  return col.id;
};


mp.events.add('sendClientBankData', (player) => {
  player.call('sendClientBankData', [bankData]);
});

mp.events.add('checkInBank', (player, colshape) => {
  console.log(colshape.handle);
});
