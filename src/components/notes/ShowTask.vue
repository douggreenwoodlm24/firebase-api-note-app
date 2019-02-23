<template>
  <v-container>
    <h2>
      Edit Task
      <a href="/">(Task List)</a>
    </h2>
    <b-jumbotron>
      <template slot="lead">
        <h2>Customer info</h2>
        <p><strong>Customer name:</strong> {{ task.info_customername }}<br>
          <strong>Customer email:</strong> {{ task.info_customeremail }}<br>
          <strong>Flag:</strong> {{ task.task_flag }}<br>
          <strong>Feedback:</strong> {{ task.fb_verbatim1 }}<br>
          <strong>Topics:</strong> {{ task.fb_topics }}<br>
          <strong>Will be published to:</strong> {{ task.fb_publishto }}<br></p>
          <h2>Public reply</h2>
        <p> {{ task.public_replytext }}</p>
        <h2>Internal note</h2>
        <p> {{ task.note_notetext }}</p>
      </template>
      <a href="/add-task">Add Task</a>
      <v-btn @click.stop="edittask(key)">Edit</v-btn>
      <v-btn @click.stop="deletetask(key)">Delete</v-btn>
    </b-jumbotron>
  </v-container>
</template>

<script>
import firebase from "../../Firebase";
import router from "../../router";

export default {
  name: "ShowTask",
  data() {
    return {
      key: "",
      task: {}
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("task")
      .doc(this.$route.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.key = doc.id;
        this.task = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    edittask(id) {
      router.push({
        name: "EditTask",
        params: { id: id }
      });
    },
    deletetask(id) {
      firebase
        .firestore()
        .collection("task")
        .doc(id)
        .delete()
        .then(() => {
          router.push({
            name: "TaskList"
          });
        })
        .catch(error => {
          alert("Error removing document: ", error);
        });
    }
  }
};
</script>

<style>
.edit-btn {
  margin-right: 20px;
  width: 70px;
}
</style>
