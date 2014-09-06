
goog.provide('g.container.BasicContainer');

goog.require('g.Container');
goog.require('g.container.common');
goog.require('goog.ui.Component');



goog.scope(function() {



/**
 * @type {Array.<Element>}
 */
var childElementsRef;

/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.Component}
 * @implements {g.Container}
 */
g.container.BasicContainer = function(data, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.data = data;

  childElementsRef = goog.array.map(data.children, goog.dom.getElement);
  goog.array.forEach(childElementsRef, function(el, i) {
    var child = g.tool.generate(el);
    this.addChildAt(child, i);
  }, this);

};
goog.inherits(g.container.BasicContainer, goog.ui.Component);

/** @inheritDoc */
g.container.BasicContainer.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  this.forEachChild(function(child, i) {
    child.decorate(childElementsRef[i]);
  }, this);
};

/** @inheritDoc */
g.container.BasicContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  g.container.common.asBroadcaster(this, this.getHandler());
};


}); // goog.scope
