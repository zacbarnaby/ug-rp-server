
/**
 * Resets all client data
 */
const resetClient = () => {
  mp.players.local.setMoney(0);
  mp.game.ui.setPlayerCashChange(0, 0);
  mp.game.stats.statSetInt(mp.game.gameplay.getHashKey('SP0_TOTAL_CASH'), 0, true);
  mp.game.ui.displayCash(false);
  mp.game.cam.doScreenFadeIn(500);
};
