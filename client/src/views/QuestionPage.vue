<template>
  <div>
    <MainNavbar></MainNavbar>
    <div class="main-page">
      <div class="row">
        <div class="col-2">
          
        </div>
        <div class="col-7">

          <div class="row">
            <div class="question-title">
              <h1>{{ title }}</h1>
            </div>
            <div class="row question-card">
              <div class="col-2" align="center">
                <div class="row">

                  <div class="vote-box up-arrow">
                    <a href="#" @click.prevent="updateVoteUpQuestion"><img src="../assets/icon/up.png" alt="up"></a>
                  </div>

                </div>
                <div class="row">

                  <div class="vote-box">
                    <p>{{ voteUp - voteDown }}</p>
                  </div>

                </div>
                <div class="row">

                  <div class="vote-box down-arrow">
                    <a href="#" @click.prevent="updateVoteDownQuestion"><img src="../assets/icon/down.png" alt="down"></a>
                  </div>

                </div>
              </div>
              <div class="col-10">
                <div class="question-error" v-if="error != ''">
                  <p>{{ error }}</p>
                </div>
                <div class="row">
                  <p v-html="question">{{ question }}</p>
                </div>
                <div class="row editable">
                  <div class="col-6">
                    <div class="row" v-if="isLogin">
                      <div class="col-4">
                        <a href="#" v-on:click.prevent="toUpdateQuestion">Edit</a>
                      </div>
                      <div class="col-4 set-col">
                        <a href="#" v-on:click.prevent="deleteQuestion">Delete</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 ownership">
                    <div>
                      <p><em>by: {{ questionOwner }}</em></p>
                    </div>
                  </div>
                </div>
                <div class="row garis-tag">
                  <p>Tags: <span class="w3-tag w3-blue main-tag" v-for="(tag, index) in tags" :key="index">
                    <a href="#" v-on:click.prevent="toViewByTag(tag)">{{ tag }}</a>
                    </span></p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
              <h5>Answers {{ answers.length }}</h5>
              <div class="row answer-card" v-for="(answer, index) in answers" :key="index">
                  <div class="col-2" align="center">
                      <div class="row">
                          <div class="vote-box up-arrow">
                              <a href="#" @click.prevent="updateVoteUpAnswer(answer._id)"><img src="../assets/icon/up.png" alt="up"></a>
                          </div>
                      </div>
                      <div class="row">
                          <div class="vote-box">
                              <p>{{ answer.voteUp.length - answer.voteDown.length }}</p>
                          </div>
                      </div>
                      <div class="row">
                          <div class="vote-box down-arrow">
                              <a href="#" @click.prevent="updateVoteDownAnswer(answer._id)"><img src="../assets/icon/down.png" alt="down"></a>
                          </div>
                      </div>
                      <div class="row mt-3 ok-answer" v-if="isAnswered">
                          <img src="../assets/icon/true.png" alt="okanswer">
                      </div>
                  </div>
                  <div class="col-10">
                      <div class="question-error" v-if="answerError != '' && answerIdError == answer._id">
                        <p>{{ answerError }}</p>
                      </div>
                      <div class="row main-question">
                          <p v-html="answer.answer">{{ answer.answer }}</p>
                      </div>
                      <div class="row editable">
                          <div class="col-6">
                              <div class="row" v-if="isLogin">
                                  <div class="col-4">
                                      <a href="#" @click.prevent="updateGetAnswer(answer._id)">Edit</a>
                                  </div>
                                  <div class="col-4 set-col">
                                      <a href="#" @click.prevent="deleteAnswer(answer._id)">Delete</a>
                                  </div>
                                  <div class="col-4 set-col" v-if="!isAnswered" @click.prevent="updateBestAnswer(answer._id)">
                                      <a href="#" v-if="getUserId">Set Answer</a>
                                  </div>
                              </div>
                          </div>
                          <div class="col-6 ownership">
                              <p><em>by: {{ answer.UserId.username }}</em></p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="row answer-form" v-if="updateAnswerForm == false">
            <form v-on:submit.prevent="addAnswer">
              <div>
                <h3>Please Submit Your Answer</h3>
              </div>
              <div class="mt-3">
                <ckeditor class="editor" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
              </div>
              <div class="mt-3 add-answer">
                <button class="btn btn-primary" type="submit">Submit Answer</button>
              </div>
            </form>
          </div>

          <div class="row answer-form" v-else>
            <form v-on:submit.prevent="updateAnswer">
              <div>
                <h3>Please Submit Your Update</h3>
              </div>
              <div class="mt-3">
                <ckeditor class="editor" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
              </div>
              <div class="mt-3 add-answer">
                <button class="btn btn-primary" type="submit">Submit Answer</button>
              </div>
            </form>
          </div>

        </div>

        <div class="col-3">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from '../database/server'
