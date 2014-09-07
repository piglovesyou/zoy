
goog.provide('g.device.BlockText');

goog.require('g.device.Interface');
goog.require('goog.ui.Button');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {g.device.Interface}
 */
g.device.BlockText = function(data) {
  goog.base(this);

  this.data = data;

  this.channels = {};
};
goog.inherits(g.device.BlockText, goog.ui.Component);

