


goog.provide('g.container.SplitContainer');
goog.require('goog.events.EventType');
goog.require('goog.ui.SplitPane');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.SplitPane}
 * @implements {g.container.Interface}
 */
g.container.SplitContainer = function(data, opt_domHelper) {

  /**
   * @type {Object}
   */
  this.data = data;

  /**
   * @type { Array.<{
   *   component: goog.ui.Component,
   *   element: Element
   * }> }
   */
  var childrenInfo = goog.array.map(this.data.children, function(childId) {
    var el = goog.dom.getElement(childId);
    return {
      component: g.tool.generate(/** @type {!Element} */(el)),
      element: el
    };
  });

  goog.base(this, childrenInfo[0].component,
      childrenInfo[1].component, undefined, opt_domHelper);

  // We have to decorate AFTER superClass's constructor
  goog.array.forEach(childrenInfo, function(childInfo) {
    childInfo.component.decorate(childInfo.element);
  });

  this.setHandleSize(g.container.SplitContainer.HANDLE_SIZE);

};
goog.inherits(g.container.SplitContainer, goog.ui.SplitPane);

g.container.SplitContainer.HANDLE_SIZE = 10;

/** @inheritDoc */
g.container.SplitContainer.prototype.enterDocument = function() {
  this.initializeHandlePosition();
  goog.base(this, 'enterDocument');
};

/** @protected */
g.container.SplitContainer.prototype.initializeHandlePosition = function() {
  this.setInitialSize(this.getMaxSize_() / 2);
};

/**
 * @param {goog.math.Size=} opt_outerSize
 * @return {number} Max size of a firstComponent .
 */
g.container.SplitContainer.prototype.getMaxSize_ = function(opt_outerSize) {
  var outerSize = goog.isNumber(opt_outerSize) ?
      opt_outerSize : goog.style.getContentBoxSize(this.getElement());
  return (this.isVertical() ? outerSize.height : outerSize.width) -
      g.container.SplitContainer.HANDLE_SIZE;
};

/**
 * @param {boolean} enable .
 * @suppress {visibility}
 */
g.container.SplitContainer.prototype.setEnabled = function(enable) {
  this.splitDragger_.setEnabled(enable);
};

