import Vue from 'vue';
import Vuex from 'vuex';

// modules
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  modules: {
    user,
  },
  state: {},
});

export default store;