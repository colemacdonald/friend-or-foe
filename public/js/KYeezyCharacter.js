//KYeezyStates.js

class KYeezy extends ControllableCharacter {
	constructor(options) {
		options = options || {};
		options.speed = 4;

		options.h = 80;
		options.w = 40;
		

		// Call super class constructor
		super(options);

		// Based of top left corner
		this.hurtBoxes = [{ x: 5, y:10, h:70, w:30 }];
		this.hitBoxes = [];

		// Images
		// TODO: COLE: bootstrap character frames
	}

	getFrame() {
		var frameGroup,
			direction;
			
			
		// Find group
		if (this.onG && this.xv !== 0) {
			frameGroup = STATES.WALKING;
			
			// Update counter
			this.frameCounter = (this.frameCounter + 1) % frameGroup[this.direction].length;
			return { src: frameGroup[this.direction][this.frameCounter], x_offset: frameGroup.x_offset };
		}
		
		
		if (this.direction === DIRECTIONS.LEFT) {
			return { src: 'rsc/kyell_still_left.png', x_offset: 0 };
		} else {
			return { src: 'rsc/kyell_still_right.png', x_offset: 0 };
		}
	}
}

STATES = {
	IDLE: {
		right: [],
		left: []
	},
	WALKING: {
		x_offset: 40,
		right: [
			'rsc/kyell_walk/kyell_walk_hairmove0000.png',
			'rsc/kyell_walk/kyell_walk_hairmove0000.png',
			'rsc/kyell_walk/kyell_walk_hairmove0001.png',
			'rsc/kyell_walk/kyell_walk_hairmove0001.png',
			'rsc/kyell_walk/kyell_walk_hairmove0002.png',
			'rsc/kyell_walk/kyell_walk_hairmove0002.png',
			'rsc/kyell_walk/kyell_walk_hairmove0003.png',
			'rsc/kyell_walk/kyell_walk_hairmove0003.png',
			'rsc/kyell_walk/kyell_walk_hairmove0004.png',
			'rsc/kyell_walk/kyell_walk_hairmove0004.png',
			'rsc/kyell_walk/kyell_walk_hairmove0005.png',
			'rsc/kyell_walk/kyell_walk_hairmove0005.png',
			'rsc/kyell_walk/kyell_walk_hairmove0006.png',
			'rsc/kyell_walk/kyell_walk_hairmove0006.png',
			'rsc/kyell_walk/kyell_walk_hairmove0007.png',
			'rsc/kyell_walk/kyell_walk_hairmove0007.png',
			'rsc/kyell_walk/kyell_walk_hairmove0008.png',
			'rsc/kyell_walk/kyell_walk_hairmove0008.png',
			'rsc/kyell_walk/kyell_walk_hairmove0009.png',
			'rsc/kyell_walk/kyell_walk_hairmove0009.png',
			'rsc/kyell_walk/kyell_walk_hairmove0010.png',
			'rsc/kyell_walk/kyell_walk_hairmove0010.png',
			'rsc/kyell_walk/kyell_walk_hairmove0011.png',
			'rsc/kyell_walk/kyell_walk_hairmove0011.png',
			'rsc/kyell_walk/kyell_walk_hairmove0012.png',
			'rsc/kyell_walk/kyell_walk_hairmove0012.png',
			'rsc/kyell_walk/kyell_walk_hairmove0013.png',
			'rsc/kyell_walk/kyell_walk_hairmove0013.png'
		],
		left: [
			'rsc/kyell_walk/kyell_walk_hairmove0000.png',
			'rsc/kyell_walk/kyell_walk_hairmove0001.png',
			'rsc/kyell_walk/kyell_walk_hairmove0002.png',
			'rsc/kyell_walk/kyell_walk_hairmove0003.png',
			'rsc/kyell_walk/kyell_walk_hairmove0004.png',
			'rsc/kyell_walk/kyell_walk_hairmove0005.png',
			'rsc/kyell_walk/kyell_walk_hairmove0006.png',
			'rsc/kyell_walk/kyell_walk_hairmove0007.png',
			'rsc/kyell_walk/kyell_walk_hairmove0008.png',
			'rsc/kyell_walk/kyell_walk_hairmove0009.png',
			'rsc/kyell_walk/kyell_walk_hairmove0010.png',
			'rsc/kyell_walk/kyell_walk_hairmove0011.png',
			'rsc/kyell_walk/kyell_walk_hairmove0012.png',
			'rsc/kyell_walk/kyell_walk_hairmove0013.png'
		]
	},
	JUMPING: {
		right: [],
		left: []
	},
	INAIR: {
		right: [],
		left: []
	},
	JUMPING: {
		right: [],
		left: []
	}
};