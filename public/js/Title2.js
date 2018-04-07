//Title2.js

Title2View = HomeView.extend({
	initialize: function() {
		_.bindAll(this, 'update', 'keyup', 'keydown');

		this.game = new Title2Game();

		this.addComponent('svg viewBox="0 0 100 100"', 100, 100, 0, 0, '<rect width="100" height="25" style="fill:red;"/><polygon points="0,0 0,100 50,100" style="fill:black;" />');
		this.addComponent('div class="game-title"', 5, 100, 5, 5, 'Adventures of Yeezy the Wize');

		var html = '<canvas class="game-canvas" height="' + this.game.drawHeight + 'px" width="' + this.game.drawWidth + 'px" style="border: 1px solid black; top:150px; left:100px; position:absolute;"></canvas>';
		this.addHtml(html);

		this.addHtml('<img class="player" src="rsc/kyell-still.png" />');

		this.startGame();
	},
	// Starts the game
	startGame: function() {
		this.canvas = this.$('.game-canvas');

		this.cntx = this.canvas[0].getContext('2d');
		setInterval(this.update, 1000/this.game.fps);
		document.addEventListener("keyup", this.keyup);
		document.addEventListener("keydown", this.keydown);
	},
	// Draws based on current game state
	drawGame: function() {
		var plats = this.game.getDrawablePlatforms(),
			monsters = this.game.getDrawableMonsters();

		if (!this.game.playerAlive) {
			this.$el.html('Game over');
		}

		// Background
		this.cntx.fillStyle = "slategrey";
		this.cntx.fillRect(0, 0, this.canvas.width(), this.canvas.height());

		// Player
		// this.cntx.fillStyle = "white";
		// this.cntx.fillRect(this.game.px, this.game.py - this.game.ph, this.game.pw, this.game.ph);
		var player = $('.player')[0];
		this.cntx.drawImage(player, this.game.px, this.game.py - this.game.ph);

		// Draw platforms
		this.cntx.fillStyle = "black";
		_.each(plats, function(plat) {
			this.cntx.fillRect(plat.x, plat.y, plat.w, plat.h);
		}, this);

		// Monsters
		this.cntx.fillStyle = "green";
		_.each(monsters, function(monster) {
			this.cntx.fillRect(monster.x, monster.y, monster.w, monster.h);
		}, this);

	},
	//Periodical
	update: function() {
		this.game.update();
		this.drawGame();
	},
	keyup: function(e) {
		switch (e.keyCode) {
			case 37:
				this.game.leftUp();
				break;
			case 38:
				this.game.upUp();
				break;
			case 39:
				this.game.rightUp();
				break;
		}
	},
	keydown: function(e) {
		switch (e.keyCode) {
			case 37:
				this.game.leftDown();
				break;
			case 38:
				this.game.upDown();
				break;
			case 39:
				this.game.rightDown();
				break;
		}
	}
});