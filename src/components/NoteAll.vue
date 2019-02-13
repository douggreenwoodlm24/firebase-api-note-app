<template>
  <v-container>
    <add-note></add-note>
    <note-list></note-list>
  </v-container>
</template>

<script>
//Firebase imports
import NoteList from "@/components/NoteList";
import ShowNote from "@/components/ShowNote";
import AddNote from "@/components/AddNote";
import EditNote from "@/components/EditNote";

export default {
  components: {
    NoteList,
    ShowNote,
    AddNote,
    EditNote
  }
};
</script>

<style></style>
