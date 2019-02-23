<template>
  <v-form v-model="valid" @submit="onSubmit">
    <h2>
      Add Note
      <a href="/">(Note List)</a>
    </h2>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-textarea id="title" v-model.trim="note.note_notetext"></v-textarea>
          <v-btn type="submit">Save</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import firebase from "../../Firebase";
import router from "../../router";

export default {
  name: "AddNote",
  data() {
    return {
      ref: firebase.firestore().collection("task"),
      note: {}
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      this.ref
        .add(this.note)
        .then(docRef => {
          //this.note.title = "";
          this.note.note_notetext = "";
          //this.note.author = "";
          router.push({
            name: "NoteList"
          });
        })
        .catch(error => {
          alert("Error adding document: ", error);
        });
    }
  }
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
</style>
