
goog.provide('zoy.primitive.device.MenuButton');

goog.require('goog.ui.MenuButton');
goog.require('zoy.primitive.device.Interface');
goog.require('zoy.primitive.ui.MenuRenderer');
goog.require('zoy.primitive.ui.MenuItemRenderer');

/**
 * @constructor
 * @extends {goog.ui.MenuButton}
 * @implements {zoy.primitive.device.Interface}
 */
zoy.primitive.device.MenuButton = function(data) {

  var menu = new goog.ui.Menu(undefined, zoy.primitive.ui.MenuRenderer.getInstance());
  if (data.menuItems) {
    goog.array.forEach(data.menuItems, function(item) {
      var i;
      if (item.id == '---') {
        i = new goog.ui.MenuSeparator();
      } else if (item.id && item.label) {
        i = new goog.ui.MenuItem(item.label, zoy.primitive.ui.MenuItemRenderer.getInstance());
        i.setId(item.id);
      }
      if (i) menu.addItem(i);
    });
  }

  goog.base(this, data['title'], menu);

  this.data = data;

  this.channels = {};
};
goog.inherits(zoy.primitive.device.MenuButton, goog.ui.MenuButton);
