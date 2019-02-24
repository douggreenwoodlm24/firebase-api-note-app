<template>
  <v-container>
    <h2>
      Edit Public Reply
      <a href="/">(Task List)</a>
    </h2>
    <b-jumbotron>
      <template slot="lead">
        <h2>Customer info</h2>
        <p><strong>Customer name:</strong> {{ publicreply.info_customername }}<br>
          <strong>Customer email:</strong> {{ publicreply.info_customeremail }}<br>
          <strong>Flag:</strong> {{ publicreply.task_flag }}<br>
          <strong>Feedback:</strong> {{ publicreply.fb_verbatim1 }}<br>
          <strong>Topics:</strong> {{ publicreply.fb_topics }}<br>
          <strong>Will be published to:</strong> {{ publicreply.fb_publishto }}<br></p>
          <h2>Public reply</h2>
        <p> {{ publicreply.public_replytext }}</p>
        <!-- Title: {{ publicreply.title }}<br /> -->
        <h2>Internal publicreply</h2>
        <p> {{ publicreply.publicreply_publicreplytext }}</p>
        <!-- Author: {{ publicreply.author }}<br /> -->
      </template>
      <a href="/add-publicreply">Add Public Reply</a>
      <v-btn @click.stop="editpublicreply(key)">Edit</v-btn>
      <v-btn @click.stop="deletepublicreply(key)">Delete</v-btn>
    </b-jumbotron>
  </v-container>
</template>

<script>
import firebase from "../../Firebase";
import router from "../../router";

export default {
  name: "ShowPublicReply",
  data() {
    return {
      key: "",
      publicreply: {}
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
        this.publicreply = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    editpublicreply(id) {
      router.push({
        name: "EditPublicReply",
        params: { id: id }
      });
    },
    deletepublicreply(id) {
      firebase
        .firestore()
        .collection("task")
        .doc(id)
        .delete()
        .then(() => {
          router.push({
            name: "ShowPublicReply"
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
