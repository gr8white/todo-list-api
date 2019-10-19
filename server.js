var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var todoList = [
  {
    id: 1,
    task: 'Implement a REST API'
  },
  {
    id: 2,
    task: 'Take out the trash'
  }
]

app.use(express.static(__dirname + '/public'))

// GET /api/todos
app.get('/api/todos', function (req, res, nextFn) {
  res.send(todoList)
})
// GET /api/todos/:id
app.get('/api/todos/:id', function (req, res, nextFn) {
  var todoItm = req.params.id
  var todoObj = todoList.find(x => x.id == todoItm)
  res.send(todoObj)
})
// POST /api/todos
app.post('/api/todos', function (req, res, nextFn) {
  var newObj = {
    id: todoList.length + 1,
    ...req.body
  }
  todoList.push(newObj)
  res.send(todoList)
})
// PUT /api/todos/:id
app.put('/api/todos/:id', function (req, res, nextFn) { 
  var todoItm = req.params.id
  var todoObj = todoList.find(x => x.id == todoItm)
  Object.assign(todoObj, req.body)
  res.send(todoList)
})
// DELETE /api/todos/:id
app.delete('/api/todos/:id', function (req, res, nextFn) {
  var todoItm = req.params.id
  var todoObj = todoList.find(x => x.id == todoItm).id
  for( var i = 0; i < todoList.length; i++){ 
    if ( todoList[i].id == todoObj) {
      todoList.splice(i, 1); 
    }
  }
  res.send(todoList)
})
app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...')
})
