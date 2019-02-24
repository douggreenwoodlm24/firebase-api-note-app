<template>

  <v-form v-model="valid" @submit="onSubmit">
    <h2>
      Edit Task
      <router-link :to="{ name: 'ShowTask', params: { id: key } }"
        >(Show Task)</router-link
      >
    </h2>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-textarea id="info_customername" v-model.trim="task.info_customername" placeholder="Customer name"></v-textarea>
          <v-textarea id="info_customeremail" v-model.trim="task.info_customeremail" placeholder="Customer email"></v-textarea>
          <v-textarea id="info_customerphone" v-model.trim="task.info_customerphone" placeholder="Customer phone"></v-textarea>
          <v-textarea id="info_vehiclemodel" v-model.trim="task.info_vehiclemodel" placeholder="Vehicle model"></v-textarea>
          <v-textarea id="info_vehiclereg" v-model.trim="task.info_vehiclereg" placeholder="Vehicle registration"></v-textarea>
          <v-textarea id="info_vehiclevin" v-model.trim="task.info_vehiclevin" placeholder="Vehicle VIN"></v-textarea>
          <v-textarea id="fb_starscore" v-model.trim="task.fb_starscore" placeholder="Star score (number)"></v-textarea>
          <v-textarea id="fb_verbatim1" v-model.trim="task.fb_verbatim1" placeholder="Customer feedback (verbatim)"></v-textarea>
          <v-textarea id="task_flag" v-model.trim="task.task_flag" placeholder="Flag"></v-textarea>
        <v-textarea id="task_owner" v-model.trim="task.task_owner" placeholder="Task owner"></v-textarea>
        Task status: <select v-model="task.task_status">
          <option>New</option>
          <option>Open</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
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
  name: "EditTask",
  data() {
    return {
      key: this.$route.params.id,
      task: {}
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("task")
      .doc(this.$route.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.task = doc.data();
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
        .set(this.task)
        .then(docRef => {
          this.key = "";
          this.task.info_customername = "";
          this.task.info_customeremail = "";
          this.task.info_customerphone = "";
          this.task.info_vehiclemodel = "";
          this.task.info_vehiclereg = "";
          this.task.info_vehiclevin = "";
          this.task.fb_starscore = "";
          this.task.fb_verbatim1 = "";
          this.task.task_flag = "";
          this.task.task_owner = "";
          this.task.task_status = "";
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
