<template>
  <v-form v-model="valid" @submit="onSubmit">
    <h2>
      Add Public Reply
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
  name: "AddPublicReply",
  data() {
    return {
      key: this.$route.params.id,
      task: {},
      //publicreplyref: firebase.firestore().collection("task"),
      //publicreplyref: firebase.firestore().collection("task").doc().collection("publicreplies"),
      publicreply: {}
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
        //this.publicreplyref = doc.collection("publicreplies").data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      const addnewpublicreply = firebase
        .firestore()
        .collection("task")
        .doc(this.$route.params.id)
        .collection("publicreplies");
      addnewpublicreply
        .add(this.publicreply)
        .then(doctaskRef => {
          this.key = "";
          this.publicreply.publicreply_publicreplytext = "";
          router.push({
            name: "ShowTask",
            params: { id: this.$route.params.id }
          });
          })
        .catch(error => {
          alert("Error adding document: ", error);
        });

      // this.publicreplyref
      //   .add(this.publicreply)
      //   .then(docpublicreplyRef => {
      //     this.publicreply.publicreply_publicreplytext = "";
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
