
goog.provide('g.device.Image');

goog.require('g.device.Interface');
goog.require('goog.ui.Button');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {g.device.Interface}
 */
g.device.Image = function(data) {
  goog.base(this);

  this.data = data;

  this.channels = {};
};
goog.inherits(g.device.Image, goog.ui.Component);

