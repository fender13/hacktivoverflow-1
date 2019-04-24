<template>
  <div class="addNewQuestions">
    <div class="form-addProduct">
      <form @submit.prevent="updateQuestion">
        <div class="page-title">
          <h1>Please Submit Your Updates</h1>
        </div>
        <div class="mt-3">
          <div class="mt-3">Question Title</div>
          <input class="form-control" v-model="title" type="text" placeholder="Enter Title">
        </div>
        <div class="mt-3">
          <div class="mt-3">Question Description</div>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
        <div class="mt-3">
          <div class="mt-3">Question Tags</div>
          <input-tag v-model="tags"></input-tag>
        </div>
        <div class="mt-5 add-question">
          <button class="btn btn-primary" type="submit">Submit Question</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputTag from 'vue-input-tag'
import axios from "../database/server";
import router from "@/router";
import swal from "sweetalert";

export default {
  name: "UpdateQuestions",
  data() {
    return {
      id: "",
      title: "",
      tags: [],
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },
  components: {
    InputTag
  },
  mounted() {
    this.getQuestion(this.$route.params.id)
  },
  methods: {
    getQuestion(id) {
      axios
        .get(`/questions/${id}`)
        .then(({ data }) => {
          this.id = data._id
          this.title = data.title
          this.tags = data.tags
          this.editorData = data.question
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    updateQuestion() {
      axios
        .put(`/questions/${this.id}`, {
          title: this.title,
          tags: this.tags,
          question: this.editorData
        })
        .then((data) => {
          router.push('/dashboard/all-questions')
        })
    }
  }
};
</script>

<style scoped>
.addNewQuestions {
  width: 100%;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

.add-question {
  text-align: center;
  margin-bottom: 5%;
}

.page-title {
  margin-bottom: 5%;
}
</style>