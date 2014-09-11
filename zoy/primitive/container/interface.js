
goog.provide('zoy.primitive.container.Interface');

goog.require('zoy.BaseInterface');

/**
 * @interface
 */
zoy.primitive.container.Interface = function() {};

/**
 * @this {goog.ui.Component}
 * @param {goog.events.EventType} type
 * @param {ObjectInterface.ComponentData} data
 */
zoy.primitive.container.Interface.prototype.broadcast = function(type, data) {};

