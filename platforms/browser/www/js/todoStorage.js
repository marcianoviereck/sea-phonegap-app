var todos = {};
var idCounter = 0;

function saveTodo(name, description) {
  var newTodo = {
    'id': idCounter,
    'name': name,
    'description': description,
    'date': new Date(),
    'isComplete': false,
  };
  todos[idCounter] = newTodo;
  idCounter++;
  renderTodos();
}

function findTodo(id) {
  for(todo in todos) {
    var todoValue = todos[todo];
    if(todoValue.id == id) {
      return todoValue;
    }
  }
  return null;
}

function toggleCompleted(id) {
  var foundTodo = findTodo(id);
  foundTodo.isComplete = !foundTodo.isComplete;
  todos[id] = foundTodo;
  console.log(`toggling ${foundTodo.isComplete}: ${id}`);
  renderTodos();
}

function renderTodos() {
  var todosHtml = "";
  for(todo in todos) {
    var todoValue = todos[todo];

    if(todoValue) {
      var className = todoValue.isComplete ? 'completedTodo' : 'incompletedTodo';
      todosHtml += `<div
        onClick = "toggleCompleted(${todoValue.id})"
        class = "${className}">
          ${todoValue.name} ${todoValue.description}
      </div>`;
    }
  }
  $('.todosList').html(todosHtml);
}

function intializeTodoStorage() {
  $('.saveTodoButton').click(function() {
    var naam = $('#todos_naam').val();
    var beschrijving = $('#todos_beschrijving').val();

    saveTodo(naam, beschrijving);
  });
  renderTodos();
  console.log('initialized');
}
