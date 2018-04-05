// router.js

GameRouter = Backbone.Router.extend({
	routes: {
		'': 'index'
	},
	index: function() {
		var el = $('<div></div>').appendTo($('.content'));
		this.container = new HomeView({ el: el });
	}
});