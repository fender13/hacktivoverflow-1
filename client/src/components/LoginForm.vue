<template>
  <div class="login-form">
    <h2><img src="../assets/icon/login.png" alt="Login"> Login</h2>
    <div class="error-login-page">
      <p class="error-login">{{ errorLogin }}</p>
    </div>
    <div>
      <form class="form-container" id="form-login" v-on:submit.prevent="userLogin">
        <div class="row">
          <div class="col">
            <label for="username">Username</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">@</div>
              </div>
              <input v-model="username" type="text" class="form-control" id="username-login" placeholder="Enter username">
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div>
              <label for="password">Password</label>
              <input v-model="password" type="password" id="password-login" class="form-control" placeholder="Enter password">
              <small id="passwordHelpInline" class="text-muted">
              Must be 8-20 characters long.
              </small>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <input type="submit" class="btn btn-primary" value="Sign In" name="submit-login" id="submit-login">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    errorLogin(state) {
      return this.$store.getters.errorLogin
    }
  },
  methods: {
    userLogin() {
      this.$store.dispatch('userLogin', {
        username: this.username,
        password: this.password
      })
      this.username = ''
      this.password = ''
    }
  }
};
</script>

<style scoped>
.button-submit {
  background-color: #fc7753;
  border: none;
  margin-top: 2%;
}

.login {
  margin-top: 5%;
}

.error-login {
  text-align: center
}

.error-login p {
  font-size: 14px;
  color: red;
  font-weight: 400%;
}
</style>
