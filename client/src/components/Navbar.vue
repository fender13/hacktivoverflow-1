<template>
  <div class="navbar-container">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <div class="navbar-header">
          <router-link to="/">
            <img src="../assets/logo/logo-overflow.png" alt="Hacktiv-Overflow">
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" v-if="isLogin">      
              <router-link to="/dashboard"><a class="nav-link">Dashboard</a></router-link>
            </li>
            <li class="nav-item" v-if="!isLogin">
              <router-link to="/member-area"><a class="nav-link">Login</a></router-link>
            </li>
            <li class="nav-item" v-if="isLogin">
              <a class="nav-link" href="#" v-on:click.prevent="onClickLogout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainNavbar",
  computed: {
    isLogin(state) {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    onClickLogout() {
      this.$store.dispatch('userLogout')
    }
  }
};
</script>

<style scoped>
.navbar-container {
  max-width: 100%;
}

img {
  width: 130px;
}

a:active {
  border: none;
}
</style>