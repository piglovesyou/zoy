
goog.provide('app.Button');

goog.require('g.device.Button');

/**
 * @constructor
 * @extends {g.device.Button}
 */
app.Button = function(data) {
  goog.base(this, data);
};
goog.inherits(app.Button, g.device.Button);

app.Button.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var eh = this.getHandler();
  eh.listen(this.getElement(), 'click', function(e) {
    console.log(this.data);
  });
};
