
goog.provide('app.RootContainer');

goog.require('g.container.BasicContainer');



/**
 * @constructor
 * @extends {g.container.BasicContainer}
 */
app.RootContainer = function(data, opt_domHelper) {
  goog.base(this, data, opt_domHelper);
};
goog.inherits(app.RootContainer, g.container.BasicContainer);

app.RootContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

