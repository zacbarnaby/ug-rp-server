let ui: Interface = null;

class Interface {
  browser: BrowserMp;

  constructor() {
    this.browser = mp.browsers.new('package://ugrp/dist/index.html');
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    this.browser.active = true;

    this.hud(false);
    this.blur(true, 0.1);
  }

  hud(state: boolean) {
    mp.game.ui.displayHud(state);
    mp.game.ui.displayRadar(state);
    mp.game.controls.disableControlAction(1, 199, !state);
    mp.game.controls.disableControlAction(1, 200, !state);
  }

  blur(state: boolean, time: number) {
    if (state) {
      mp.game.graphics.transitionToBlurred(time);
    } else {
      mp.game.graphics.transitionFromBlurred(time);
    }
  }

  send(data: string) {
    mp.events.callRemote('recieveClientData', data);
  }

  execute(...args) {
    const mappedArgs = args.map(value => typeof value === 'string' ? `'${value}'` : value);
    this.browser.execute(`receive(${mappedArgs.join(',')})`);
  }
}

mp.events.add('setupInterface', (state: boolean) => {
  ui = new Interface();
  ui.execute('doesAccountExist', state);
  mp.events.call('joinScenary', true);
});

mp.events.add('notify', (text, title, type, duration) => {
  ui.execute('notify', JSON.stringify({ text, title, type, duration }));
});

mp.events.add('authResult', (result: string) => {
  const { success } = JSON.parse(result);
  if (success) {
    ui.blur(false, 0.5);
    ui.hud(true);
    mp.gui.chat.show(true);
    mp.gui.cursor.show(false, false);
    mp.events.call('joinScenary', false);
  }

  ui.execute('authResult', result);
});

mp.events.add('sendData', (data: string) => {
  ui.send(data);
});
