// Title1.js

// homeview.js

scale = 0.3;

Title1View = HomeView.extend({
	initialize: function() {

		_.bindAll(this, 'update', 'keyup', 'keydown');

		game = {
			px: 10,
			py: 10,
			xv: 0,
			yv: 0,
			grav: 0.5,
			onG: false,
			holdLeft: false,
			holdRight: false,
			plats: []
		};


		this.render();
	},
	render: function() {
		this.addComponent('svg viewBox="0 0 100 100"', 100, 100, 0, 0, '<rect width="100" height="25" style="fill:red;"/><polygon points="0,0 0,100 50,100" style="fill:black;" />');
		this.addComponent('div class="game-title"', 5, 20, 5, 5, 'Title 1');

		var html = '';

		html += '<div>';
		html += '<canvas class="game-canvas" width="1000px" height="450px" style="border: 1px solid black; top:150px; left:100px; position:absolute;">';
		html += '</canvas>';
		html += '</div>';

		this.addHtml(html);
		this.prepGame();
	},
	prepGame: function() {
		canvas = this.$('.game-canvas'),
			width = canvas.width(),
			height = canvas.height();

		console.log(width);
		console.log(height);
		for (var i = 0; i < 100; i++) {
			game.plats.push({
				x: Math.random() * width,
				y: Math.random() * height,
				h: (Math.random() * 30) + 5 ,
				w: (Math.random() * 100) + 30
			});
		}

		context = canvas[0].getContext('2d');
		setInterval(this.update, 1000/60);
		document.addEventListener("keyup", this.keyup);
		document.addEventListener("keydown", this.keydown);
	},
	update: function() {

		if (game.holdLeft) {
			game.xv=-2;
		}

		if (game.holdRight) {
			game.xv=2;
		}

		if (game.onG) {
			game.xv *= 0.8;
		} else {
			game.yv += game.grav;
		}

		game.onG = false;
		for(i = 0; i < 100; i++) {
			if (game.px > game.plats[i].x && game.px < game.plats[i].x + game.plats[i].w &&
				game.py > game.plats[i].y && game.py < game.plats[i].y + game.plats[i].h) {
				game.py = game.plats[i].y - 5;
				game.onG = true;
			}
		}

		game.px += game.xv;
		game.py += game.yv;

		if (game.px > 1000) game.px = 0;
		if (game.py > 450) game.py = 0;

		if (game.px < 0) game.px = 1000;
		if (game.py < 0) game.py = 450;

		context.fillStyle = "darkgray";
		context.fillRect(0, 0, canvas.width(), canvas.height());
		context.fillStyle = "white";
		context.fillRect(game.px-5, game.py - 20, 5, 20);
		context.fillStyle = "black";
		for (var i = 0; i < 100; i++) {
			context.fillRect(game.plats[i].x, game.plats[i].y, game.plats[i].w, game.plats[i].h)
		}
	},
	keydown: function(e) {
		switch (e.keyCode) {
			case 37:
				game.holdLeft = true;
				break;
			case 38:
				if (game.onG) {
					game.yv = -7;
				}
				break;
			case 39:
				game.holdRight = true;
				break;
		}
	},
	keyup: function(e) {
		switch (e.keyCode) {
			case 37:
				game.holdLeft = false;
				break;
			case 38:
				if (game.onG) {
					if (game.yv < -1) game.yv = -1;
				}
				break;
			case 39:
				game.holdRight = false;
				break;
		}
	}
});