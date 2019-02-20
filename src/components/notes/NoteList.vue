<template>
  <v-container>
    <!--<b-row>
      <b-col cols="12">
        <h2>
          Note List
          <a href="/add-note">(Add Note)</a>
        </h2>
         <b-table striped hover :items="notes" :fields="fields">
          <template slot="actions" scope="row">
            <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
          </template>
        </b-table> 
      </b-col>
    </b-row>-->
    <h2>
      Note List
      <a href="/add-note">(Add Note)</a>
    </h2>
    <v-data-table :items="notes">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.notetext }}</td>
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
        title: { label: "Title" },
        notetext: { label: "Note" },
        actions: { label: "Action" }
      },
      notes: [],
      errors: [],
      ref: firebase.firestore().collection("notes")
    };
  },
  created() {
    this.ref.onSnapshot(querySnapshot => {
      this.notes = [];
      querySnapshot.forEach(doc => {
        this.notes.push({
          key: doc.id,
          title: doc.data().title,
          notetext: doc.data().notetext
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
