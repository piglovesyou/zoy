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

  this.data = data;

  window.t = this;
};
goog.inherits(zoy.primitive.device.Toolbar, goog.ui.Toolbar);
