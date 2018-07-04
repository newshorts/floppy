/**
 * @copyright 2017 Apple Inc. All rights reserved.
 * @author michael_newell@apple.com
 */

'use strict';

/**
 * @copyright 2015 Apple Inc. All rights reserved.
 * @author supermario@apple.com
 */
'use strict';
/**
 * Math helper functions
 * @type {{lerp: Function, map: Function, mapClamp: Function, norm: Function, clamp: Function, randFloat: Function, randInt: Function}}
 */

var MathUtils = {
	/**
	 * Linear interpolation between two points
	 *
	 * NOTE: lerp is the same as "unfitting/reversing" a normalized number
	 *
	 * @param {number} ratio
	 * @param {number} start
	 * @param {number} end
	 * @returns {number}
	 */
	lerp: function ( ratio, start, end ) {
		return start + ( end - start ) * ratio;
	},
	/**
	 * Maps 2 numbers, to two other numbers using val as a ratio
	 * @param {number} val
	 * @param {number} min1
	 * @param {number} max1
	 * @param {number} min2
	 * @param {number} max2
	 * @returns {number}
	 */
	map: function ( val, min1, max1, min2, max2 ) {
		return this.lerp(this.norm( val, min1, max1 ), min2, max2 );
	},
	/**
	 * Same as map, but clamp's the numbers within the range
	 * @param {number} val
	 * @param {number} min1
	 * @param {number} max1
	 * @param {number} min2
	 * @param {number} max2
	 * @returns {number}
	 */
	mapClamp: function ( val, min1, max1, min2, max2 ) {
		var val = this.lerp(this.norm( val, min1, max1 ), min2, max2 );
		return Math.max(min2, Math.min(max2, val));
	},

	/**
	 * Normalized a set of three numbers
	 * @param {number} val
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 */
	norm: function ( val, min, max ) {
		return (val - min) / (max - min);
	},

	/**
	 * Clamps a number between 2 values
	 * @param {number} val
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 */
	clamp: function(val, min, max) {
		return Math.max(min, Math.min(max, val));
	},

	/**
	 * Returns a float between min-max inclusive
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 */
	randFloat: function(min,max) {
		return (Math.random()*(max-min))+min;
	},

	/**
	 * Returns an int between min-max inclusive
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 */
	randInt: function(min,max) {
		return Math.floor( (Math.random()*(max-min))+min );
	},

	toDegrees: function(angle) {
		return angle * (180 / Math.PI);
	},

	toRadians: function(angle) {
		return angle * (Math.PI / 180);
	}
};
