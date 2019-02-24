<template>
  <v-container>
    <h2>
      Edit Note
      <a href="/">(Note List)</a>
    </h2>
    <b-jumbotron>
      <template slot="lead">
        <h2>Customer info</h2>
        <p><strong>Customer name:</strong> {{ note.info_customername }}<br>
          <strong>Customer email:</strong> {{ note.info_customeremail }}<br>
          <strong>Flag:</strong> {{ note.task_flag }}<br>
          <strong>Feedback:</strong> {{ note.fb_verbatim1 }}<br>
          <strong>Topics:</strong> {{ note.fb_topics }}<br>
          <strong>Will be published to:</strong> {{ note.fb_publishto }}<br></p>
          <h2>Public reply</h2>
        <p> {{ note.public_replytext }}</p>
        <!-- Title: {{ note.title }}<br /> -->
        <h2>Internal note</h2>
        <p> {{ note.note_notetext }}</p>
        <!-- Author: {{ note.author }}<br /> -->
      </template>
      <a href="/add-note">Add Note</a>
      <v-btn @click.stop="editnote(key)">Edit</v-btn>
      <v-btn @click.stop="deletenote(key)">Delete</v-btn>
    </b-jumbotron>
  </v-container>
</template>

<script>
import firebase from "../../Firebase";
import router from "../../router";

export default {
  name: "ShowNote",
  data() {
    return {
      key: "",
      note: {}
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
        this.note = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    editnote(id) {
      router.push({
        name: "EditNote",
        params: { id: id }
      });
    },
    deletenote(id) {
      firebase
        .firestore()
        .collection("task")
        .doc(id)
        .delete()
        .then(() => {
          router.push({
            name: "ShowNote"
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
