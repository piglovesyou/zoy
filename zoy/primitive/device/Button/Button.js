
goog.provide('zoy.primitive.device.Button');

goog.require('zoy.primitive.device.Interface');
goog.require('goog.ui.Button');

/**
 * @constructor
 * @extends {goog.ui.Button}
 * @implements {zoy.primitive.device.Interface}
 */
zoy.primitive.device.Button = function(data) {
  goog.base(this, data['title']);

  this.data = data;

  this.channels = {};
};
goog.inherits(zoy.primitive.device.Button, goog.ui.Button);
