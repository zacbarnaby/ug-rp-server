<template>
  <div id="app">
    <div v-if="!loggedIn" class="wrapper auth-container">
      <UserLogin v-if="accountExists"></UserLogin>
      <UserRegister v-else></UserRegister>
    </div>

    <hud-phone ref="phone"></hud-phone>
  </div>
</template>

<script>
  import store from '../store';
  import { mapState } from 'vuex';

  import UserLogin from './user/login.vue';
  import UserRegister from './user/register.vue';

  //
  import PhoneHUD from './hud/phone.vue';

  export default {
    el: '#app',
    store,
    components: {
      UserLogin, UserRegister,
      PhoneHUD,
    },
    created() {
      this.$on('send', data => mp.trigger('sendData', JSON.stringify(data)));
      this.$on('doesAccountExist', data => this.$store.dispatch('user/accountExists', data));
    },
    computed: mapState({
      loggedIn: s => s.user.loggedIn,
      accountExists: s => s.user.accountExists,
    }),
  };
</script>

<style lang="scss">
  * {
    outline: none;
    user-select: none;
  }

  body {
    position: relative;
    overflow: hidden;
    
    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
    }
  }

  .auth-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
