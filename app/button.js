
goog.provide('app.Button');

goog.require('zoy.primitive.device.Button');

/**
 * @constructor
 * @extends {zoy.primitive.device.Button}
 */
app.Button = function(data) {
  goog.base(this, data);
};
goog.inherits(app.Button, zoy.primitive.device.Button);

app.Button.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var eh = this.getHandler();
  eh.listen(this.getElement(), 'click', function(e) {
    console.log(this.data);
  });
};
