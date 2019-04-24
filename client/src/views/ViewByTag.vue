<template>
  <div class="home">
    <MainNavbar></MainNavbar>
    <div class="row">
      <div class="col-2">
        
      </div>
      <div class="col-7">
        <ViewByTagCard></ViewByTagCard>
      </div>
      <div class="col-3">
        
      </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar.vue'
import ViewByTagCard from '@/components/TagViewCard.vue'

export default {
  name: 'ViewByTag',
  data() {
    return {

    }
  },
  components: {
    MainNavbar,
    ViewByTagCard
  }
}
</script>

<style scoped>

</style>
