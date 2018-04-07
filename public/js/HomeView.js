// homeview.js

HomeView = Backbone.View.extend({
	initialize: function() {
		this.render();
		// var html = '';

		// html += '<html>';
		// html += 

		// this.$el.html(html);
	},
	render: function() {
		this.addComponent('svg viewBox="0 0 100 100"', 100, 100, 0, 0, '<rect width="100" height="25" style="fill:red;"/><polygon points="0,0 0,100 50,100" style="fill:black;" />');
		this.addComponent('div class="game-title"', 5, 20, 10, 10, '<a href="/#title1">Title 1</a>');
		this.addComponent('div class="game-title"', 5, 75, 15, 15, '<a href="/#title2">Adventures of Yeezy the Wize</a>');

		// this.addHtml('<div class="game-title">Title 1</div>');
		// this.addHtml('<div class="game-title">Title 2</div>');
	},
	addComponent: function(type, height, width, top, left, html) {
		var el = $('<' + type + '/>');

		el.css({
			height: height + 'vw',
			width: width + 'vw',
			top: top + 'vw',
			left: left + 'vw',
			position: 'absolute'
		});
		el.html(html);
		el.appendTo(this.$el);
	},
	addHtml: function(html) {
		$(html).appendTo(this.$el);
	}
});