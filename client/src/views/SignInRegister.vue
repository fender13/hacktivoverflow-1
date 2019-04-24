<template>
  <div class="page member-area">
    <MainNavbar></MainNavbar>
    <div class="member-container">
      <div class="member-area">
        <div class="container">
          <div class="row">
            <div class="col-6 member-area">
              <div>
                <div class="member-title">
                  <h2>Login - Register</h2>
                </div>
                <div class="introduce">
                  <p style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div class="log-button" v-if="loginOptions == false">
                  <button class="btn btn-primary page-member onLogin-button" v-on:click="changeOptions">Login</button>
                </div>
                <div class="reg-button" v-else>
                  <button class="btn btn-primary page-member onRegister-button" v-on:click="changeOptions">Register</button>
                </div>
              </div>
            </div>
            <div class="col-6">
              <RegisterForm v-if="loginOptions == false"></RegisterForm>
              <LoginForm v-else></LoginForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar.vue'
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "SignInRegister",
  components: {
    LoginForm,
    RegisterForm,
    MainNavbar
  },
  data() {
    return {
      loginOptions: true
    }
  },
  methods: {
    changeOptions() {
      if (this.loginOptions == true) {
        this.loginOptions = false
      } else {
        this.loginOptions = true
      }
    }
  }
};
</script>

<style scoped>
.member-container {
  margin-top: 4%;
  height: 100vh;
}

.button-submit {
  background-color: #fc7753;
  border: none;
  margin-top: 2%;
}

.member-title {
  text-align: center;
}

.log-button, .reg-button {
  text-align: center;
}
</style>
