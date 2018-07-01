/**
 * @copyright 2018 Apple Inc. All rights reserved.
 * @author michael_newell@apple.com
 */

'use strict';

class GestureRecognizer {

	constructor(container) {

		// bind

		// set
		this.container = container;
		this.gesture = new Hammer(this.container);
		this.gesture.get('pan').set({ direction: Hammer.DIRECTION_ALL });

		// do
		this.gesture.on("panleft panright panup pandown tap press", (e) => {

			// TODO: stuff

		});

	}

}