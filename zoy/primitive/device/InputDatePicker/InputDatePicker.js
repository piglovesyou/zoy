goog.provide('zoy.primitive.device.InputDatePicker');

goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.ui.InputDatePicker');
goog.require('zoy.BaseInterface');

/**
 * @constructor
 * @extends {goog.ui.InputDatePicker}
 * @implements {zoy.BaseInterface}
 */
zoy.primitive.device.InputDatePicker = function(data) {
  
  goog.asserts.assert(data.pattern);

  goog.base(this, new goog.i18n.DateTimeFormat(data.pattern),
      new goog.i18n.DateTimeParse(data.pattern));

  this.data = data;
};
goog.inherits(zoy.primitive.device.InputDatePicker, goog.ui.InputDatePicker);
