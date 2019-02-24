<template>
  <v-form v-model="valid" @submit="onSubmit">
    <h2>
      Add Internal Note
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
      key: this.$route.params.id,
      task: {},
      //noteref: firebase.firestore().collection("task"),
      //noteref: firebase.firestore().collection("task").doc().collection("notes"),
      note: {}
    };
  },
  created() {
    const taskref = firebase
      .firestore()
      .collection("task")
      .doc(this.$route.params.id);
    taskref.get().then(doc => {
      if (doc.exists) {
        this.task = doc.data();
        //this.noteref = doc.collection("notes").data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      const addnewnote = firebase
        .firestore()
        .collection("task")
        .doc(this.$route.params.id)
        .collection("notes");
      addnewnote
        .add(this.note)
        .then(doctaskRef => {
          this.key = "";
          this.note.note_notetext = "";
          router.push({
            name: "ShowTask",
            params: { id: this.$route.params.id }
          });
          })
        .catch(error => {
          alert("Error adding document: ", error);
        });

      // this.noteref
      //   .add(this.note)
      //   .then(docnoteRef => {
      //     this.note.note_notetext = "";
      //     router.push({
      //       name: "ShowTask"
      //     });
      //   })
      //   .catch(error => {
      //     alert("Error adding document: ", error);
      //   });
    }
  }
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
</style>
