

class Title2Game {
	
	/**
	 * Create a new game
	 */
	constructor() {
		this.fps = 45;

		this.px = 10;
		this.py = 10;
		this.ph = 50;
		this.pw = 25;

		this.xv = 0;
		this.yv = 0;
		this.grav = 0.5;
		this.platforms = [];
		this.monsters = [];
		this.coins = [];
		this.onG = false;
		this.holdRight = false;
		this.holdLeft = false;

		this.playerAlive = true;
		this.score = 0;

		this.height = 2000;
		this.width = 2000;
		this.drawWidth = 1000;
		this.drawHeight = 500;

		for (var i = 0; i < 50; i++) {
			this.platforms.push({
				x: Math.random() * this.drawWidth,
				y: Math.random() * this.drawHeight,
				h: (Math.random() * 30) + 15 ,
				w: (Math.random() * 100) + 50
			});
		}

		for (var i = 0; i < 10; i++) {
			this.monsters.push({
				x: this.platforms[i].x + this.platforms[i].w/2,
				y: this.platforms[i].y - 20,
				h: 20,
				w: 5
			});

			// this.coins.push({
			// 	x: this.platforms[i].x + 5
			// 	y: y: this.platforms[i].y - 10,
			// });
		}
	}

	/**
	 * Update the game state to the next frame
	 */
	update() {

		// What direction are you moving? 
		if (this.holdLeft) {
			this.xv=-2;
		}
		if (this.holdRight) {
			this.xv=2;
		}

		// Gravity
		if (this.onG) {
			this.xv *= 0.5;
		} else {
			this.yv += this.grav;
		}

		// On a platform
		this.onG = false;
		_.each(this.platforms, function(plat) {
			if (this.px > plat.x && this.px < plat.x + plat.w &&
				this.py > plat.y && this.py < plat.y + plat.h) {
				this.py = plat.y - 5;
				this.onG = true;
			}
		}, this);

		_.each(this.monsters, function(monster) {
			if (
				((this.px > monster.x && this.px < monster.x + monster.w) ||
				(this.px + this.pw > monster.x && this.px < monster.x + monster.w)) &&
				((this.py > monster.y && this.py < monster.y + monster.h) || 
				(this.py + this.ph > monster.y && this.py < monster.y + monster.h))
				) {
				this.playerAlive = false;
			}
		}, this);

		// Move
		this.px += this.xv;
		this.py += this.yv;

		if (this.px > this.drawWidth) this.px = 0;
		if (this.py > this.drawHeight) this.py = 0;

		if (this.px < 0) this.px = 1000;
		if (this.py < 0) this.py = 450;
	}

	/**
	 * Get array of platforms that are in the current view
	 */
	getDrawablePlatforms() {
		return this.platforms;
	}

	/**
	 *
	 */
	getDrawableMonsters() {
		return this.monsters;
	}	 

	/***************** EVENTS *******************/

	leftDown() {
		this.holdLeft = true;
	}

	leftUp() {
		this.holdLeft = false;
	}

	rightDown() {
		this.holdRight = true;
	}

	rightUp() {
		this.holdRight = false;
	}

	upDown() {
		if (this.onG) this.yv = -7;
	}

	upUp() {
		if (this.onG) {
			if (this.yv < -1) this.yv = -1;
		}
	}
}