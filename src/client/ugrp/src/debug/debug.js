require('./debug.scss');

// RAGEMP stubs
window.mp = {
  trigger(...args) {
    console.log('%c mp.trigger stub', 'background-color:#ffcc00');
    console.table(args);
  },
};

// fake login
window.vm.$store.dispatch('user/loginResult', true);

// toggle phone (p key)
/*document.addEventListener('keyup', (event) => {
  if (event.which === 80) {
    window.vm.$emit('phone--toggle');
  }
});*/

document.addEventListener('keyup', (event) => {
  if (event.which === 80) {
    
  }
});

// update phone time
setInterval(() => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  window.vm.$emit('phone--updateTime', { hour, minutes });
}, 1000);