'use strict';

class CanvasController extends EventEmitterMicro {
	constructor(container, canvas) {
		super();

		// bind
		this.pokeStick = this.pokeStick.bind(this);

		// set
		this.container = container;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.rect = this.canvas.getBoundingClientRect();
		this.target = new THREE.Vector2(this.rect.width * 0.5, this.rect.height * 0.5);


		// do
		this.target.radius = this.rect.height * 0.2;
		this.target.collision = false;

		this.canvas.width = this.rect.width;
		this.canvas.height = this.rect.height;

		this.ctx.imageSmoothingEnabled = true;
		this.ctx.lineJoin = this.ctx.lineCap = 'round';
		this.ctx.shadowBlur = 0.5;
		this.ctx.shadowColor = 'rgb(0, 0, 0)';

		this.initHammer();
		this.debug();
	}

	initHammer() {

		this.gesture = new Hammer(this.container);
		this.gesture.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		this.gesture.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
		this.gesture.on('panmove', this.pokeStick);

	}

	debug() {

		// corner rects
		this.ctx.fillStyle="#FF0000";
		this.ctx.fillRect(0-5, 0-5, 10, 10);
		this.ctx.fillRect(this.rect.width-5,this.rect.height-5,10,10);
		this.ctx.fillRect(0-5,this.rect.height-5,10,10);
		this.ctx.fillRect(this.rect.width-5,0-5,10,10);
		this.ctx.fillStyle="#0000FF";
		this.ctx.fillRect(this.target.x - 5,this.target.y-5,10,10);

		// corner to corner
		this.ctx.strokeStyle = "rgba(0, 0, 0, 1)";
		this.ctx.moveTo(0,0);
		this.ctx.lineTo(this.rect.width,this.rect.height);
		this.ctx.moveTo(0,this.rect.height);
		this.ctx.lineTo(this.rect.width,0);
		this.ctx.stroke();

		// center circle
		this.ctx.beginPath();
		this.ctx.arc(this.target.x, this.target.y,this.target.radius,0,2*Math.PI);
		this.ctx.stroke();

		// hitbox
		this.ctx.closePath();
		this.ctx.fillStyle = (this.target.collision) ? "rgba(255, 34, 12, 0.1)" : "rgba(35, 255, 12, 0.1)";
		this.ctx.beginPath();
		this.ctx.arc(this.target.x, this.target.y,this.target.radius,0,2*Math.PI);
		this.ctx.fill();

	}

	pokeStick(e) {
		this.clear();

		let x = e.center.x;
		let y = e.center.y;

		let center = new THREE.Vector2(this.rect.width * 0.5, this.rect.height * 0.5);
		let mouse = new THREE.Vector2(x, y);

		center.multiply(mouse);

		this.ctx.moveTo(center.x, center.y);
		this.ctx.lineTo(mouse.x, mouse.y);
		this.ctx.stroke();

		center.sub(mouse);
		let angle = Math.atan2(center.x, center.y);

		let pos = {};
		pos.x = mouse.x;
		pos.y = mouse.y;
		pos.a = 180 - MathUtils.toDegrees(angle);

		pos.hit = this.detectHit(mouse, e);

		this.trigger("poke_update", pos);

	}

	clear() {
		this.ctx.clearRect(0, 0, this.rect.width, this.rect.height);
		this.debug();
	}

	/**
	 * Detect a hit and return some info if one is found
	 *
	 * @param mouse
	 * @param e
	 * @returns {Object} - some information about the direction of the hit and hit amount
	 */
	detectHit(mouse, e) {
		mouse.radius = 1;

		var dx = this.target.x - mouse.x;
		var dy = this.target.y - mouse.y;
		var distance = Math.sqrt(dx * dx + dy * dy);
		let info = {};

		// detect collision
		if (distance < this.target.radius + mouse.radius) {
			if(e.additionalEvent) {
				info.panDirection = e.additionalEvent;
				info.e = e;
			}
			info.hitAmount = MathUtils.norm(distance, 0, this.target.radius);
			this.target.collision = true;
		} else {
			info = null;
			this.target.collision = false;
		}

		return info;
	}

}