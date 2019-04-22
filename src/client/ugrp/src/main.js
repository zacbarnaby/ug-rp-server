import Vue from 'vue'
import App from './components/app.vue';
import Notifications from 'vue-notification';

import './assets/theme-dark.min.css';
import './assets/feather.min.css';

const vm = new Vue(App);
window.receive = (eventName, ...args) => vm.$emit.apply(vm, [eventName, ...args]);

Vue.use(Notifications);

//window.vm.$store.dispatch('user/loginResult', true);

// probably running in the browser
if (process.env.mode === 'development') {
  window.vm = vm;
  require('./debug/debug');
}
