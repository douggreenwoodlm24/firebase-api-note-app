<template>
  <v-container>
    <h2>
      Note List
      <a href="/add-note">(Add Note)</a>
    </h2>
    <v-data-table :items="task">
      <template slot="items" slot-scope="props">
        <td>
          
          <!-- <strong>:</strong> {{ props.item. }}<br> -->
        </td>
        <td>{{ props.item.info_customername }}</td>
        <td><v-btn @click.stop="details(props.item)">Details</v-btn></td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import firebase from "../../Firebase";
import router from "../../router";

export default {
  name: "NoteList",
  data() {
    return {
      fields: {
        //title: { label: "Title" },
        note_notetext: { label: "Note" },
        actions: { label: "Action" }
      },
      task: [],
      errors: [],
      ref: firebase.firestore().collection("task")
    };
  },
  created() {
    this.ref.onSnapshot(querySnapshot => {
      this.task = [];
      querySnapshot.forEach(doc => {
        this.task.push({
          key: doc.id,
          //title: doc.data().title,
          // fb_publishto: doc.data().fb_publishto,
          // fb_responsedate: doc.data().fb_responsedate,
          // fb_starscore: doc.data().fb_starscore,
          // fb_topics: doc.data().fb_topics,
          // fb_verbatim1: doc.data().fb_verbatim1,
          // info_customeremail: doc.data().info_customeremail,
          info_customername: doc.data().info_customername
          // info_customerphone: doc.data().info_customerphone,
          // info_vehiclemodel: doc.data().info_vehiclemodel,
          // info_vehiclereg: doc.data().info_vehiclereg,
          // info_vehiclevin: doc.data().info_vehiclevin,
          //note_notetext: doc.data().note_notetext
          // note_timestamp: doc.data().note_timestamp,
          // public_publishimmediate: doc.data().public_publishimmediate,
          // public_replytext: doc.data().public_replytext,
          // public_timestamp: doc.data().public_timestamp,
          // task_flag: doc.data().task_flag,
          // task_hold: doc.data().task_hold,
          // task_id: doc.data().task_id,
          // task_owner: doc.data().task_owner,
          // task_status: doc.data().task_status
        });
      });
    });
  },
  methods: {
    details(note) {
      router.push({ name: "ShowNote", params: { id: note.key } });
    }
  }
};
</script>

<style>
.table {
  width: 96%;
  margin: 0 auto;
}
</style>
