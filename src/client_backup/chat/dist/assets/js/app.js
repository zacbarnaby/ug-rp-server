let chat = {
  list: null,
  input: null,
  enabled: false,
  active: false,
  open: false,
  faded: false,
  timer: false
}

var chatAPI = {
  push: (text) => {
    chat.list.append(`<li>
          <span style="color: ${text.color}">${text.name}:</span>
          <span class="message">${text.message}</span>
        </li>`);
    chat.list.stop().animate({ scrollTop: chat.list[0].scrollHeight }, 'fast');
    if(chat.open == false && chat.faded == true) {
      $("#chat").css({ opacity: 0.8 });
      if(chat.timer) {
        clearTimeout(chat.timer);
        chat.timer = false;
      }
      chat.timer = setTimeout(() => {
        $("#chat").css({ opacity: 0 });
      }, 5000, () => {
        clearTimeout(chat.timer);
        chat.timer = false;
      });
      console.log(chat.timer);
    }
  },
  clear: () => {

  },
  activate: (state) => {
    chat.active = state;
  },
  show: (state, fade = false) => {
    if(chat.active) {
      if(state) {
        $("#chat").addClass('open');
        $("#chat").animate({
          opacity: 1
        }, 200);
      } else {
        if(fade) {
          $("#chat").removeClass('open');
          $("#chat").css({ opacity: 0.8 });
          if(chat.timer) {
            clearTimeout(chat.timer);
            chat.timer = false;
          }
          chat.timer = setTimeout(() => {
            $("#chat").css({ opacity: 0 });
          }, 5000, () => {
            clearTimeout(chat.timer);
            chat.timer = false;
          });
        } else {
          $("#chat").removeClass('open');
          $("#chat").animate({
            opacity: 0
          }, 100);
        }
        
      }
      chat.open = state;
      mp.invoke("focus", state);
    }
    
  }
};

$(document).ready(() => {
  chat.list = $("#chat ul");
  chat.input = $("input[type='text']");

  $("body").keydown((e) => {
    if(e.which == 84 && chat.active && !chat.open) {
      if(!chat.open) {
        chatAPI.show(true);
        chat.open = true;
        chat.input.focus();
      }
      e.preventDefault();
    } else if(e.which == 13 && chat.open && chat.active) {
      let message = chat.input.val();
      if(message.length > 0) {
        if(message[0] == "/") {
          message = message.substr(1);
          if(message.length > 0) {
            mp.invoke("command", message);
          }
        } else {
          mp.invoke("chatMessage", message);
        }
      } 
      chatAPI.show(false, true);
      chat.input.val('');
    }
  });

  $(":input").on('propertychange input', (e) => {
    let value = chat.input.val();
    let type = $(".type");
    if(value.charAt(0) == "/") {
      return type.html("Cmd");
    }
    return type.html("Say");
  });


});