import router from '@/router'
import axi from '../database/server';

export default {
  name: 'QuestionPage',
  data() {
    return {
      isAnswered: false,
      getUserId: '',
      questionId: '',
      answerId: '',
      title: '',
      question: '',
      tags: [],
      answers: [],
      questionOwner: '',
      voteUp: 0,
      voteDown: 0,
      error: '',
      answerError: '',
      answerIdError: '',
      updateAnswerForm: false,
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the rich-text editor.
      },
    }
  },
  components: {
    MainNavbar
  },
  mounted() {
    this.getQuestion(this.$route.params.id)
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    // get question by id
    getQuestion(id) {
      axios
        .get(`/questions/${id}`)
        .then(({ data }) => {
          this.questionId = data._id
          this.title = data.title
          this.question = data.question
          this.tags = data.tags
          this.answers = data.answer
          this.questionOwner = data.UserId.username
          this.voteUp = data.voteUp.length
          this.voteDown = data.voteDown.length
          this.UserId = data.UserId
          this.sort()
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    // add and update vote up to a question
    updateVoteUpQuestion() {
      if (localStorage.getItem('token') == null) {
        router.push('/member-area')
      }

      axios
        .post(`/questions/add-vote/${this.questionId}`)
        .then(({ data }) => {
          // this.voteDown = this.voteDown - 1
          this.voteUp = data.voteUp.length
        })
        .catch(({ response }) => {
          if (response.data.error) {
            this.error = response.data.error
          } else {
            console.log(response)
          }
        })
    },
    // add and update vote down to a question
    updateVoteDownQuestion() {
      if (localStorage.getItem('token') == null) {
        router.push('/member-area')
      }

      axios
        .post(`/questions/reduce-vote/${this.questionId}`)
        .then(({ data }) => {
          // this.voteUp = this.voteUp -1
          this.voteDown = data.voteDown.length
        })
        .catch(({ response }) => {
          if (response.data.error) {
            this.error = response.data.error
          } else {
            console.log(response)
          }
        })
    },
    // add new answer
    addAnswer() {
      if (localStorage.getItem('token') == null) {
        router.push('/member-area')
      }

      axios
        .post(`/answers/${this.questionId}`, {
          answer: this.editorData
        })
        .then(({ data }) => {
          this.answers.push(data)
          this.editorData = ''
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    // add and update vote up to an answer
    updateVoteUpAnswer(id) {
      if (localStorage.getItem('token') == null) {
        router.push('/member-area')
      }

      axios
        .post(`/answers/add-vote/${id}`)
        .then(({ data }) => {
          for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i]._id == data._id) {
              this.answers[i].voteUp = data.voteUp
            }
          }
        })
        .catch(({ response }) => {
          if (response.data.error) {
            this.answerError = response.data.error
            this.answerIdError = id
          } else {
            console.log(response)
          }
        })
    },
    // add and update vote down to an answer
    updateVoteDownAnswer(id) {
      if (localStorage.getItem('token') == null) {
        router.push('/member-area')
      }

      axios
        .post(`/answers/reduce-vote/${id}`)
        .then(({ data }) => {
          for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i]._id == data._id) {
              this.answers[i].voteDown = data.voteDown
            }
          }
        })
        .catch(({ response }) => {
          if (response.data.error) {
            this.answerError = response.data.error
            this.answerIdError = id
          } else {
            console.log(response)
          }
        })
    },
    // delete an answer
    deleteAnswer(id) {
      swal("Are you sure you want to do this?", {
                buttons: ["Oh no!", true],
            })

        .then((result) => {
          if (result == true) {
            return axios
              .delete(`/answers/${id}`)
          }
        })
        .then(({ data }) => {
          for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i]._id == data._id) {
              this.answers.splice(i, 1)
            }
          }
        })
        .catch(({ response }) => {
          if (response.data.error) {
            this.answerError = response.data.error
            this.answerIdError = id
          } else {
            console.log(response)
          }
        })
    },
    // delete question
    deleteQuestion() {
      swal("Are you sure you want to do this?", {
                buttons: ["Oh no!", true],
            })

        .then((result) => {
          if (result == true) {
            return axios
              .delete(`/questions/${this.questionId}`)
          }
        })
        .then(({ data }) => {
          router.push('/')
        })
        .catch(({ response }) => {
          if (response.data.error) {
            this.error = response.data.error
            // this.answerIdError = id
          } else {
            console.log(response)
          }
        })
    },
    // update answer
    updateGetAnswer(id) {
      axios
        .get(`/answers/${id}`)
        .then(({ data }) => {
          this.updateAnswerForm = true
          this.answerId = data._id
          this.editorData = data.answer
        })
        .catch(({ response }) => {
          if (response.data.error) {
            this.answerError = response.data.error
            this.answerIdError = id
          } else {
            console.log(response)
          }
        })
    },
    updateAnswer() {
      if (localStorage.getItem('token') == null) {
        router.push('/member-area')
      }

      axios
        .put(`/answers/${this.answerId}`, {
          answer: this.editorData
        })
        .then(({ data }) => {
          console.log(data)
          for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i]._id == data._id) {
              // console.log(this.answerId[i], 'ini di vue')
              // console.log(data, 'ini data abru')
              this.answers.splice(i, 1)
            }
          }

          this.answerId = ''
          this.editorData = ''
          this.answers.push(data)
          this.updateAnswerForm = false
          this.sort()
        })
        .catch(({ response }) => {
          if (response.data.error) {
            this.answerError = response.data.error
            this.answerIdError = id
          } else {
            console.log(response)
          }
        })
    },
    toUpdateQuestion() {
      if (localStorage.getItem('token') == null) {
        router.push('/member-area')
      }
      
      router.push(`/dashboard/update-questions/${this.questionId}`)
    },
    toViewByTag(tag) {
      router.push(`/questions/${tag}`)
    },
    sort() {
      this.answers.sort(function (a, b) {
        return b.voteUp.length - a.voteUp.length;
      })
    },
  }

}
</script>


