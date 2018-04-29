//Title2.js

WizeView = HomeView.extend({
	initialize: function() {
		_.bindAll(this, 'update', 'keyup', 'keydown');

		this.game = new WizeGame();

		this.viewportH = 600;
		this.viewportW = 1200;
		this.viewportY = this.game.getMainCharacter().x - 100;
		this.viewportX = this.game.getMainCharacter().y - 100;

		// Background
		this.addComponent('svg viewBox="0 0 100 100"', 100, 100, 0, 0, '<rect width="100" height="25" style="fill:slategrey;"/><polygon points="0,0 0,100 50,100" style="fill:black;" />');
		// Title
		this.addComponent('div class="game-title"', 5, 100, 1, 1, 'Adventures of the Wize');

		// Canvas
		var html = '<canvas class="game-canvas" height="' + this.viewportH + 'px" width="' + this.viewportW + 'px" style="border: 1px solid black; top:50px; left:20px; position:absolute;"></canvas>';
		this.addHtml(html);
		this.startGame();
	},

	/*
	 * Gets the canvas context and initializes events
	 */
	startGame: function() {
		this.canvas = this.$('.game-canvas');

		this.cntx = this.canvas[0].getContext('2d');
		this.cntx.imageSmoothingEnabled = false;
		setInterval(this.update, 1000/this.game.fps);
		document.addEventListener("keyup", this.keyup);
		document.addEventListener("keydown", this.keydown);
	},
	onClose: function() {
		// be sure to remove document listeners to avoid leaks
		document.removeEventListener("keyup", this.keyup);
		document.removeEventListener("keydown", this.keydown);
	},



	/*
	 * Calls various draw functions in order
	 */
	drawGame: function() {
		if (!this.game.playerAlive) {
			this.$el.html('Game over');
		}

		this.cntx.clearRect(0, 0, this.canvas.width(), this.canvas.height());

		// Background
		this.cntx.fillStyle = "lightblue";
		this.cntx.fillRect(0, 0, this.canvas.width(), this.canvas.height());

		// Draw platforms (which are currently coded to hav width of 50 that are >= 100)
		this.drawPlatforms();

		// Monsters
		this.drawMonsters();

		// Coins
		this.drawCoins();

		// Player
		this.drawPlayer();

		// Score
		this.cntx.fillStyle = "red";
		this.cntx.font = "30px Arial"
		this.cntx.fillText('Score: ' + this.game.score, 10, 30);
	},



	/*
	 * Draws each platform that exists inside the viewport at its position offset the viewport
	 */
	drawPlatforms: function() {
		var plats = this.game.platforms;

		_.each(plats, function(plat) {
			// If visible
			if (util.doRectanglesOverlap(this.viewportX, this.viewportY, this.viewportH, this.viewportW, plat.x, plat.y, plat.h, plat.w)) {
				var x = plat.x;

				// Left corner
				var left = new Image();
				left.src = TILES.grass_left;
				this.cntx.drawImage( left , plat.x - this.viewportX, plat.y - this.viewportY, TILES.w, TILES.h);

				// Middle tiles
				var mid = new Image();
				mid.src = TILES.grass_mid;

				var i = 1;
				// Until we reach the right side
				while ((i+1)*TILES.w < plat.w) {
					this.cntx.drawImage( mid, plat.x + TILES.w*i - this.viewportX, plat.y - this.viewportY, TILES.w, TILES.h);

					i++;
				}

				// Right corner
				var right = new Image();
				right.src = TILES.grass_right;
				this.cntx.drawImage( right, plat.x + TILES.w*i - this.viewportX, plat.y - this.viewportY, TILES.w, TILES.h);
			}
		}, this);
	},


	/*
	 * Draws each monster that exists inside the viewport at its position offset the viewport
	 */
	drawMonsters: function() {
		var monsters = this.game.monsters;

		this.cntx.fillStyle = "orange";
		_.each(monsters, function(monster) {
			if (util.doRectanglesOverlap(this.viewportX, this.viewportY, this.viewportH, this.viewportW, 
				monster.x, monster.y, monster.h, monster.w)) {
				this.cntx.fillRect(monster.x - this.viewportX, monster.y - this.viewportY, monster.w, monster.h);
			}
		}, this);
	},


	/*
	 * Draws each coin that exists inside the viewport at its position offset the viewport
	 */
	drawCoins: function() {
		var coins = this.game.coins;

		this.cntx.fillStyle = 'yellow';
		_.each(coins, function(coin) {
			if (util.doRectanglesOverlap(this.viewportX, this.viewportY, this.viewportH, this.viewportW, 
				coin.x - coin.r, coin.y - coin.r, 2*coin.r, 2*coin.r)) {

				this.cntx.beginPath();
				this.cntx.arc(coin.x - this.viewportX, coin.y - this.viewportY, coin.r, 0, 2 * Math.PI, false);
		    	this.cntx.fill();
		    }
  		}, this);
	},



	/*
	 * Draws the player at its position offset the viewport
	 */
	drawPlayer: function() {
		var c = this.game.getMainCharacter(),
			frame = c.getFrame(),
			img = new Image();
		img.src = frame.src;
		this.cntx.drawImage( img , c.x - this.viewportX - frame.x_offset, c.y - this.viewportY, c.w + frame.x_offset, c.h);
		
		// this.cntx.fillStyle = 'purple';
		// this.cntx.fillRect(c.x - this.game.viewx, c.y - this.game.viewy, c.w, c.h);
	},


	/*
	 * To be called at the frame rate.
	 * 
	 */
	update: function() {
		this.game.update();
		this.drawGame();
		this.updateViewport();
	},


	/*
	 * Update the viewport if the character gets too close to the edge
	 */
	updateViewport: function() {
		var c = this.game.getMainCharacter();
		if (c.x < this.viewportX + 0.3 * this.viewportW) {
			this.viewportX = c.x - 0.3 * this.viewportW;
		} else if (c.x > this.viewportX + 0.7 * this.viewportW) { 
			this.viewportX = c.x - 0.7 * this.viewportW;
		}

		if (c.y < this.viewportY + 0.35 * this.viewportH) {
			this.viewportY = c.y - 0.35 * this.viewportH;
		} else if (c.y > this.viewportY + 0.65 * this.viewportH) {
			this.viewportY = c.y - 0.65 * this.viewportH;
		}
	},


	/**
	 * EVENTS
	 */
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