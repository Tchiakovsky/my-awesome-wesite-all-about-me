angular.module('todoApp', ['ui.bootstrap'])
  .controller('TodoListController', ['$modal', '$log', function ($modal, $log) {
    var todoList = this;
    todoList.todos = [

      { text: 'build an AngularJS app', done: false, spliced: false, priority: 4 }
    ];

    todoList.completed = [
      { text: 'learn AngularJS', done: true, spliced: false, priority: 2 }
    ];

    todoList.addTodo = function () {
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
      item.done = false;
    }

    todoList.archive = function (item) {
      item.done = true;
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

    todoList.fullyDelete = function(item) {

      todoList.verifyDelete();
      //alert("Are you sure you want to delete this todo? This action is irreversible!");
    }

    todoList.verifyDelete = function () {

        $modal.open({
            templateUrl: 'myModalContent.html', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, $modalInstance, $log, item) {
                $scope.item = item;
                $scope.submit = function () {
                $log.log('Submiting user info.'); // kinda console logs this statement
                var index = todoList.completed.indexOf(item);
                todoList.completed.splice(index, 1);
                $modalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel'); 
                };
            },
            resolve: {
                item: function () {
                    return todoList.item;
                }
            }
            });//end of modal.open
    }; // end of scope.open functions
  
  }]);