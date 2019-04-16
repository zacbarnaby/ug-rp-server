<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5 col-xl-4 my-5">
        <div v-if="!success && error" class="alert alert-danger fade show text-center" role="alert">
          {{ error }}
        </div>
        <div class="card">
          <div class="card-body">
            <h1 class="display-4 text-center mb-3">Rage</h1>
            <p class="text-muted text-center mb-5">Enter a password to sign up.</p>
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="register-username">Username</label>
                <input type="text" id="register-username" class="form-control" placeholder="Enter your username" v-model="username" />
              </div>
              <div class="form-group">
                <label for="register-password">Password</label>
                <div class="input-group input-group-merge">
                  <input type="password" id="register-password" class="form-control form-control-appended" placeholder="Enter your password"  v-model="password" />
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fe fe-eye"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group input-group-merge">
                  <input type="password" id="register-password-confirm" class="form-control form-control-appended" placeholder="Confirm your password" v-model="confirmPassword" />
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fe fe-eye"></i>
                    </span>
                  </div>
                </div>
              </div>
              <button class="btn btn-lg btn-block btn-primary mb-3" :disabled="sent">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.component('UserRegister', {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        sent: false,
        success: false,
        error: '',
      };
    },
    created() {
      this.$root.$on('authResult', (data) => {
        const { success, error } = JSON.parse(data);

        this.sent = false;
        this.success = success;
        this.error = error;
        this.$store.dispatch('user/loginResult', success);
      });
    },
    methods: {
      register() {
        this.sent = false;
        this.success = false;
        this.error = '';

        // no username/password entered
        if (this.username.length === 0 || this.password.length === 0 || this.confirmPassword.length === 0) {
          this.error = 'Please enter a username and password.';
          return;
        }

        // passwords don't match
        if (this.password !== this.confirmPassword) {
          this.error = 'Your chosen passwords do not match.';
          return;
        }

        this.sent = true;

        //
        const { username, password } = this;
        this.$root.$emit('send', { action: 'register', username, password });
      },
    },
  });
</script>