
goog.provide('g.device.Interface');

goog.require('g.BaseInterface');

/**
 * @interface
 * @extends {g.BaseInterface}
 */
g.device.Interface = function() {};

/**
 * @type {Object.<goog.events.EventType, function(this:goog.ui.Component, Object)>}
 */
g.device.Interface.prototype.channels;

