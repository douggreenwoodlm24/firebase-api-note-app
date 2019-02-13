<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Note
        <router-link :to="{ name: 'ShowNote', params: { id: key } }"
          >(Show Note)</router-link
        >
      </h2>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Title"
          >
            <b-form-input id="title" v-model.trim="note.title"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Description"
          >
            <b-form-textarea
              id="description"
              v-model="note.description"
              placeholder="Enter something"
              :rows="2"
              :max-rows="6"
              >{{ note.description }}</b-form-textarea
            >
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Author"
          >
            <b-form-input id="author" v-model.trim="note.author"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";

export default {
  name: "EditNote",
  data() {
    return {
      key: this.$route.params.id,
      note: {}
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("notes")
      .doc(this.$route.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.note = doc.data();
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
        .collection("notes")
        .doc(this.$route.params.id);
      updateRef
        .set(this.note)
        .then(docRef => {
          this.key = "";
          this.note.title = "";
          this.note.description = "";
          this.note.author = "";
          router.push({
            name: "ShowNote",
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
