
/**
 * Resets all client data
 */

let isRmbDown = false;

export const resetClient = () => {
  mp.players.local.setMoney(0);
  mp.game.ui.setPlayerCashChange(0, 0);
  mp.game.stats.statSetInt(mp.game.gameplay.getHashKey('SP0_TOTAL_CASH'), 0, true);
  mp.game.ui.displayCash(false);
  mp.game.cam.doScreenFadeIn(500);
};

setInterval(() => {
  if (mp.keys.isDown(2) && !isRmbDown) {
    mp.events.callRemote('playerIsAiming');
  } else if (mp.keys.isUp(2) && isRmbDown) {
    mp.events.callRemote('playerStoppedAiming');
    isRmbDown = false;
  }
// tslint:disable-next-line: align
}, 500);

mp.events.add('render', () => {
  const logged = mp.players.local.getVariable('logged');
  if (logged) {
    mp.game.ui.showHudComponentThisFrame(3);
  }
});
