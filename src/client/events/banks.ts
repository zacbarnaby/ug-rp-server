import { hudManager } from 'instructional_buttons/hudManager';

const bankPeds = [];
let bankData = null;
export let bankButtons;

mp.events.add('sendClientBankData', (data) => {
  bankData = data;
  bankButtons = new hudManager(-1, [0, 0, 0, 255]);
  bankButtons.addButton('Start Banking', 23);

  // create peds for banks
  bankData.forEach((data) => {
    const array = [];
    if (data) {
      data.npcs.forEach((npc) => {
        const ped = mp.peds.new(mp.game.joaat('cs_bankman'), new mp.Vector3(npc.x, npc.y, npc.z), npc.heading, (streamPed) => {  }, 0);
        array.push(ped.handle);
      });
    }
    const object = { name: data.name, npcs: array };
    bankPeds.push(object);
  });

});

mp.events.add('initiateRobbery', (name) => {
  const bank = bankPeds.filter(bank => bank.name === name);
  bank[0].npcs.forEach((thePed) => {
    const ped = mp.peds.atHandle(thePed);

    ped.clearTasks();
    ped.taskHandsUp(-1, mp.players.local.handle, 0, false);
  });
});

mp.events.add('toggleButtonForBank', (state) => {
  bankButtons.toggleHud(state);
});
