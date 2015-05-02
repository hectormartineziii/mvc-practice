var app = app || {};
    app.AppView = Backbone.View.extend({
      el: '#todoapp',
      initialize: function(){
         this.allCheckbox = this.$('#toggle-all')[0];
         this.$input = this.$('#new-todo');
         this.$footer = this.$('#footer');
         this.$main = this.$('#main');
         this.listenTo(app.todoList, 'add', this.addOne);
         this.listenTo(app.todoList, 'reset', this.addAll);
         this.listenTo(app.todoList, 'change:completed', this.filterOne);
         this.listenTo(app.todoList, 'filter', this.filterAll);

         app.todoList.fetch();
      },      
      statsTemplate: _.template( $('#stats-template').html()),
      events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'      
      },
      render: function () {
         var completed = app.Todos.completed().length;
         var remaining = app.Todos.remaining().length;

         if (app.Todos.length){
           this.$main.show();
           this.$footer.show();
          
           this.$footer.html(this.statsTemplate({
             completed: completed,
             remaining: remaining
           }));

           this.$('#filters li a')
             .removeClass('selected')
             .filter('[href="#/' + ( app.TodoFilter || '') + '"]')
             .addClass('selected');
         } else {
           this.$main.hide();
           this.$footer.hide();
         }

         this.allCheckbox.checked = !remaining;
          
      },
      createOnEnter: function (event){
         if (event.which !== ENTER_KEY || !this.$input.val().trim()){
           return;
         }

         app.todoList.create(this.newAttributes());
         this.$input.val('');
      },
      addOne: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
      },
      addAll: function(){
        this.$('#todo-list').html(''); // clean the todo list
        app.todoList.each(this.addOne, this);
      },
      newAttributes: function() {
         return {
           title: this.$input.val().trim(),
           order: app.todoList.nextOrder(),
           completed: false
         };
      },
      filterOne : function (todo){
         todo.trigger('visible');
      },
      filterAll: function () {
         app.Todos.each(this.filterOne, this);
      },
       clearCompleted: function() {
         _.invoke(app.todoList.completed(), 'destroy');
         return false;
      },
      toggleAllComplete: function () {
         var completed = this.allCheckbox.checked;

         app.TodoList.each(function(todo){
           todo.save({
             'completed': completed
           });
         });
      }
    });
    var ENTER_KEY = 13;
    app.appView = new app.AppView();