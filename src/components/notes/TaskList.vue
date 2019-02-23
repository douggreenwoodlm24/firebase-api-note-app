<template>
  <v-container>
    <h2>
      Task List
      <a href="/add-task">(Add Task)</a>
    </h2>
    <v-data-table :items="task">
      <template slot="items" slot-scope="props">
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
  name: "TaskList",
  data() {
    return {
      fields: {
        info_customername: { label: "Customer name" },
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
          info_customername: doc.data().info_customername
        });
      });
    });
  },
  methods: {
    details(task) {
      router.push({ name: "ShowTask", params: { id: task.key } });
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
