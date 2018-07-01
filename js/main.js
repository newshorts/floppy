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

		// do
		new GestureRecognizer(this.main);
		new CatPawMover(this.main);

	}
}
