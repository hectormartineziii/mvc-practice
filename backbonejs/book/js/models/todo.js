var app = app || {};

app.Todo = Backbone.Model.extend({
	
	defauls: {
		title: '',
		completed: false
	},

	toggle: function () {
		this.save({
			completed: !this.get('completed')
		});
	}
});