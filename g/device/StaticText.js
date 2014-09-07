
goog.provide('g.device.StaticText');

goog.require('g.device.Interface');
goog.require('goog.ui.Button');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {g.device.Interface}
 */
g.device.StaticText = function(data) {
  goog.base(this);

  this.data = data;

  this.channels = {};
};
goog.inherits(g.device.StaticText, goog.ui.Component);

