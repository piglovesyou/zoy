
goog.provide('zoy.primitive.device.Image');

goog.require('goog.ui.Component');
goog.require('zoy.primitive.device.Interface');

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

