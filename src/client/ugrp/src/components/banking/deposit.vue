<template>
  <div class="withdraw">
    <div class="row align-items-center">
      <div class="col-9">
        <h2>Enter deposit amount</h2>
        <div class="fader"> 
          <div class="fader-content">
            <div class="balance"><span>$</span> <cleave v-model="depositAmount" class="money" :options="$parent.options" name="" placeholder="..."></cleave></div>
            <h2>New Balance: ${{ $parent.toMoney(calculate()) }} </h2>
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
          <button class="button margin float-right" @click="deposit">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import numeral from 'numeral'

  export default Vue.component('Deposit', {
    data() {
      return {
        depositAmount: 0,
      };
    },
    created() {

    },
    methods: {
      update() {
        let cleave = new cleave('.money', {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand'
        });
      },
      calculate() {
        return numeral(this.$parent.balance).value() + numeral(this.depositAmount).value();
      },
      deposit() {
        // do player cash from client and do some checks
        this.$parent.balance = numeral(this.$parent.balance).value() + numeral(this.depositAmount).value();
        this.depositAmount = 0;
        this.$parent.currentPage = 'Dashboard';
      }
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