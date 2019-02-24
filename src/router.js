import Vue from "vue";
import Router from "vue-router";
//Firebase imports
import NoteList from "@/components/notes/NoteList";
import ShowNote from "@/components/notes/ShowNote";
import AddNote from "@/components/notes/AddNote";
import EditNote from "@/components/notes/EditNote";
import TaskList from "@/components/notes/TaskList";
import ShowTask from "@/components/notes/ShowTask";
import AddTask from "@/components/notes/AddTask";
import EditTask from "@/components/notes/EditTask";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "TaskList",
      component: TaskList
    },
    {
      path: "/show-task/:id",
      name: "ShowTask",
      component: ShowTask
    },
    {
      path: "/add-task",
      name: "AddTask",
      component: AddTask
    },
    {
      path: "/edit-task/:id",
      name: "EditTask",
      component: EditTask
    },
    {
      path: "/note-list/",
      name: "NoteList",
      component: NoteList
    },
    {
      path: "/show-note/:id",
      name: "ShowNote",
      component: ShowNote
    },
    {
      path: "/:id/add-note/",
      name: "AddNote",
      component: AddNote
    },
    {
      path: "/:id/edit-note/",
      name: "EditNote",
      component: EditNote
    }
  ]
});
