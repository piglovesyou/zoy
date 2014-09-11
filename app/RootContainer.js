
goog.provide('app.RootContainer');

goog.require('zoy.primitive.container.Container');



/**
 * @constructor
 * @extends {zoy.primitive.container.Container}
 */
app.RootContainer = function(data, opt_domHelper) {
  goog.base(this, data, opt_domHelper);
};
goog.inherits(app.RootContainer, zoy.primitive.container.Container);

app.RootContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

