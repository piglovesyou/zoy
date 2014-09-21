goog.provide('zoy.primitive.device.Toolbar');

goog.require('zoy.BaseInterface');
goog.require('goog.ui.Toolbar');



    goog.require('goog.ui.Button');
    goog.require('goog.ui.ButtonSide');
    goog.require('goog.ui.Component.EventType');
    goog.require('goog.ui.Component.State');
    goog.require('goog.ui.Menu');
    goog.require('goog.ui.MenuItem');
    goog.require('goog.ui.Option');
    goog.require('goog.ui.SelectionModel');
    goog.require('goog.ui.Separator');
    goog.require('goog.ui.Toolbar');
    goog.require('goog.ui.ToolbarRenderer');
    goog.require('goog.ui.ToolbarButton');
    goog.require('goog.ui.ToolbarMenuButton');
    goog.require('goog.ui.ToolbarSelect');
    goog.require('goog.ui.ToolbarSeparator');
    goog.require('goog.ui.ToolbarToggleButton');

/**
 * @constructor
 * @extends {goog.ui.Toolbar}
 * @implements {zoy.BaseInterface}
 */
zoy.primitive.device.Toolbar = function(data) {
  goog.base(this);

  this.setOrientation('horizontal');

  this.data = data;

};
goog.inherits(zoy.primitive.device.Toolbar, goog.ui.Toolbar);

/** @override */
zoy.primitive.device.Toolbar.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);

  // Hmm who wants?
  // // Menu positioning
  // goog.array.forEach(this.data.buttonItems, function (b) {
  //   if ((b.type == 'menu' || b.type == 'select') && goog.isNumber(b.menuPosition)/* TODO: map by string? */) {
  //     goog.asserts.assert(goog.object.containsValue(goog.positioning.Corner, b.menuPosition));
  //     var child = this.getChild(b.id);
  //     child.setMenuPosition(new goog.positioning.MenuAnchoredPosition(
  //         child.getElement(), /** @type {goog.positioning.Corner} */(b.menuPosition)));
  //   }
  // }, this);
};
