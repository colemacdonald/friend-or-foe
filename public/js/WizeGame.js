

class WizeGame {
	
	/**
	 * Create a new game
	 */
	constructor() {
		this.fps = 60;
		this.speed = 3;

		this.character = new KYeezy();
		this.character.setPosition(100, 1300);

		this.platforms = [{x:0, y:1400, h:150 ,w:2000}];
		this.monsters = [];
		this.coins = [];

		this.playerAlive = true;
		this.grav = 0.5;

		this.score = 0;

		this.height = 1500;
		this.width = 1500;
		this.drawWidth = 1000;
		this.drawHeight = 500;
		this.viewx = this.character.x - 100;
		this.viewy = this.character.y - 100;

		for (var i = 0; i < 200; i++) {
			this.platforms.push({
				x: Math.random() * this.width,
				y: Math.random() * this.height,
				h: (Math.random() * 30) + 15 ,
				w: (Math.random() * 100) + 50
			});
		}

		for (var i = 0; i < 20; i++) {
			this.monsters.push({
				x: this.platforms[i].x + this.platforms[i].w/2,
				y: this.platforms[i].y - 20,
				h: 20,
				w: 10
			});
		}

		for (var i = 0; i < 20; i++) {
			this.coins.push({
				x: Math.random() * this.width,
				y: Math.random() * this.height,
				r: 5
			});
		}
	}

	/**
	 * Update the game state to the next frame
	 */
	update() {
		// On a platform
		this.onG = false;
		this.character.onG = false;
		_.each(this.platforms, function(plat) {
			if (util.doRectanglesOverlap(this.character.x, this.character.y + this.character.h*0.9, this.character.h*0.2, this.character.w, 
				plat.x, plat.y, plat.h, plat.w)
				&& !this.character.onG) {
				this.character.setCurrentPlatform(plat);
				this.onG = true;
			}
		}, this);

		// slow down or fall
		if (this.onG) {
			this.character.xv *= 0.5;
		} else {
			this.character.yv += this.grav;
		}

		_.each(this.monsters, function(monster) {
			if (util.doRectangleArraysOverlap(this.character.getHurtBoxes(), 
				[{ x: monster.x, y: monster.y, h: monster.h, w: monster.w }] )) {
				this.playerAlive = false;
			}
		}, this);

		var indices = [];
		_.each(this.coins, function(coin) {
			if (util.doRectangleArraysOverlap(this.character.getHurtBoxes(), 
					[{ x: coin.x-coin.r, y: coin.y-coin.r, h: coin.r * 2, w: coin.r *2 }] )) {
				this.score += 100;
				indices.push(this.coins.indexOf(coin));
			}
		}, this);

		for(var i = indices.length - 1; i >= 0 ; i--) {
			this.coins.splice(indices[i], 1);
		}

		// Move
		this.character.move();

		// Update ViewPort
		if (this.character.x < this.viewx + 0.3 * this.drawWidth) {
			this.viewx = this.character.x - 0.3 * this.drawWidth;
		} else if (this.character.x > this.viewx + 0.7 * this.drawWidth) { 
			this.viewx = this.character.x - 0.7 * this.drawWidth;
		}

		if (this.character.y < this.viewy + 0.35 * this.drawHeight) {
			this.viewy = this.character.y - 0.35 * this.drawHeight;
		} else if (this.character.y > this.viewy + 0.65 * this.drawHeight) {
			this.viewy = this.character.y - 0.65 * this.drawHeight;
		}

		// if (this.viewy > 1800) this.viewy = 1500;

		// if (this.px > this.width) this.px = 0;
		if (this.character.y > this.height) this.character.y = this.platforms[0].y - this.character.h - 5;
	}

	/**
	 * Get array of platforms that are in the current view
	 */
	getDrawablePlatforms() {
		// return this.platforms;
		var platforms = [];

		_.each(this.platforms, function(plat) {
			if (util.doRectanglesOverlap(this.viewx, this.viewy, this.drawHeight, this.drawWidth, plat.x, plat.y, plat.h, plat.w)) {
				platforms.push({
					x: plat.x - this.viewx,
					y: plat.y - this.viewy,
					h: plat.h,
					w: plat.w
				});
			}
		}, this);
		return platforms;
	}

	/**
	 *
	 */
	getDrawableMonsters() {
		// return this.monsters;

		var monsters = [];

		_.each(this.monsters, function(monster) {
			if (util.doRectanglesOverlap(this.viewx, this.viewy, this.drawHeight, this.drawWidth, monster.x, monster.y, monster.h, monster.w)) {
				monsters.push({
					x: monster.x - this.viewx,
					y: monster.y - this.viewy,
					h: monster.h,
					w: monster.w
				});
			}
		}, this);
		return monsters;
	}	 

	/**
	 *
	 */
	 getDrawableCoins() {
	 	var coins = [];
		_.each(this.coins, function(coin) {
			if (util.doRectanglesOverlap(this.viewx, this.viewy, this.drawHeight, this.drawWidth, coin.x-coin.r, coin.y-coin.r, coin.r * 2, coin.r *2)) {
				coins.push({
					x: coin.x - this.viewx,
					y: coin.y - this.viewy,
					r: coin.r
				});
			}
		}, this);

	 	return coins;
	 }

	 getMainCharacter() {
	 	return this.character;
	 }

	/***************** EVENTS *******************/

	leftPress() {
		this.character.leftPress();
	}

	leftRelease() {
		this.character.leftRelease();
	}

	rightPress() {
		this.character.rightPress();
	}

	rightRelease() {
		this.character.rightRelease();
	}

	upPress() {
		this.character.upPress();
	}

	upRelease() {
		this.character.upRelease();
	}

	downPress() {
		this.character.downPress();
	}

	downRelease() {
		this.character.downRelease()
	}
}