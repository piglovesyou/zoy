
goog.provide('g.container.Interface');

goog.require('g.BaseInterface');

/**
 * @interface
 */
g.container.Interface = function() {};

/**
 * @this {goog.ui.Component}
 * @param {goog.events.EventType} type
 * @param {ObjectInterface.ComponentData} data
 */
g.container.Interface.prototype.broadcast = function(type, data) {};

