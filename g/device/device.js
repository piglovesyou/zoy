
goog.provide('g.Device');

goog.require('g.Base');

/**
 * @interface
 * @extends {g.Base}
 */
g.Device = function() {};

/**
 * @type {Object.<goog.events.EventType, function(this:goog.ui.Component, Object)>}
 */
g.Device.prototype.channels;

