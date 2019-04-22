<template>
  <div class="container">
    <div id="banking" :class="{'visible': visible}">
      <div class="row">
        <div class="col">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="59px" height="59px"><image  x="0px" y="0px" width="59px" height="59px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA7CAQAAABvLDo4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfjBBUVFgmx6q4JAAABxklEQVRYw+2Zv0vDQBTHP9fGqvgDK24iCi5dRP8JBzdFXAXd+5+I4KQiuAjiX6G4VApuLhZ0UkQQt1qtbXMOCSUXc8klmkG87xB4x8v73OW9O7gXIRuM4pKPBJI1roEVjhA+Z4Bjh1kGc4J68qKPMx0YKxfo5AqVSAB6ymi3kCtUq/+FdRSrxR0SEODnxJOgxxQzgZEXHjVTlswxkQ57wypdTbB1DgP2AXsIjecum+mwHZ61ns1Q8Fet50cSNJxbEZqGfoKlmJjFZKwT+do2i/39LNnh6ZuPl/kpqpT9PVnkgR2lIlJjN1gO2CcRWE+TVCn3rQa7oWNBq6hqlLwHrE9NkQH0eAtYTdO1/nTfCk0154zNLIu1WIu1WIu1WIu1WIu1WIu1WIu1WFUZ77XpsSpI+k/j+3tW7IBitWI8gx1bEU1wMNUFW/21FajHeO5z7neOJdD4Gfaee0PPGrUkl+SPLGK6am2l7+7GdOFDMZJXK1igGMqsp0/mlTyOsUQ3ssbbVNJiHU61qxAKtsIVbiRWhpuFJrk1/5cwZOr4x06pX8VmPHOyYEcC1igCEOY5yqhhhzNKfqUWucUFelzSNumBZ5RD/QtEtV4YVYaw6wAAAABJRU5ErkJggg==" /></svg>
            <h1>Maze<span>Bank</span></h1>
          </div>
        </div>
      </div>
      <component :is="currentPage"></component>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  import Dashboard from './dashboard.vue';

  export default Vue.component('user-banking', {
    data() {
      return {
        visible: false,
        currentPage: 'Dashboard',
        balance: 500
      };
    },
    created() {
      this.$root.$on('banking--toggle', (toggle) => {
        console.log('test');
        const state = (typeof toggle === 'undefined') ? !this.visible : toggle;
        this.visible = state;
      });
    },
    methods: {
      change(page) {
        this.currentPage = page;
        this.visible = true;
      }
    },
  });
</script>

<style lang="scss">
  #banking {
    display: none;
    border-radius: 3px;
    background-image: -moz-linear-gradient( 90deg, rgb(18,38,63) 0%, rgb(15,50,94) 100%);
    background-image: -webkit-linear-gradient( 90deg, rgb(18,38,63) 0%, rgb(15,50,94) 100%);
    background-image: -ms-linear-gradient( 90deg, rgb(18,38,63) 0%, rgb(15,50,94) 100%);
    opacity: 0.969;
    box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.27),inset 0px 2px 3px 0px rgba(9, 22, 37, 0.3);
    width: 1000px;
    z-index: 3;
    padding: 50px 0;
    box-sizing: border-box;

    color: white;
    
    &.visible {
      display: block;
    }

    .logo {
      float: right;
      padding: 0 50px;

      h1 {
        display: inline-block;
        vertical-align: top;
        font-size: 30px;
        position: relative;
        bottom: 6px;
        line-height: 36px;
        margin-left: 5px;

        span {
          display: block;
        }
      }
    }

    h2 {
      padding: 0 50px;
      font-size: 24px;
      text-transform: uppercase;
      font-weight: 400;
    }

    .buttons {
      padding: 50px 50px 0 50px;
    }

    button {
      border-radius: 3px;
      background-image: -webkit-linear-gradient( 90deg, rgb(18,64,122) 0%, rgb(18,70,136) 100%);
      z-index: 27;
      font-size: 19px;
      color: white;
      text-transform: uppercase;
      font-weight: 500;
      padding: 15px 50px;
      outline: none;
      border: 2px solid rgba(255, 255, 255, 0.05);
      
      &.float-right {
        width: 274px;
      }
      
      &:hover {
        background: none;
        border-color: rgba(255, 255, 255, 0.5);
      }

      &.back {
        background-image: -webkit-linear-gradient( 90deg, rgb(39,46,55) 0%, rgb(50,56,63) 100%);

        &:hover {
          background: none;
        }
      }

      &.deposit {
        margin-top: 47px;
      }

      &.margin {
        margin-top: 20px;
      }
    }

    .fader {
      width: 100%;
      position: relative;

      &:before, &:after {
        content: "";
        width: 100%;
        height: 1px;
        background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0) 100%);
        position: absolute;
        top: 0;
      }

      &:after {
        bottom: 0;
        top: inherit;
      }

      .fader-content {
        padding: 25px 50px 15px 50px;
        box-sizing: border-box;

        h2 {
          font-size: 22px;
          padding: 0;
          font-weight: 600;
          margin: 0;
        }

        .balance {
          font-size: 40px;
          font-weight: 600;
        }
      }
    }
    
  }
</style>