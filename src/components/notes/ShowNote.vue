<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Note
        <b-link href="/">(Note List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{ note.title }}
        </template>
        <template slot="lead">
          Title: {{ note.title }}<br />
          Note: {{ note.notetext }}<br />
          Author: {{ note.author }}<br />
        </template>
        <hr class="my-4" />
        <b-btn class="edit-btn" variant="success" @click.stop="editnote(key)"
          >Edit</b-btn
        >
        <b-btn variant="danger" @click.stop="deletenote(key)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
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
      .collection("notes")
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
        .collection("notes")
        .doc(id)
        .delete()
        .then(() => {
          router.push({
            name: "NoteList"
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
.jumbotron {
  padding: 2rem;
}
.edit-btn {
  margin-right: 20px;
  width: 70px;
}
</style>
