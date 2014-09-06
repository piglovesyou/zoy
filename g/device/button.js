
goog.provide('g.device.Button');

goog.require('goog.ui.Button');

/**
 * @constructor
 * @extends {goog.ui.Button}
 * @implements {g.Device}
 */
g.device.Button = function(data) {
  goog.base(this, data['title']);

  this.data = data;
};
goog.inherits(g.device.Button, goog.ui.Button);
