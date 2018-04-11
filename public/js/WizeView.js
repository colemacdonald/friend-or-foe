//Title2.js

WizeView = HomeView.extend({
	initialize: function() {
		_.bindAll(this, 'update', 'keyup', 'keydown');

		this.game = new WizeGame();

		this.addComponent('svg viewBox="0 0 100 100"', 100, 100, 0, 0, '<rect width="100" height="25" style="fill:slategrey;"/><polygon points="0,0 0,100 50,100" style="fill:black;" />');
		this.addComponent('div class="game-title"', 5, 100, 5, 5, 'Adventures of the Wize');

		var html = '<canvas class="game-canvas" height="' + this.game.drawHeight + 'px" width="' + this.game.drawWidth + 'px" style="border: 1px solid black; top:150px; left:100px; position:absolute;"></canvas>';
		this.addHtml(html);
		// this.addHtml('<img src="rsc/kyell-still.png"/>');
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
	onClose: function() {
		document.removeEventListener("keyup", this.keyup);
		document.removeEventListener("keydown", this.keydown);
	},
	// Draws based on current game state
	drawGame: function() {
		var plats = this.game.getDrawablePlatforms(),
			monsters = this.game.getDrawableMonsters(),
			coins = this.game.getDrawableCoins();

		if (!this.game.playerAlive) {
			this.$el.html('Game over');
		}

		// Background
		this.cntx.fillStyle = "lightblue";
		this.cntx.fillRect(0, 0, this.canvas.width(), this.canvas.height());

		// Draw platforms
		this.cntx.fillStyle = "black";
		_.each(plats, function(plat) {
			this.cntx.fillRect(plat.x, plat.y, plat.w, plat.h);
		}, this);

		// Monsters
		this.cntx.fillStyle = "orange";
		_.each(monsters, function(monster) {
			this.cntx.fillRect(monster.x, monster.y, monster.w, monster.h);
		}, this);

		// Coins
		this.cntx.fillStyle = 'yellow';
		_.each(coins, function(coin) {
			this.cntx.beginPath();
			this.cntx.arc(coin.x, coin.y, coin.r, 0, 2 * Math.PI, false);
	    	this.cntx.fill();
  		}, this);


		// // Player
		var c = this.game.getMainCharacter();
		var img = new Image();
		img.src = 'rsc/kyell-still.png';
		this.cntx.drawImage( img , c.x - this.game.viewx, c.y - this.game.viewy);
		
		// this.cntx.fillStyle = 'purple';
		// this.cntx.fillRect(c.x - this.game.viewx, c.y - this.game.viewy, c.w, c.h);

		// Score
		this.cntx.fillStyle = "red";
		this.cntx.font = "30px Arial"
		this.cntx.fillText('Score: ' + this.game.score, 10, 30);

	},
	//Periodical
	update: function() {
		this.game.update();
		this.drawGame();
	},
	keyup: function(e) {
		switch (e.keyCode) {
			case 37:
				this.game.leftRelease();
				break;
			case 38:
				this.game.upRelease();
				break;
			case 39:
				this.game.rightRelease();
				break;
			case 40:
				this.game.downRelease();
				break;
		}
	},
	keydown: function(e) {
		switch (e.keyCode) {
			case 37:
				this.game.leftPress();
				break;
			case 38:
				this.game.upPress();
				break;
			case 39:
				this.game.rightPress();
				break;
			case 40:
				this.game.downPress();
				break;
		}
	}
});