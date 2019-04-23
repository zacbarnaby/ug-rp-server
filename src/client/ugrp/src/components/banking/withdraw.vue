<template>
  <div class="withdraw">
    <div class="row align-items-center">
      <div class="col-9">
        <h2>Enter withdrawal amount</h2>
        <div class="fader"> 
          <div class="fader-content">
            <div class="balance"><span>$</span> <cleave v-model="withdrawAmount" @input="checkHasAmount" class="money" :options="$parent.options" name="" placeholder="..."></cleave></div>
            <h2>Available Balance: ${{ $parent.toMoney($parent.balance) }} </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-end">
      <div class="col">
        <div class="buttons">
          <button class="back" @click="$parent.change('Dashboard')">Back</button>
        </div>
      </div>
      <div class="col">
        <div class="buttons">
          <button class="button margin float-right" @click="withdraw">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import numeral from 'numeral';

  export default Vue.component('Withdraw', {
    data() {
      return {
        withdrawAmount: 0,
      };
    },
    created() {

    },
    methods: {
      checkHasAmount() {
        if(this.withdrawAmount >= this.$parent.balance) {
          this.withdrawAmount = this.$parent.balance;
        }
      },
      withdraw() {
        if(this.withdrawAmount <= this.$parent.balance) {
          this.$parent.balance = numeral(this.$parent.balance).value() - numeral(this.withdrawAmount).value();
          this.withdrawAmount = 0;
          this.$parent.currentPage = 'Dashboard';
        }
      }
    },
    mounted() {
      this.withdrawAmount = 0;
      this.$el.addEventListener("keypress", (e) => {
        console.log('test');
        if(this.withdrawAmount >= this.$parent.balance) {
          e.preventDefault();
          this.withdrawAmount = this.$parent.balance;
        }
      });
    }
  });

  
</script>

<style lang="scss">
  .withdraw {

    .fader {

      h2 {
        font-size: 19px !important;
        font-weight: 400 !important;
      }

      .money {
        background: none;
        font-size: 40px;
        font-weight: 600;
        color: white;
        border: none;
        margin-bottom: 20px;
        width: 50%;
      }
    }
    
  }
</style>