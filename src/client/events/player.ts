import { resetClient } from 'player';

let isClosing = false;
let countDown = null;

mp.events.add('playerInitialize', () => {
  resetClient();
});

mp.events.add('playerSetup', () => {
  const local = mp.players.local;
  mp.game.ui.displayCash(true);
  local.setMoney(local.getVariable('money'));
  mp.game.stats.statSetInt(mp.game.gameplay.getHashKey('SP0_TOTAL_CASH'), local.getVariable('money'), true);
  mp.events.call('joinScenary', false);
});

mp.events.add('playerServerClose', (time: string) => {
  if (time) {
    countDown = time;
    isClosing = true;
    const interval = setInterval(
      () => {
        if (countDown === 0) {
          clearInterval(interval);
          mp.events.callRemote('savePlayers');
          mp.game.cam.doScreenFadeOut(1000);
        } else {
          countDown = countDown - 1;
        }
      },
      1000,
    );
  } else {
    mp.game.cam.doScreenFadeOut(1000);
  }
});
