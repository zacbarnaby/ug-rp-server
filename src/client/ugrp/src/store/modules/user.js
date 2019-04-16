const getters = {
  loggedIn: state => state.loggedIn === true,
  accountExists: state => state.accountExists === true,
};

const actions = {
  loginResult({ commit }, data) {
    commit('updateLoginStatus', data);
  },
  accountExists({ commit }, data) {
    commit('updateAccountExistsStatus', data);
  },
};

const mutations = {
  updateLoginStatus: (state, status) => {
    state.loggedIn = status;

    console.log('updateLoginStatus', status);
  },
  updateAccountExistsStatus: (state, exists) => {
    state.accountExists = exists;

    console.log('updateAccountExistsStatus', exists);
  },
};

const state = {
  loggedIn: false,
  accountExists: true,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};