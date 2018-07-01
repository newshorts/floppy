/**
 * @copyright 2018 Apple Inc. All rights reserved.
 * @author michael_newell@apple.com
 */

'use strict';

class Video {

	constructor(elem) {
		// bind
		this.cleanup = this.cleanup.bind(this);

		// set
		this.elem = elem;

		// do
		this.elem.addEventListener('ended', this.cleanup);
	}

	stop() {
		this.elem.classList.remove("active");
		this.elem.pause();
		this.elem.currentTime = 0;
	}

	play() {
		// bring to front
		this.elem.classList.add("active");
		this.elem.play();
	}

	cleanup() {
		this.elem.pause();
		this.elem.classList.remove("active");
		this.elem.currentTime = 0;
	}

}