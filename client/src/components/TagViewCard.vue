<template>
  <div>
    <div class="row home-title">
      <div class="col-6 top-questions">
        <h5>Top Questions by Tag {{ tagName }}</h5>
      </div>
      <div class="col-6 buton-askquestion">
        <div v-if="!saved && isLogin" class="button-container">
          <button class="btn btn-primary" @click.prevent="saveTag">Save Tag</button>
        </div>
        <div v-else-if="saved && isLogin" class="button-container">
          <button class="btn btn-primary" @click.prevent="unsavedTag">Unsaved Tag</button>
        </div>
        <div>
          <button class="btn btn-primary" @click.prevent="onClickAddNew">Ask Question</button>
        </div>
      </div>
    </div>
    <div class="row question-row" v-for="(data, index) in items" :key="index">
      <div class="col-1 main-question">
          <div class="box-container">
              <div class="boxes">
                <p class="title">{{ data.voteUp.length - data.voteDown.length }}</p>
              </div>
              <div class="legend">
                <p>votes</p>
              </div>
          </div>
      </div>
      <div class="col-1 main-question">
          <div class="box-container">
              <div class="boxes">
                <p class="title">{{ data.answer.length }}</p>
              </div>
              <div class="legend">
                <p>answers</p>
              </div>
          </div>
      </div>
      <div class="col-10 main-question">
          <div>
              <div>
                <!-- <h5 class="title">{{ data.title }}</h5> -->
                <router-link  :to="{ name: 'QuestionPage', params: { id: data._id, title: data.title} }"><h5 class="title">{{ data.title }}</h5></router-link>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../database/server";
import router from '@/router'

export default {
  name: 'ViewByTagCard',
  data() {
    return {
      id: '',
      items: [],
      tagName: '',
      saved: false,
      watchedId: ''
    }
  },
  mounted() {
    this.getAllQuestions(this.$route.params.tag)
  },
  computed: {
    isLogin(state) {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    getAllQuestions(tag) {
      this.tagName = tag

      axios
        .get(`/tags/${tag}`)
        .then(({ data }) => {
          this.id = data._id
          this.items = data.QuestionId
          this.checkSavedTags()
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    checkSavedTags() {
      axios
        .post(`/tags/verify`, {
          tagId: this.id
        })
        .then(({ data }) => {
          this.saved = true
          this.watchedId = data._id
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    onClickAddNew() {
      router.push('/dashboard/add-new-questions')
    },
    saveTag() {
      axios
        .post(`/tags/watched`, {
          tagId: this.id
        })
        .then(({ data }) => {
          this.watchedId = data._id
          this.saved = true
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    unsavedTag() {
      axios
        .post(`/tags/remove-tag/${this.watchedId}`, {
          tagId: this.id
        })
        .then(({ data }) => {
          this.saved = false
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
.home {
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
  min-height: 100vh;
}

.home-title {
  margin-top: 2%;
  margin-bottom: 3%;
  display: flex;
  height: 10%;
  align-items: center
}

.top-questions {
  display: flex;
  align-items: center;
  margin: 0;
}

.buton-askquestion {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}


.question-row {
  border-top: 1px solid #e4e6e8;
}

.main-question {
  margin-top: 5%;
}

.box-container {
  text-align: center;
  display: table;
  text-align: center;
}

.boxes {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.legend p {
  text-align: center;
  font-size: 12px
}

.main-question {
  width: 100%;
  /* margin-left: 2%; */
}

.button-container {
  margin-right: 5%;
}
</style>
