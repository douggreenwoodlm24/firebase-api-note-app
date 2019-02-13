<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Note List
        <b-link href="/add-note">(Add Note)</b-link>
      </h2>
      <b-table striped hover :items="notes" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "../../Firebase";
import router from "../../router";

export default {
  name: "NoteList",
  data() {
    return {
      fields: {
        title: { label: "Title", sortable: true, class: "text-left" },
        notetext: { label: "Note", class: "text-left" },
        actions: { label: "Action", class: "text-center" }
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
