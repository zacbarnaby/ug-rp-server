<template>
  <div>
    <div class="row align-items-center">
      <div class="col-9">
        <h2>Please select an option</h2>
        <div class="fader"> 
          <div class="fader-content">
            <h2>Available Balance:</h2>
            <div class="balance">${{ $parent.toMoney($parent.balance) }}</div>
          </div>
        </div>
      </div>
      <div class="col">
        <button class="button deposit" @click="$parent.change('Deposit')">Deposit</button>
      </div>
    </div>
    <div class="row align-items-end">
      <div class="col">
        <div class="buttons">
          <button class="back">Close</button>
        </div>
      </div>
      <div class="col">
        <div class="buttons">
          <button class="button margin float-right" @click="$parent.change('Withdraw')">Withdraw Cash</button>
          <button class="button margin float-right">Money Transfer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  import Withdraw from './withdraw.vue';
  import Deposit from './deposit.vue';

  export default Vue.component('Dashboard', {
    data() {
      return {
        
      };
    },
    created() {

    },
    methods: {
      
    },
  });
</script>

<style lang="scss">

</style>