
goog.provide('zoy.primitive.iterator.list.Item');

goog.require('goog.ui.Component');




/**
 * @constructor
 * @param {Function=} opt_renderer .
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 */
zoy.primitive.iterator.list.Item = function(opt_renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);

  /**
   * @private
   */
  this.renderer_ = opt_renderer || goog.nullFunction;
};
goog.inherits(zoy.primitive.iterator.list.Item, goog.ui.Component);


/** @inheritDoc */
zoy.primitive.iterator.list.Item.prototype.createDom = function() {
  var dh = this.getDomHelper();
  this.setElementInternal(dh.createDom('div', 'goog-list-item'));
};


/**
 * @param {goog.ds.DataNode} data .
 */
zoy.primitive.iterator.list.Item.prototype.renderContent = function(data) {
  this.getElement().innerHTML = this.renderer_(data);
};
