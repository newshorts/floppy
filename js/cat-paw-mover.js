/**
 * @copyright 2018 Apple Inc. All rights reserved.
 * @author michael_newell@apple.com
 */

'use strict';

class CatPawMover {
	constructor(container) {
		// bind
		this.catPawDebug = this.catPawDebug.bind(this);
		this.catPawIn = this.catPawIn.bind(this);
		this.catPawOut = this.catPawOut.bind(this);
		this.catPawMove = this.catPawMove.bind(this);
		this.catPawAngle = this.catPawAngle.bind(this);

		// set
		this.container = container;
		this.gesture = null;
		this.paw = this.container.querySelector('.paw');
		this.windowHeight = document.documentElement.offsetHeight;
		this.windowWidth = document.documentElement.offsetWidth;
		this.rect = this.paw.getBoundingClientRect();

		// do
		this.initHammer();
	}

	initHammer() {
		this.gesture = new Hammer(this.container);
		this.gesture.get('pan').set({ direction: Hammer.DIRECTION_ALL });


		this.container.addEventListener('mousemove', this.catPawDebug);
		this.gesture.on('panstart', this.catPawIn);
		this.gesture.on('panmove', this.catPawMove);
		this.gesture.on('panend', this.catPawOut);
		this.gesture.on('pancancel', this.catPawOut);

	}

	catPawDebug(e) {

		let rotation = this.catPawAngle(this.windowWidth, this.windowHeight, e.x, e.y);
		TweenLite.set(this.paw, {x:e.x - (0.5 * this.rect.width), y:(e.y - (this.rect.height)), rotation: rotation});

	}

	catPawIn() {
		// bring the cat paw to wherever the mouse click started
	}

	catPawOut() {
		// move the cat paw out at the correct angle
	}

	catPawMove() {
		// move the paw as the mouse moves but does not release
	}

	/**
	 * calc center of screen and point the paw to it
	 * @returns {*}
	 */
	catPawAngle(ww, wh, x, y) {

		let x1 = ww * 0.5;
		let y1 = wh * 0.5;
		let angle = Math.atan2((x - x1), (y - y1));
		return 180 - Math2.toDegrees(angle);

	}


}