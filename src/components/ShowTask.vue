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
          <strong>Customer phone:</strong> {{ task.info_customerphone }}<br>
          <strong>Vehicle model:</strong> {{ task.info_vehiclemodel }}<br>
          <strong>Vehicle registration:</strong> {{ task.info_vehiclereg }}<br>
          <strong>Vehicle VIN:</strong> {{ task.info_vehiclevin }}<br>
          <strong>Flag:</strong> {{ task.task_flag }}<br>
          <strong>Rating:</strong> {{ task.fb_starscore }}<br>
          <strong>Feedback:</strong> {{ task.fb_verbatim1 }}<br>
          <strong>Task owner:</strong> {{ task.task_owner }}<br></p>
          <strong>Task status:</strong> {{ task.task_status }}<br></p>
      <v-btn @click.stop="edittask(key)">Edit Task</v-btn>
      <v-btn @click.stop="deletetask(key)">Delete Task</v-btn>
      <hr>
          <h2>Public reply</h2>
          <v-btn @click.stop="addnewpublicreply(key)">Add public reply</v-btn>
        <p> {{ task.public_replytext }}</p>
        <hr>
        <h2>Internal note</h2>
        <!-- <a href="/add-note">Add internal note (via a href)</a> -->
        <v-btn @click.stop="addnewnote(key)">Add internal note</v-btn>
        <h4>Internal note history</h4>
        <p> {{ task.note_notetext }}</p>
      </template>
      
      <v-btn @click.stop="editnote(key)">Edit Note</v-btn>
      <v-btn @click.stop="deletenote(key)">Delete Note</v-btn>
    </b-jumbotron>
  </v-container>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "ShowTask",
  data() {
    return {
      key: "",
      task: {}
    };
  },
  created() {
    const taskref = firebase
      .firestore()
      .collection("task")
      .doc(this.$route.params.id);
    taskref.get().then(doc => {
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
    },
    addnewpublicreply(id) {
      router.push({
        name: "AddPublicReply",
        params: { id: id }
      });
    },
    editpublicreply(id) {
      router.push({
        name: "PublicReply",
        params: { taskid: id }
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
            name: "ShowTask"
          });
        })
        .catch(error => {
          alert("Error removing document: ", error);
        });
    },
    addnewnote(id) {
      router.push({
        name: "AddNote",
        params: { id: id }
      });
    },
    editnote(id) {
      router.push({
        name: "EditNote",
        params: { taskid: id }
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
            name: "ShowTask"
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
