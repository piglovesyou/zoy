
goog.provide('zoy.primitive.ui.MenuItemRenderer');

goog.require('zoy.primitive.device.Interface');
goog.require('goog.ui.Menu');



/**
 * @constructor
 * @extends {goog.ui.MenuRenderer}
 * @private
 */
zoy.primitive.ui.MenuItemRenderer = function() {
  goog.base(this);
};
goog.inherits(zoy.primitive.ui.MenuItemRenderer, goog.ui.MenuRenderer);
goog.addSingletonGetter(zoy.primitive.ui.MenuItemRenderer);

/** @override */
zoy.primitive.ui.MenuItemRenderer.prototype.getCssClass = function() {
  return 'pure-menu pure-menu-open';
};
