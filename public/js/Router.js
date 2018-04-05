// router.js

GameRouter = Backbone.Router.extend({

	greeting: null,
    container: null,
    view1: null,
    view2: null,
    view3: null,

	routes: {
		'': 'index'
	},
	index: function() {
		this.container = new HomeView({ el: $('.content') });
	}
});