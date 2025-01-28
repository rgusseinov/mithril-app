import m from "mithril";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEdit from "./components/TaskEdit";
import TaskDetail from "./components/TaskDetail";

m.route.prefix = ""; // Use history-based routing

m.route(document.getElementById("app"), "/", {
  "/": TaskList,
  "/add": TaskForm,
  "/edit/:id": TaskEdit,
  "/task/:id": TaskDetail
});