<style scoped>
.main-page {
  margin-top: 3%;
}

.questionPage {
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
  min-height: 100vh;
}

.question-card {
  border-top: 1px solid #e4e6e8;
  padding-top: 5%;
  margin-top: 3%;
  margin-bottom: 20%;
  width: 100%;
}

.answer-card {
  border-top: 1px solid #e4e6e8;
  padding-top: 5%;
  margin-bottom: 10%;
  margin-top: 3%;
  width: 100%;
}

.answer-form {
  border-top: 1px solid #e4e6e8;
  margin-top: 20%;
  padding-top: 5%;
}

.answer-form form {
  display: inline-block;
  width: 100%;
}

.question-title h1 {
  font-size: 2.07692308rem;
}

.up-arrow {
  margin-bottom: 10%;
}

.down-arrow {
  margin-top: 10%;
}

.vote-box {
  width: 40px;
}

.vote-box p {
  border: solid 1px black;
}

.vote-box p {
  display: flex;
  align-items: center;
  justify-content: center;
}

.votes {
  align-items: center
}

.add-answer {
  text-align: right;
}

.requested-by {
  padding-top: 4%;
}

.editable a {
  font-size: 15px;
  margin-left: -10px;
}

.editable p {
  font-size: 15px;
}

.set-col {
  margin-left: -30px;
}

.ownership {
  text-align: right;
}

.question-error {
  text-align: center;
}

.question-error p {
  color: red;
}

.main-tag {
  margin-right: 5%;
}
</style>

