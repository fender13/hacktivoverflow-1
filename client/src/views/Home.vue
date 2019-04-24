<template>
  <div class="home">
    <MainNavbar></MainNavbar>
    <div class="row">
      <div class="col-2">
        
      </div>
      <div class="col-7">
        <HomeQuestionsCard></HomeQuestionsCard>
      </div>
      <div class="col-3">
        <div>
          <p>Saved Tags</p>
        </div>
        <div>
          <ul>
            <li v-for="(tag, index) in tags" :key="index"><router-link  :to="{ name: 'ViewByTag', params: { tag: tag.tagName} }"><p class="title">{{ tag.tagName }}</p></router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../database/server";
import MainNavbar from '@/components/Navbar.vue'
import HomeQuestionsCard from '@/components/HomeQuestionsCard.vue'

export default {
  name: 'home',
  data() {
    return {
      tags: []
    }
  },
  components: {
    MainNavbar,
    HomeQuestionsCard
  },
  mounted() {
    this.getAllWatchedTags()
  },
  computed: {
    isLogin(state) {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    getAllWatchedTags() {
      axios
        .get('/tags')
        .then(({ data }) => {
          console.log(data.tagId, 'ini lgo')
          this.tags = data.TagId
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>
