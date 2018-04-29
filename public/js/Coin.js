class Coin {
	constructor (options) {
		this.x = options.x;
		this.y = options.y;
		this.r = options.r ? options.r : 15;
		
		this.imageCounter = Math.floor(Math.random() * COIN_FRAMES.sources.length);
		this.frameCounter = 0;
	}
	
	getImageIndex () {
		this.frameCounter = (this.frameCounter + 1) % 4;
		
		if (this.frameCounter === 0) {
			this.imageCounter = (this.imageCounter + 1) % COIN_FRAMES.sources.length;
		}
		
		return this.imageCounter;
	}
	
}

COIN_FRAMES = {
	sources: [
		'rsc/coin/coin0000.png',
		'rsc/coin/coin0001.png',
		'rsc/coin/coin0002.png',
		'rsc/coin/coin0003.png',
		'rsc/coin/coin0004.png',
		'rsc/coin/coin0005.png',
		'rsc/coin/coin0006.png',
		'rsc/coin/coin0007.png',
		'rsc/coin/coin0008.png',
		'rsc/coin/coin0009.png',
		'rsc/coin/coin0010.png',
		'rsc/coin/coin0011.png',
		'rsc/coin/coin0012.png',
		'rsc/coin/coin0013.png'
	],
	images: []
};