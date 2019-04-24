<template>
  <div>
    <div class="row home-title">
      <div class="col-6 top-questions">
        <h5>Top Questions</h5>
      </div>
      <div class="col-6 buton-askquestion">
        <button class="btn btn-primary" @click.prevent="onClickAddNew">Ask Question</button>
      </div>
    </div>
    <div class="row question-row" v-for="(data, index) in items" :key="index">
      <div class="col-1 main-question">
          <div class="box-container">
              <div class="boxes">
                <p class="title">{{ data.voteUp.length - data.voteDown.length }}</p>
                  <!-- <router-link  :to="{ name: 'QuestionPage', params: { id: data._id, title: data.title} }"><p class="title">{{ data.voteUp.length - data.voteDown.length }}</p></router-link> -->
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
                <!-- <router-link  :to="{ name: 'QuestionPage', params: { id: data._id, title: data.title} }"><p class="title">{{ data.answer.length }}</p></router-link> -->
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
  name: 'HomeQuestionsCard',
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.getAllQuestions()
  },
  methods: {
    getAllQuestions() {
      axios
        .get('/questions')
        .then(({ data }) => {
          this.items = data
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    onClickAddNew() {
      router.push('/dashboard/add-new-questions')
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
  text-align: right;
}

.buton-askquestion {
  text-align: right;
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
</style>
