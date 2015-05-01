var app = app || {}
app.TodoList = Backbone.Collection.extend({
      model: app.Todo,
      localStorage: new Store("Backbone-todo")
    });

app.todoList = new app.TodoList();