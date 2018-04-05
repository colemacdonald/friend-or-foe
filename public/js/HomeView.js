// homeview.js

HomeView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		this.addComponent('svg viewBox="0 0 100 100"', 100, 100, 0, 0, '<rect width="100" height="25" style="fill:red;"/><polygon points="0,0 0,100 50,100" style="fill:black;" />');
	},
	addComponent: function(type, height, width, top, left, html) {
		var el = $('<' + type + '/>');

		el.css({
			height: height + 'vw',
			width: width + 'vw',
			top: top + 'vw',
			left: left + 'vw'
		});
		el.html(html);
		el.appendTo(this.$el);
	}
});