<template>
  <div class="app-container messages-app">
    <header class="header">
      <h2>Messages</h2>
    </header>
    <nav class="messages">
      <button v-for="(message, idx) in messages" :key="idx" class="message no-gutters" @click="viewing = message">
        <div class="col-auto">
          <span v-if="!message.read" class="message__unread"></span>
          <div class="message__photo" v-html="getInitials(message.sender)"></div>
        </div>
        <div class="col">
          <h3 class="message__sender">{{ message.sender }}</h3>
          <p class="message__excerpt">{{ message.message.replace(/^(.{40}[^\s]*).*/, '$1') }}</p>
        </div>
      </button>
    </nav>
    <div v-if="viewing">
      {{ viewing.message }}
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('MessagesApp', {
    data() {
      return {
        viewing: null,
        messages: [
          {
            sender: 'John Smith',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae orci eleifend magna dictum porta quis mattis sapien. Etiam purus eros, scelerisque a sapien ut, sagittis vulputate nibh.',
            timestamp: 1555344507,
            read: false,
          },
          {
            sender: 'Kristina Jenkins',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae orci eleifend magna dictum porta quis mattis sapien. Etiam purus eros, scelerisque a sapien ut, sagittis vulputate nibh.',
            timestamp: 1555344507,
            read: true,
          },
          {
            sender: 'Alfred Burns',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae orci eleifend magna dictum porta quis mattis sapien. Etiam purus eros, scelerisque a sapien ut, sagittis vulputate nibh.',
            timestamp: 1555344507,
            read: true,
          },
          {
            sender: 'Terry Jones',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae orci eleifend magna dictum porta quis mattis sapien. Etiam purus eros, scelerisque a sapien ut, sagittis vulputate nibh.',
            timestamp: 1555344507,
            read: true,
          },
        ],
      };
    },
    methods: {
      getInitials(name) {
        const parts = name.split(' ');
        return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .messages-app {
  }

  .header {
    background-color: #e8e8e8;
    border-bottom: 1px solid #d6d6d6;
    margin: 0;

    h2 {
      padding: 10px;
      margin: 0;
    }
  }

  .messages {
    max-height: 427px;
    overflow-x: hidden;
    overflow-y: overlay;
  }

  .message {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #ffffff;
    text-align: left;
    padding: 10px 20px;
    border: none;
    -webkit-appearance: none;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 5%;
      width: 90%;
      height: 1px;
      background-color: #d6d6d6;
    }

    .message__unread {
      position: absolute;
      top: 50%;
      left: -15px;
      width: 10px;
      height: 10px;
      margin-top: -5px;
      background-color: #2762e0;
      border-radius: 50%;
    }

    .message__photo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 50%;
      margin-right: 15px;
      background-color: #a9a9a9;
      background: linear-gradient(#a9a9a9, #808080);
      color: #ffffff;
      user-select: none;
    }

    .message__sender {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 2px;
    }

    .message__excerpt {
      font-size: 13px;
      color: #888888;
      margin-bottom: 0;
    }
  }
</style>