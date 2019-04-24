<template>
  <div id="app">
    <div class="main">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
</style>
