
goog.provide('app.RootContainer');

goog.require('g.container.Container');



/**
 * @constructor
 * @extends {g.container.Container}
 */
app.RootContainer = function(data, opt_domHelper) {
  goog.base(this, data, opt_domHelper);
};
goog.inherits(app.RootContainer, g.container.Container);

app.RootContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

