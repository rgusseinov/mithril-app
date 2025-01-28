import m from "mithril";
import TaskModel from "../models/TaskModel";

const TaskEdit = {
  task: {
    id: null,
    title: "",
    description: "",
    priority: "Low",
    completed: false,
  },

  oninit: function (vnode) {
    const taskId = parseInt(vnode.attrs.id, 10);

    if (taskId) {
      // Editing an existing task
      const existingTask = TaskModel.tasks.find((task) => task.id === taskId);

      if (existingTask) {
        TaskEdit.task = { ...existingTask }; // Clone the task to avoid mutating the original
      } else {
        alert("Task not found!");
        m.route.set("/"); // Redirect if the task doesn't exist
      }
    } else {
      // Creating a new task
      TaskEdit.task = {
        id: null,
        title: "",
        description: "",
        priority: "Low",
        completed: false,
      };
    }
  },

  saveTask: function () {
    if (!TaskEdit.task.title.trim()) {
      alert("Task title is required.");
      return;
    }

    if (TaskEdit.task.id) {
      // Update an existing task
      TaskModel.editTask(TaskEdit.task.id, TaskEdit.task);
    } else {
      // Create a new task
      TaskModel.addTask(TaskEdit.task);
    }

    m.route.set("/"); // Redirect to the task list after saving
  },

  view: function () {
    return m("div.container", [
      m("header.mb-4", [
        m("h1", TaskEdit.task.id ? "Edit Task" : "Create Task"),
        m("a.btn.btn-secondary", { href: "/", oncreate: m.route.link }, "Back to List"),
      ]),
      m("form", {
        onsubmit: function (e) {
          e.preventDefault();
          TaskEdit.saveTask();
        },
      }, [
        m("div.mb-3", [
          m("label.form-label", { for: "task-title" }, "Task Title"),
          m("input.form-control", {
            id: "task-title",
            type: "text",
            value: TaskEdit.task.title,
            oninput: function (e) {
              TaskEdit.task.title = e.target.value;
            },
            required: true,
          }),
        ]),
        m("div.mb-3", [
          m("label.form-label", { for: "task-description" }, "Task Description"),
          m("textarea.form-control", {
            id: "task-description",
            rows: 4,
            value: TaskEdit.task.description,
            oninput: function (e) {
              TaskEdit.task.description = e.target.value;
            },
          }),
        ]),
        m("div.mb-3", [
          m("label.form-label", { for: "task-priority" }, "Priority"),
          m("select.form-select", {
            id: "task-priority",
            value: TaskEdit.task.priority,
            onchange: function (e) {
              TaskEdit.task.priority = e.target.value;
            },
          }, [
            m("option", { value: "Low" }, "Low"),
            m("option", { value: "Medium" }, "Medium"),
            m("option", { value: "High" }, "High"),
          ]),
        ]),
        m("div.mb-3.form-check", [
          m("input.form-check-input", {
            id: "task-completed",
            type: "checkbox",
            checked: TaskEdit.task.completed,
            onchange: function (e) {
              TaskEdit.task.completed = e.target.checked;
            },
          }),
          m("label.form-check-label", { for: "task-completed" }, "Completed"),
        ]),
        m("button.btn.btn-primary", { type: "submit" }, TaskEdit.task.id ? "Update Task" : "Create Task"),
      ]),
    ]);
  },
};

export default TaskEdit;