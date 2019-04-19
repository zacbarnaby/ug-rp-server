<template>
  
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('notifications', {
    data() {
      return {
        
      };
    },
    created() {
      this.$root.$on('showNotification', (data) => {
        data = JSON.parse(data);
        this.$notify({
          title: (typeof data.text === 'undefined') ? '' : data.title,
          text: (typeof data.text === 'undefined') ? '' : data.text,
          type: (typeof data.type === 'undefined') ? 'info' : data.type,
          duration: (typeof data.duration === 'undefined') ? 3000 : data.duration
        });
      });
    },
    methods: {

    },
  });
</script>

<style lang="scss" scoped>
  
</style>