'use strict';

class Main {

	static initialize() {

		// bind

		// set
		this.main = document.querySelector('main');
		this.canvas = this.main.querySelector('.canvas');

		// do

		let canvasController = new CanvasController(this.main, this.canvas);
		new CatPawMover(this.main, canvasController);


	}
}
