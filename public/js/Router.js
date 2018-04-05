// router.js

GameRouter = Backbone.Router.extend({
	routes: {
		'': 'index'
	},
	index: function() {
		if (this.content) this.content.remove();
		var el = $('<div></div>').appendTo($('.content'));
		this.content = new HomeView({ el: el });
	}
});