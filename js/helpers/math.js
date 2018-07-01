/**
 * @copyright 2018 Apple Inc. All rights reserved.
 * @author michael_newell@apple.com
 */

'use strict';

class Math2 {
	static toDegrees (angle) {
		return angle * (180 / Math.PI);
	}

	static toRadians (angle) {
		return angle * (Math.PI / 180);
	}
}
