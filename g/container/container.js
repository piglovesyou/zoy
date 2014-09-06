
goog.provide('g.Container');

goog.require('g.Base');

/**
 * @interface
 */
g.Container = function() {};

/**
 * @this {goog.ui.Component}
 * @param {goog.events.EventType} type
 * @param {ObjectInterface.ComponentData} data
 */
g.Container.prototype.broadcast = function(type, data) {};

