import m from "mithril";
import TaskModel from "../models/TaskModel";

const TaskDetail = {
  task: null, // Placeholder for the current task

  // Load task data when the component initializes
  oninit: function (vnode) {
    const taskId = parseInt(vnode.attrs.id, 10); // Get task ID from the URL
    TaskDetail.task = TaskModel.tasks.find((task) => task.id === taskId);

    // If the task doesn't exist, redirect to the task list
    if (!TaskDetail.task) {
      alert("Task not found!");
      m.route.set("/");
    }
  },

  view: function () {
    if (!TaskDetail.task) {
      return m("div", "Loading..."); // Fallback if the task hasn't loaded yet
    }

    return m("div.container", [
      m("header.mb-4", [
        m("h1", "Task Details"),
        m("a.btn.btn-secondary", { href: "/", oncreate: m.route.link }, "Back to List"),
      ]),
      m("div.card", [
        m("div.card-body", [
          m("h5.card-title", TaskDetail.task.title),
          m("h6.card-subtitle.mb-2.text-muted", `Priority: ${TaskDetail.task.priority}`),
          m("p.card-text", TaskDetail.task.description || "No description provided."),
          m("p.card-text", [
            m("strong", "Completed: "),
            TaskDetail.task.completed ? "Yes" : "No",
          ]),
        ]),
      ]),
      m("div.mt-3", [
        m("button.btn.btn-primary.me-2", {
          onclick: () => m.route.set(`/edit/${TaskDetail.task.id}`),
        }, "Edit Task"),
        m("button.btn.btn-danger", {
          onclick: () => {
            if (confirm("Are you sure you want to delete this task?")) {
              TaskModel.deleteTask(TaskDetail.task.id);
              m.route.set("/"); // Redirect to the task list after deletion
            }
          },
        }, "Delete Task"),
      ]),
    ]);
  },
};

export default TaskDetail;
