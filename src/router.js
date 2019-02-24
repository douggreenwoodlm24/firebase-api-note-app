import Vue from "vue";
import Router from "vue-router";
//Firebase imports
import NoteList from "@/components/notes/NoteList";
import ShowNote from "@/components/notes/ShowNote";
import AddNote from "@/components/notes/AddNote";
import EditNote from "@/components/notes/EditNote";
import TaskList from "@/components/TaskList";
import ShowTask from "@/components/ShowTask";
import AddTask from "@/components/AddTask";
import EditTask from "@/components/EditTask";
import PublicReplyList from "@/components/publicreply/PublicReplyList";
import ShowPublicReply from "@/components/publicreply/ShowPublicReply";
import AddPublicReply from "@/components/publicreply/AddPublicReply";
import EditPublicReply from "@/components/publicreply/EditPublicReply";

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
    },
    {
      path: "/publicreply-list/",
      name: "PublicReplyList",
      component: PublicReplyList
    },
    {
      path: "/show-publicreply/:id",
      name: "ShowPublicReply",
      component: ShowPublicReply
    },
    {
      path: "/:id/add-publicreply/",
      name: "AddPublicReply",
      component: AddPublicReply
    },
    {
      path: "/:id/edit-publicreply/",
      name: "EditPublicReply",
      component: EditPublicReply
    }
  ]
});
