angular.module('todoApp', [])
  .controller('TodoListController', function () {
    var todoList = this;
    todoList.todos = [

      { text: 'build an AngularJS app', done: false, spliced: false }
    ];

    todoList.completed = [
      { text: 'learn AngularJS', done: true, spliced: false }
    ];

    todoList.addTodo = function () {
      // if (todoList.todoText === '') {
      //   return;
      // }
      todoList.todos.push({ text: todoList.todoText, done: false, priority: todoList.priority });
      todoList.todoText = '';
    };

    todoList.remaining = function () {
      var count = 0;
      angular.forEach(todoList.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
    todoList.delete = function (item) {
      var index = todoList.todos.indexOf(item);
      todoList.todos.splice(index, 1);
    }
    todoList.restore = function (item) {
      var index = todoList.completed.indexOf(item);
      todoList.completed.splice(index, 1);
      todoList.todos.push(item);
    }

    todoList.archive = function () {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };

    todoList.completeOnClick = function (todo) {
      if (!todo.done) {
        return;
      }
      todoList.completed.push(todo);

      var index = todoList.todos.indexOf(todo);
      todoList.todos.splice(index, 1);
      console.warn('LENGTH ' + todoList.completed.length);
    }

  });