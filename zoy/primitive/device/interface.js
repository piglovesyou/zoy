
goog.provide('zoy.primitive.device.Interface');

goog.require('zoy.BaseInterface');

/**
 * @interface
 * @extends {zoy.BaseInterface}
 */
zoy.primitive.device.Interface = function() {};

/**
 * @type {Object.<goog.events.EventType, function(this:goog.ui.Component, Object)>}
 */
zoy.primitive.device.Interface.prototype.channels;

