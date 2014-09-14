
goog.provide('zoy.primitive.device.TextInput');

goog.require('goog.ui.Component');
goog.require('zoy.primitive.device.Interface');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {zoy.primitive.device.Interface}
 */
zoy.primitive.device.TextInput = function(data) {
  goog.base(this);

  this.data = data;

  this.channels = {};
};
goog.inherits(zoy.primitive.device.TextInput, goog.ui.Component);

