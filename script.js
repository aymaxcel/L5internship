document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const task = {
      name: document.getElementById('taskName').value,
      type: document.getElementById('taskType').value,
      description: document.getElementById('taskDescription').value,
      color: document.getElementById('taskBgColor').value
    };
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  });
  function displayTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
      const taskCard = `
        <div style="background-color: ${task.color}" class="taskCard">
          <h3>${task.name}</h3>
          <p>Type: ${task.type}</p>
          <p>${task.description}</p>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>`;
      tasksContainer.innerHTML += taskCard;
    });
  }
  function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks[index];
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskType').value = task.type;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskBgColor').value = task.color;
  
    document.getElementById('taskForm').onsubmit = function(e) {
      e.preventDefault();
      task.name = document.getElementById('taskName').value;
      task.type = document.getElementById('taskType').value;
      task.description = document.getElementById('taskDescription').value;
      task.color = document.getElementById('taskBgColor').value;
      tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
    };
  }
  function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  }
  document.getElementById('clearAllBtn').addEventListener('click', function() {
    localStorage.removeItem('tasks');
    displayTasks();
  });
  document.getElementById('searchInput').addEventListener('keyup', function(e) {
    const searchValue = e.target.value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => 
      task.name.toLowerCase().includes(searchValue) || 
      task.type.toLowerCase().includes(searchValue));
    displayTasks(filteredTasks);
  });