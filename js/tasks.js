let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function loadTasks() {
  const app = document.getElementById("app-content");

  app.innerHTML = `
    <h2>TASK MANAGER</h2>

    <div class="task-input">
      <input type="text" id="taskInput" placeholder="Enter a task" />
      <button id="addtaskbutton">Add Task</button>
    </div>

    <ul id="taskList"></ul>
  `;

  document
    .getElementById("addtaskbutton")
    .addEventListener("click", addtask);

  rendertasks();
}

function addtask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  savetasks();
  input.value = "";
  rendertasks();
}

function rendertasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-item">
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>
      </div>
      <button class="deletebutton">Delete</button>
    `;

    li.querySelector("input").addEventListener("change", () => {
      task.completed = !task.completed;
      savetasks();
      rendertasks();
    });

    li.querySelector("button").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      savetasks();
      rendertasks();
    });

    list.appendChild(li);
  });
}

function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


