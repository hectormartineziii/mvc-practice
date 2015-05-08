angular.module('todoApp',[])
	.controller('TodoListController', function(){
		var todoList = this;

		todoList.todos = [
			{text: 'my first todo', done: false},
			{text: 'my second todo', done: false}
		];

		todoList.remaining = function(){
			var counter=0;
			todoList.todos.forEach(function(todo){
				if(todo.done)
					counter++
			});
			return counter
		};

		todoList.archive = function(){
			todoList.todos = todoList.todos.filter(function(todo){
				return !todo.done
			})
		};

		todoList.addTodo = function(){
			todoList.todos.push({text: todoList.todoText});
			todoList.todoText = '';
		};
	
	});
