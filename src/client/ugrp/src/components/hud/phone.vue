<template>
  <div id="phone" :class="{'visible': visible}">
    <div class="screen">
      <div class="top-bar">
        <span class="time">{{ currentTime }}</span>
      </div>
      <div class="screen-container">
        <div class="springboard">
          <button v-for="(app, idx) in apps" :key="idx" class="app" :ref="app.component" @click="openApp(app)">
            <img v-if="app.icon" :src="require(`../../assets/icons/${app.icon}.svg`)" />
            <h3>{{ app.title }}</h3>
          </button>
        </div>
        <transition name="scale" v-on:before-enter="beforeTransitionEnter">
          <component :is="currentApp"></component>
        </transition>
      </div>
    </div>
    <button @click="currentApp = ''">Home</button>
  </div>
</template>

<script>
  import Vue from 'vue';

  // app phone apps must be imported before <component> will work.
  import MessagesApp from './phone-apps/messages.vue';
  import SettingsApp from './phone-apps/settings.vue';

  export default Vue.component('hud-phone', {
    data() {
      return {
        visible: false,
        currentTime: '',
        currentApp: '',
        transformOrigin: [0, 0],
        apps: [
          { title: 'Messages', icon: 'phone-sms-icon', component: 'MessagesApp' },
          { title: 'Phone', icon: 'phone-call-icon' },
          { title: 'Camera', icon: 'phone-camera-icon' },
          { title: 'Settings', icon: 'phone-settings-icon', component: 'SettingsApp' },
        ],
      };
    },
    created() {
      // toggle phone visibility
      this.$root.$on('phone--toggle', (toggle) => {
        const state = (typeof toggle === 'undefined') ? !this.visible : toggle;
        this.visible = state;
      });

      // update current game time
      this.$root.$on('phone--updateTime', data => this.currentTime = this.formatTime(data));
    },
    methods: {
      beforeTransitionEnter(el) {
        // update the elements transform origin
        el.style.transformOrigin = `${this.transformOrigin[0]}px ${this.transformOrigin[1]}px`;
      },
      openApp(app) {
        const phoneRect = this.$el.getBoundingClientRect();
        const button = this.$refs[app.component][0];
        const buttonRect = button.getBoundingClientRect();

        // calculate the relative offset from the phone to the app icon
        const x = Math.abs(phoneRect.left - buttonRect.left) + (buttonRect.width / 2);
        const y = Math.abs(phoneRect.top - buttonRect.top);

        this.transformOrigin = [x, y];
        this.currentApp = app.component;
      },
      formatTime({ hour, minutes }) {
        return [hour, minutes]
          .map((num) => `0${num}`.slice(-2))
          .join(':');
      },
    },
  });
</script>

<style lang="scss" scoped>
  #phone {
    position: absolute;
    bottom: 50px;
    right: 50px;
    width: 300px;
    height: 500px;
    transform: translateY(calc(100% + 50px));
    transition: transform 150ms linear;

    &.visible {
      transform: none;
    }

    .screen-container {
      position: relative;
      margin-top: 30px;
    }

    .top-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 4px;
      text-align: center;
      z-index: 10;
    }

    .screen {
      position: relative;
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 1px;
      overflow: hidden;
      z-index: 3;

      .top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 5px;
        text-align: center;
        z-index: 10;
      }

      .springboard {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: repeat(4, calc(25% - 15px));
        grid-template-rows: repeat(9, 1fr);
        grid-column-gap: 15px;
        grid-row-gap: 15px;
        padding: 0 20px 20px 20px;
      }

      .app {
        background-color: white;
        border-radius: 20%;
        padding: 0;
        border: none;
        background: none;
        -webkit-appearance: none;

        h3 {
          font-size: 11px;
          font-weight: bold;
          margin-top: 3px;
        }
      }
    }
  }

  .app-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  .scale-enter-active {
    animation: scale-in 150ms;
  }

  .scale-leave-active {
    animation: scale-in 150ms reverse;
  }

  @keyframes scale-in {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }
</style>