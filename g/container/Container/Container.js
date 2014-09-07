
goog.provide('g.container.Container');

goog.require('g.container.Interface');
goog.require('g.container.common');
goog.require('goog.ui.Component');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 * @implements {g.container.Interface}
 */
g.container.Container = function(data, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.data = data;

  this.childElementsRef_ = goog.array.map(data.children, goog.dom.getElement);
  goog.array.forEach(this.childElementsRef_, function(el, i) {
    var child = g.tool.generate(el);
    this.addChildAt(child, i);
  }, this);

};
goog.inherits(g.container.Container, goog.ui.Component);


/**
 * @private
 * @type {Array.<Element>}
 */
g.container.Container.prototype.childElementsRef_;


g.container.Container.prototype.broadcast = g.container.common.broadcast;


/** @override */
g.container.Container.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  this.forEachChild(function(child, i) {
    child.decorate(this.childElementsRef_[i]);
  }, this);
};


g.container.Container.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  g.container.common.asBroadcaster(this, this.getHandler());
};

