
goog.provide('g.container.BasicContainer');

goog.require('goog.ui.Component');
goog.require('g.Container');
goog.require('g.container.common');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 * @implements {g.Container}
 */
g.container.BasicContainer = function(data, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.data = data;
};
goog.inherits(g.container.BasicContainer, goog.ui.Component);

g.container.BasicContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  g.container.common.asBroadcaster(this, this.getHandler());
};

