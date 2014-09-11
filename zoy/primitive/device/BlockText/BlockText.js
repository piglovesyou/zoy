
goog.provide('zoy.primitive.device.BlockText');

goog.require('zoy.primitive.device.Interface');
goog.require('goog.ui.Button');

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

