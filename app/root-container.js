
goog.provide('app.RootContainer');

goog.require('g.container.BasicContainer');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {g.container.BasicContainer}
 * @implements {g.Container}
 */
app.RootContainer = function(data, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.data = data;
};
goog.inherits(app.RootContainer, g.container.BasicContainer);

/** @inheritDoc */
app.RootContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

