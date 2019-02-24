<template>

  <v-form v-model="valid" @submit="onSubmit">
    <h2>
      Edit (existing) public reply
      <!-- <router-link :to="{ name: 'ShowNote', params: { id: key } }"
        >(Show Note)</router-link
      > -->
    </h2>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-textarea id="title" v-model.trim="publicreply.publicreply_publicreplytext"></v-textarea>
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
  name: "EditPublicReply",
  data() {
    return {
      key: this.$route.params.taskid,
      publicreply: {}
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("task")
      .doc(this.$route.params.taskid);
    ref.get().then(doc => {
      if (doc.exists) {
        this.publicreply = doc.data();
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
        .doc(this.$route.params.taskid);
      updateRef
        .set(this.publicreply)
        .then(docRef => {
          this.key = "";
          this.publicreply.publicreply_publicreplytext = "";
          router.push({
            name: "ShowTask",
            params: { id: this.$route.params.taskid }
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
