
goog.provide('g.Container');

goog.require('g.Base');

/**
 * @interface
 */
g.Container = function() {};

/**
 * @param {goog.events.EventType} type
 * @param {Object} data
 */
g.Container.prototype.broadcast = function(data) {};

