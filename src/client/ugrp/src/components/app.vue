<template>
  <div id="app">
    <div v-if="!loggedIn" class="wrapper auth-container">
      <UserLogin v-if="accountExists"></UserLogin>
      <UserRegister v-else></UserRegister>
    </div>

    <div v-if="loggedIn" class="wrapper auth-container">
      <user-banking></user-banking>
    </div>

    <notifications position="bottom right" class="notify"></notifications>
    <hud-phone ref="phone"></hud-phone>
  </div>
</template>

<script>
  import store from '../store';
  import { mapState } from 'vuex';

  import UserLogin from './user/login.vue';
  import UserRegister from './user/register.vue';

  import Banking from './banking/banking.vue';

  //
  import PhoneHUD from './hud/phone.vue';
  import Notify from './hud/notifications.vue';

  export default {
    el: '#app',
    store,
    components: {
      UserLogin, UserRegister, 
      PhoneHUD, Notify, Banking,
    },
    created() {
      this.$on('send', data => mp.trigger('sendData', JSON.stringify(data)));
      this.$on('doesAccountExist', data => this.$store.dispatch('user/accountExists', data));
      this.$on('notify', data => {
        this.$root.$emit('showNotification', data);
      });
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

  .notify {
    bottom: 100px !important;
    right: 5px !important;

    .vue-notification {
      border-bottom: 4px solid #187fe7 !important;
      border-left: none;
      background: rgba(0, 0, 0, 0.6) !important;

      &.warn {
        border-color: #f48a06 !important;
      }

      &.error {
        border-color: #B82E24 !important;
      }

      &.success {
        border-color: #42A85F !important;
      }
    }
  }

  .auth-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
