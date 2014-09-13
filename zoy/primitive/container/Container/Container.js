
goog.provide('zoy.primitive.container.Container');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('zoy.primitive.container.Interface');
goog.require('zoy.primitive.container.common');
goog.require('zoy.tool');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 * @implements {zoy.primitive.container.Interface}
 */
zoy.primitive.container.Container = function(data, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.data = data;

  this.childElementsRef_ = goog.array.map(data.children, goog.dom.getElement);
  goog.array.forEach(this.childElementsRef_, function(el, i) {
    var child = zoy.tool.generate(el);
    this.addChildAt(child, i);
  }, this);

};
goog.inherits(zoy.primitive.container.Container, goog.ui.Component);


/**
 * @private
 * @type {Array.<Element>}
 */
zoy.primitive.container.Container.prototype.childElementsRef_;


zoy.primitive.container.Container.prototype.broadcast = zoy.primitive.container.common.broadcast;


/** @override */
zoy.primitive.container.Container.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  this.forEachChild(function(child, i) {
    child.decorate(this.childElementsRef_[i]);
  }, this);
};


zoy.primitive.container.Container.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  zoy.primitive.container.common.asBroadcaster(this, this.getHandler());
};

