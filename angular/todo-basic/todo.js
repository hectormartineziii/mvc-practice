function TodoCtrl($scope){

	$scope.todos = [
		{text: 'First todo item', done: false},
		{text: 'Second todo item', done: false}
	];

	$scope.getTotalTodos = function(){
		return $scope.todos.length		
	};

	$scope.removeCompleted = function(){
		$scope.todos = _.filter($scope.todos, function(todo){
			return !todo.done
		})
	}

	$scope.addTodo = function(){
		$scope.todos.push({text: $scope.formTodoText, done: false});
		$scope.formTodoText ='';
	}
}