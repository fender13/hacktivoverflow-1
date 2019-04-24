<template>
  <div class="all-questions">
    <div class="page-title">
      <h1>All Questions</h1>
    </div>
    <div class="table-userpost" v-if="items.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Answers</th>
            <th scope="col">Votes</th>
            <th scope="col">Best Answer</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <th scope="row">1</th>
            <td><router-link  :to="{ name: 'QuestionPage', params: { id: item._id, title: item.title} }"><p class="title">{{ item.title }}</p></router-link></td>
            <td>{{ item.answer.length }}</td>
            <td>{{ item.voteUp.length - item.voteDown.length }}</td>
            <td v-if="item.bestAnswer == null">false</td>
            <td v-else>true</td>
            <td>
              <router-link :to="{ name: 'UpdateQuestions', params: { id: item._id } }"><a href="#">Edit</a></router-link>
              <!-- <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Options
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" v-on:click.prevent="deleteArticle(item)">Delete Questions</a>
              </div> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="list-question-empty" v-else>
      <div class="information">
        <h5>You do not have any questions yet. Please add your questions!!</h5>
      </div>
      <div class="rocket">
        <img src="../assets/rocket.png" alt="rocket">
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/database/server'
  
  export default {
    name: 'DashboardQuestionList',
    data() {
      return {
        items: []
      }
    },
    computed: {
      
    },
    mounted() {
      // Set the initial number of items
      this.getAllQuestionsList()
    },
    methods: {
      getAllQuestionsList() {
        axios
          .get('/questions/user')
          .then(({ data }) => {
            this.items = data
          })
          .catch(({ response }) => {
            console.log(response)
          })
      }
    }
  }
</script>

<style scoped>
.all-questions {
  width: 100%;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

.list-question-empty {
  text-align: center
}

.information h5 {
  margin-bottom:8%;
}

.rocket img {
  width: 15%;
}

.page-title {
  margin-bottom: 5%;
}
</style>
