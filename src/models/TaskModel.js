const TaskModel = {
  tasks: [],

  // Fetch tasks from LocalStorage
  fetchTasks: function () {
    const storedTasks = localStorage.getItem("tasks");
    TaskModel.tasks = storedTasks ? JSON.parse(storedTasks) : [];

    return TaskModel.tasks;
  },

  // Save tasks to LocalStorage
  saveTasks: function () {
    localStorage.setItem("tasks", JSON.stringify(TaskModel.tasks));
  },

  // Add a new task
  addTask: function (task) {
    TaskModel.tasks.push(task);
    TaskModel.saveTasks(); // Save to LocalStorage
  },

  // Edit an existing task
  editTask: function (id, updatedTask) {
    const index = TaskModel.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      TaskModel.tasks[index] = updatedTask;
      TaskModel.saveTasks(); // Save to LocalStorage
    }
  },

  // Delete a task
  deleteTask: function (id) {
    TaskModel.tasks = TaskModel.tasks.filter((task) => task.id !== id);
    TaskModel.saveTasks(); // Save to LocalStorage
  },
};

export default TaskModel;
