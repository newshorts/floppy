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

		// do
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

		this.gesture.on('panmove', this.pokeStick);

	}

	debug() {
		console.log(this.rect);
		this.ctx.fillStyle="#FF0000";
		this.ctx.fillRect(0-5, 0-5, 10, 10);
		this.ctx.fillRect(this.rect.width-5,this.rect.height-5,10,10);
		this.ctx.fillRect(0-5,this.rect.height-5,10,10);
		this.ctx.fillRect(this.rect.width-5,0-5,10,10);
		this.ctx.fillStyle="#0000FF";
		this.ctx.fillRect(this.rect.width * 0.5 - 5,this.rect.height * 0.5-5,10,10);

		this.ctx.moveTo(0,0);
		this.ctx.lineTo(this.rect.width,this.rect.height);
		this.ctx.moveTo(0,this.rect.height);
		this.ctx.lineTo(this.rect.width,0);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.arc(this.rect.width * 0.5, this.rect.height * 0.5,this.rect.height * 0.2,0,2*Math.PI);
		this.ctx.stroke();
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
		pos.a = 180 - Math2.toDegrees(angle);

		this.trigger("poke_update", pos);

	}

	clear() {
		this.ctx.clearRect(0, 0, this.rect.width, this.rect.height);
		this.debug();
	}


}