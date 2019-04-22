
/**
 * Resets all client data
 */

let isRmbDown = false;

const resetClient = () => {
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
