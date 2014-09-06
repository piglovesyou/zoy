
goog.provide('g.device.Button');

goog.require('g.device.Interface');
goog.require('goog.ui.Button');

/**
 * @constructor
 * @extends {goog.ui.Button}
 * @implements {g.device.Interface}
 */
g.device.Button = function(data) {
  goog.base(this, data['title']);

  this.data = data;

  this.channels = {};
};
goog.inherits(g.device.Button, goog.ui.Button);
