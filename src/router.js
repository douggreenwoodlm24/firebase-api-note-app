import Vue from "vue";
import Router from "vue-router";
//Firebase imports
import NoteList from "@/components/NoteList";
import ShowNote from "@/components/ShowNote";
import AddNote from "@/components/AddNote";
import EditNote from "@/components/EditNote";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "NoteList",
      component: NoteList
    },
    {
      path: "/show-note/:id",
      name: "ShowNote",
      component: ShowNote
    },
    {
      path: "/add-note",
      name: "AddNote",
      component: AddNote
    },
    {
      path: "/edit-note/:id",
      name: "EditNote",
      component: EditNote
    }
  ]
});
