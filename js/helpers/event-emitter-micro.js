'use strict';


/**
 * A performance focused minimal event emitter.
 * @constructor
 * @class
 */
function EventEmitterMicro() {
	this._events = {};
}

/** @lends EventEmitterMicro.prototype */
var proto = EventEmitterMicro.prototype;

/**
 * Adds an event listener, which will fire `callback` when `eventName` is triggered
 * @param {String} eventName
 * @param {Function} callback
 */
proto.on = function(eventName, callback) {
	this._events[eventName] = this._events[eventName] || [];
	this._events[eventName].unshift(callback);
};

/**
 * Same as `on` however event will be removed after first trigger
 * @param {String} eventName
 * @param {Function} callback
 */
proto.once = function(eventName, callback){
	var that = this;
	function fn(data){
		that.off(eventName, fn);

		if(data !== undefined) callback(data);
		else callback();
	}

	this.on(eventName, fn);
};

/**
 * Removes an event listener, listening for `eventName` with `callback
 * @param {String} eventName
 * @param {Function} callback
 */
proto.off = function(eventName, callback) {
	if (!this.has(eventName)) return;

	if (arguments.length === 1) {
		// nullify first, then remove
		this._events[eventName] = null;
		delete this._events[eventName];
		return;
	}

	var index = this._events[eventName].indexOf(callback);
	if( index === -1 ) return;

	this._events[eventName].splice(index, 1);
};

/**
 * Dispatches an event with the name `eventName`, optionally passing in additional data
 * @param {String} eventName
 * @param {*=} data	Optional data that will be passed to the callback -
 */
proto.trigger = function(eventName, data) {
	if (!this.has(eventName)) return;

	for(var i = this._events[eventName].length -1; i >= 0 ; i--) {
		// Don't pass `undefined` to functions which don't expect a value
		if(data !== undefined) this._events[eventName][i](data);
		else this._events[eventName][i]();
	}
};

/**
 * Returns true if there are any listeners for `eventName`
 * @param {String} eventName
 */
proto.has = function(eventName) {
	if (eventName in this._events === false || this._events[eventName].length === 0) {
		return false;
	}

	return true;
};

/**
 * Clears this EventEmitterMicro instance for GC
 * It is no longer usable once this is called
 */
proto.destroy = function(){
	for(var eventName in this._events) {
		this._events[eventName] = null;
	}
	this._events = null;
};