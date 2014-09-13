
goog.provide('zoy.primitive.device.StaticText');

goog.require('goog.ui.Component');
goog.require('zoy.primitive.device.Interface');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {zoy.primitive.device.Interface}
 */
zoy.primitive.device.StaticText = function(data) {
  goog.base(this);

  this.data = data;

  this.channels = {};
};
goog.inherits(zoy.primitive.device.StaticText, goog.ui.Component);

