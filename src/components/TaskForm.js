import m from "mithril";
import TaskModel from "../models/TaskModel";

const TaskForm = {
  title: "",
  description: "",
  priority: "low",

  view: function () {
    return m("div.container", [
      m("header.mb-4", [
        m("h1", "Add/Edit Task"),
      ]),
      m("form", {
        onsubmit: function (e) {
          e.preventDefault();
          // Create new task object
          const newTask = {
            id: Date.now(), // Use a timestamp as a unique ID
            title: TaskForm.title,
            description: TaskForm.description,
            priority: TaskForm.priority,
            completed: false,
          };

          TaskModel.addTask(newTask); // Save the task
          m.route.set("/"); // Redirect to the task list
        },
      }, [
        m("div.mb-3", [
          m("label.form-label", { for: "title" }, "Task Title"),
          m("input.form-control", {
            id: "title",
            type: "text",
            value: TaskForm.title,
            oninput: (e) => TaskForm.title = e.target.value,
          }),
        ]),
        m("div.mb-3", [
          m("label.form-label", { for: "description" }, "Description"),
          m("textarea.form-control", {
            id: "description",
            rows: 3,
            value: TaskForm.description,
            oninput: (e) => TaskForm.description = e.target.value,
          }),
        ]),
        m("div.mb-3", [
          m("label.form-label", { for: "priority" }, "Priority"),
          m("select.form-select", {
            id: "priority",
            value: TaskForm.priority,
            onchange: (e) => TaskForm.priority = e.target.value,
          }, [
            m("option", { value: "low" }, "Low"),
            m("option", { value: "medium" }, "Medium"),
            m("option", { value: "high" }, "High"),
          ]),
        ]),
        m("button.btn.btn-primary", { type: "submit" }, "Save Task"),
        m("a.btn.btn-secondary.ms-2", { href: "/", oncreate: m.route.link }, "Cancel"),
      ]),
    ]);
  },
};

export default TaskForm;