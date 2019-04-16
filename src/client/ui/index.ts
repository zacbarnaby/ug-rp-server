let ui: Interface = null;

class Interface {
  browser: BrowserMp;
  chatbox: BrowserMp;

  constructor() {
    this.browser = mp.browsers.new('package://ui/dist/index.html');
    this.chatbox = mp.browsers.new('package://chat/dist/index.html');

    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    this.browser.active = true;
    this.chatbox.markAsChat();

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

mp.events.add('setupInterface', () => {
  ui = new Interface();
});

mp.events.add('doesAccountExist', (state) => {
  ui.execute('doesAccountExist', state);
});

mp.events.add('outputChatBox', (name, string, color) => {
  const message = JSON.stringify({ name, color, message: string });
  ui.chatbox.execute(`chatAPI.push(${message});`);
});

mp.events.add('authResult', (result) => {
  const { success } = JSON.parse(result);
  if (success) {
    ui.blur(false, 0.5);
    ui.hud(true);
    mp.gui.chat.activate(true);
    mp.gui.cursor.show(false, false);
  }

  ui.execute('authResult', result);
});

mp.events.add('sendData', (data) => {
  ui.send(data);
});
