'use strict';

class CatPawMover {
	constructor(container, tracker) {

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
		this.tracker = tracker;

		// do
		this.initHammer();

		this.tracker.on("poke_update", this.catPawMove);

	}

	initHammer() {

		this.gesture = new Hammer(this.container);
		this.gesture.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		this.gesture.on('panstart', this.catPawIn);
		this.gesture.on('panend', this.catPawOut);
		this.gesture.on('pancancel', this.catPawOut);

	}

	catPawDebug(e) {

		let rotation = this.catPawAngle(this.windowWidth, this.windowHeight, e.x, e.y);
		TweenLite.set(this.paw, {x:(e.x) - (0.5 * this.rect.width), y:((e.y) - (this.rect.height)), rotation: rotation});

	}

	catPawIn(e) {
		// bring the cat paw to wherever the mouse click started
		TweenLite.to(this.paw, 0.3, { opacity: 1 });
	}

	catPawOut(e) {
		// move the cat paw out at the correct angle
		TweenLite.to(this.paw, 0.2, { opacity: 0 });
	}

	catPawMove(e) {
		TweenLite.set(this.paw, {x:e.x - (this.rect.width * 0.5), y:e.y - (this.rect.height), rotation: e.a });
	}

}