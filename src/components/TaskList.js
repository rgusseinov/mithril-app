import m from "mithril";
import TaskModel from '../models/TaskModel';

const TaskList = {
  tasks: TaskModel.fetchTasks(),

  view: function () {
    return m("div.container", [
      m("header.mb-4", [
        m("h1", "Task Tracker"),
        m("a.btn.btn-primary", { href: "/add", oncreate: m.route.link }, "Add New Task"),
      ]),
      m('div.d-flex justify-content-between mb-3', [
        m('div.form-group', [
          m('label.form-label', { for: "filterStatus" }, 'Filter by Status:'),
          m("select.form-select", [
            m("option", { value: "All" }, "All"),
            m("option", { value: "completed" }, "Completed"),
            m("option", { value: "incomplete" }, "Incomplete"),
          ]),
        ]),
        m('div.form-group', [
          m('label.form-label', { for: "searchTask" }, 'Search Tasks:'),
          m('input', {
            type: 'input',
            id: 'searchTask',
            class: 'form-control',
            placeholder: 'Search by task name...'
          }, [])
        ]),
        
      ]),
      m("ul.list-group", this.tasks.map((task) =>
        m("li.list-group-item.d-flex.justify-content-between.align-items-center", [
          m("span", task.title),
          m("div", [
            m("span.badge", { class: task.priority === "High" ? "bg-warning" : "bg-secondary" }, task.priority),
            m("a.btn.btn-sm.btn-info.ms-2", { href: `/task/${task.id}`, oncreate: m.route.link }, "View"),
            m("button.btn.btn-sm.btn-success.ms-2", "Complete"),
            m("button.btn.btn-sm.btn-danger.ms-2", "Delete"),
          ]),
        ])
      )),
    ]);
  },
};

export default TaskList;
