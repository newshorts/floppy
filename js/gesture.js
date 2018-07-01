/**
 * @copyright 2018 Apple Inc. All rights reserved.
 * @author michael_newell@apple.com
 */

'use strict';

class GestureRecognizer {

	constructor(container, videos) {

		// bind

		// set
		this.container = container;
		this.videos = videos;
		this.gesture = new Hammer(this.container);
		this.gesture.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		// do
		this.gesture.on("panleft panright panup pandown tap press", (e) => {

			for(let key in this.videos) {
				this.videos[key].stop();
			}

			switch(e.type) {
				case "panright":
					this.videos.right.play();
					break;
				case "panleft":
					this.videos.left.play();
					break;
				default:
					this.videos.right.play();
					break;
			}

		});

	}

}