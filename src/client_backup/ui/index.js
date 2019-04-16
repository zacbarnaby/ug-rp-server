'use strict';

let ui = null;

class Interface {

  constructor() {
    this._init();
  }

  _init() {
    this.browser = mp.browsers.new("package://ui/dist/index.html");
    this.chatbox = mp.browsers.new("package://chat/dist/index.html");
    this.browser.active = true;
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    this.chatbox.markAsChat();
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
    this.hud(false);
    this.blur(true, 0.1);
  }

  hud(state) {
    mp.game.ui.displayHud(state);
    mp.game.ui.displayRadar(state);

    if(state) {
      mp.game.controls.disableControlAction(1, 199, false);
      mp.game.controls.disableControlAction(1, 200, false);
    } else {
      mp.game.controls.disableControlAction(1, 199, true);
      mp.game.controls.disableControlAction(1, 200, true);
    }
      
  }

  blur(state, time) {
    if(state) {
        mp.game.graphics.transitionToBlurred(time);
    } else {
        mp.game.graphics.transitionFromBlurred(time);
    }
  }

  send(data) {
    mp.events.callRemote('recieveClientData', data);
  }

  execute(...args) {
    this.browser.execute(`receive(${args.join(',')})`);
  }
}

mp.events.add('setupInterface', () => {
  ui = new Interface();
});

mp.events.add('doesAccountExist', (state) => {
  ui.execute('"doesAccountExist"', state);
})

mp.events.add('outputChatBox', (name, string, color) => {
  let json = JSON.stringify({ name: name, message: string, color: color });
  ui.chatbox.execute(`chatAPI.push(${json});`);
});

mp.events.add('authResult', (result) => {
  let data = JSON.parse(result);
  if(data.success) {
    ui.blur(false, 0.5);
    ui.hud(true);
    mp.gui.chat.activate(true);
    mp.gui.cursor.show(false, false);
  }
  ui.execute('"authResult"', result);
});

mp.events.add('sendData', (data) => {
    ui.send(data);
})
