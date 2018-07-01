/**
 * @copyright 2018 Apple Inc. All rights reserved.
 * @author michael_newell@apple.com
 */

'use strict';

class Main {

	static initialize() {

		// bind

		// set
		this.main = document.querySelector('main');
		this.container = this.main.querySelector('.video-container');
		this.left = this.container.querySelector('.left');
		this.right = this.container.querySelector('.right');
		this.leftVideo = new Video(this.left);
		this.rightVideo = new Video(this.right);



		// do
		let videos = {
			left: this.leftVideo,
			right: this.rightVideo
		};
		new GestureRecognizer(this.main, videos);

	}
}
