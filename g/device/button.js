
goog.provide('g.device.Button');

goog.require('goog.ui.Button');
goog.require('g.Device');

/**
 * @constructor
 * @extends {goog.ui.Button}
 * @implements {g.Device}
 */
g.device.Button = function(data) {
  goog.base(this, data['title']);

  this.data = data;

  this.channels = {};
};
goog.inherits(g.device.Button, goog.ui.Button);
