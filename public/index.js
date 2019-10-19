function buildList(tasks) {
  var tasksList = tasks.map(function(task){
    return `
      <li id=${task.id} class="task-item">
        ${task.task}
        <button type="button" class="btn btn-danger btn-sm button" onClick="deleteTask(${task.id})">
          <span class="button">&times;</span> Remove 
        </button>
      </li>
      </br>
    `
  })
  return `
    <ul id="taskList">
      ${tasksList.join('')}           
    </ul> `
}
function renderTasks() {
  var taskContainer = document.getElementById('taskContainer');
  axios.get('/api/todos').then(function (response) {
    taskContainer.innerHTML = buildList(response.data);
  })
}

renderTasks()

function addTask() {
  var taskInput = document.getElementById('taskInput').value
  axios.post('/api/todos', {task: taskInput}).then(function() {
    renderTasks()
    document.getElementById('taskInput').value = ' '
  })
  
}

function deleteTask(id) {
  axios.delete('/api/todos/' + id).then(function(req) {
    renderTasks()
  })
}