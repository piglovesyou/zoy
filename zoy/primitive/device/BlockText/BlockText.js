
goog.provide('zoy.primitive.device.BlockText');

goog.require('goog.ui.Component');
goog.require('zoy.primitive.device.Interface');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {zoy.primitive.device.Interface}
 */
zoy.primitive.device.BlockText = function(data) {
  goog.base(this);

  this.data = data;

  this.channels = {};
};
goog.inherits(zoy.primitive.device.BlockText, goog.ui.Component);

