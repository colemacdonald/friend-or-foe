// router.js

GameRouter = Backbone.Router.extend({
	routes: {
		'': 'index',
		'title1': 'title1',
		'wize': 'wize'
	},
	index: function() {
		if (this.content) this.content.remove();
		var el = $('<div></div>').appendTo($('.content'));
		this.content = new HomeView({ el: el });
	},
	title1: function() {
		if (this.content) this.content.remove();
		var el = $('<div></div>').appendTo($('.content'));
		this.content = new Title1View({ el: el });
	},
	wize: function() {
		if (this.content) this.content.remove();
		var el = $('<div></div>').appendTo($('.content'));
		this.content = new WizeView({ el: el });
	}
});