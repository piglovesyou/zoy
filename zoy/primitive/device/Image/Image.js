
goog.provide('zoy.primitive.device.Image');

goog.require('zoy.primitive.device.Interface');
goog.require('goog.ui.Button');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {zoy.primitive.device.Interface}
 */
zoy.primitive.device.Image = function(data) {
  goog.base(this);

  this.data = data;

  this.channels = {};
};
goog.inherits(zoy.primitive.device.Image, goog.ui.Component);

