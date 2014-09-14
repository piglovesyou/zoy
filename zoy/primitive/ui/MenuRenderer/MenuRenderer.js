
goog.provide('zoy.primitive.ui.MenuRenderer');

goog.require('goog.ui.MenuRenderer');



/**
 * @constructor
 * @extends {goog.ui.MenuRenderer}
 * @private
 */
zoy.primitive.ui.MenuRenderer = function() {
  goog.base(this);
};
goog.inherits(zoy.primitive.ui.MenuRenderer, goog.ui.MenuRenderer);
goog.addSingletonGetter(zoy.primitive.ui.MenuRenderer);

/** @override */
zoy.primitive.ui.MenuRenderer.prototype.getCssClass = function() {
  return 'zoy-menu';
};
