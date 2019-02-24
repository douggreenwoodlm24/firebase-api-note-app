<template>
  <v-container>
    <h2>
      Note List
      <a href="/add-publicreply">(Add Public Reply)</a>
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
  name: "PublicReplyList",
  data() {
    return {
      fields: {
        //title: { label: "Title" },
        publicreply_publicreplytext: { label: "Public Reply" },
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
          //publicreply_publicreplytext: doc.data().publicreply_publicreplytext
          // publicreply_timestamp: doc.data().publicreply_timestamp,
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
    details(publicreply) {
      router.push({ name: "ShowPublicReply", params: { id: publicreply.key } });
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
