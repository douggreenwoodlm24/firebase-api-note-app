<template>

  <v-form v-model="valid" @submit="onSubmit">
    <h2>
      Edit (existing) internal note
      <!-- <router-link :to="{ name: 'ShowNote', params: { id: key } }"
        >(Show Note)</router-link
      > -->
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
  name: "EditNote",
  data() {
    return {
      key: this.$route.params.id,
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
        this.note = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const updateRef = firebase
        .firestore()
        .collection("task")
        .doc(this.$route.params.id);
      updateRef
        .set(this.note)
        .then(docRef => {
          this.key = "";
          //this.note.title = "";
          this.note.note_notetext = "";
          //this.note.author = "";
          router.push({
            name: "ShowTask",
            params: { id: this.$route.params.id }
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
