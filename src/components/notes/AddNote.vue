<template>
  <!-- <b-row>
      <b-col cols="12">
        <h2>
          Add Note
          <b-link href="/">(Note List)</b-link>
        </h2>
        <b-jumbotron>
          <b-form @submit="onSubmit">
            <b-form-group
              id="fieldsetHorizontal"
              horizontal
              :label-cols="4"
              breakpoint="md"
              label="Enter Title"
            >
              <b-form-input id="title" v-model.trim="note.title"></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldsetHorizontal"
              horizontal
              :label-cols="4"
              breakpoint="md"
              label="Enter Note"
            >
              <b-form-textarea
                id="notetext"
                v-model="note.notetext"
                placeholder="Enter something"
                :rows="2"
                :max-rows="6"
                >{{ note.notetext }}</b-form-textarea
              >
            </b-form-group>
            <b-form-group
              id="fieldsetHorizontal"
              horizontal
              :label-cols="4"
              breakpoint="md"
              label="Enter Author"
            >
              <b-form-input
                id="author"
                v-model.trim="note.author"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Save</b-button>
          </b-form>
        </b-jumbotron>
      </b-col>
    </b-row> -->

  <v-form v-model="valid" @submit="onSubmit">
    <h2>
      Add Note
      <a href="/">(Note List)</a>
    </h2>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-textarea id="title" v-model.trim="note.notetext"></v-textarea>
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
      ref: firebase.firestore().collection("notes"),
      note: {}
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      this.ref
        .add(this.note)
        .then(docRef => {
          this.note.title = "";
          this.note.notetext = "";
          this.note.author = "";
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
