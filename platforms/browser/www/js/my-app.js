// Initialize your app
var myApp = new Framework7({
    modalTitle: 'ToDo7'
});

// Export selectors engine
var $$ = Dom7;

// Add views
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var todoData = localStorage.td7Data ? JSON.parse(localStorage.td7Data) : [];

//page navigation stuff
myApp.onPageInit('create', function (page) {
  // Do something here for "about" page
  $$('.add-task').on('click', function () {
      var title = $$('input[name="title"]').val().trim();
      if (title.length === 0) {
          return;
      }
      todoData.push({
          title: title,
          checked: '',
          id: (new Date()).getTime()
      });
      localStorage.td7Data = JSON.stringify(todoData);
      buildTodoListHtml();
      myApp.closeModal('.popup');
  });
  console.log('create page initialized');
});

myApp.onPageInit('index', function(todo) {
  console.log('HOME');
});

// Build Todo HTML using Template7 template engine
var todoItemTemplateSource = $$('#todo-item-template').html();
var todoItemTemplate = Template7.compile(todoItemTemplateSource);
function buildTodoListHtml() {
    var renderedList = todoItemTemplate(todoData);
    $$('.todo-items-list').html(renderedList);
}
// Build HTML on App load
buildTodoListHtml();

// Mark checked
$$('.todo-items-list').on('change', 'input', function () {
    var input = $$(this);
    var item = input.parents('li');
    var checked = input[0].checked;
    var id = item.attr('data-id') * 1;
    for (var i = 0; i < todoData.length; i++) {
        if (todoData[i].id === id) todoData[i].checked = checked ? 'checked' : '';
    }
    localStorage.td7Data = JSON.stringify(todoData);
});

// Delete item
$$('.todo-items-list').on('delete', '.swipeout', function () {
    var id = $$(this).attr('data-id') * 1;
    var index;
    for (var i = 0; i < todoData.length; i++) {
        if (todoData[i].id === id) index = i;
    }
    if (typeof(index) !== 'undefined') {
        todoData.splice(index, 1);
        localStorage.td7Data = JSON.stringify(todoData);
    }
});
