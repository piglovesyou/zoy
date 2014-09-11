


goog.provide('zoy.primitive.container.SplitContainer');
goog.require('goog.events.EventType');
goog.require('goog.ui.SplitPane');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {goog.ui.SplitPane}
 */
zoy.primitive.container.SplitContainer = function(data, opt_domHelper) {

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
      component: zoy.tool.generate(/** @type {!Element} */(el)),
      element: el
    };
  });

  goog.base(this, childrenInfo[0].component,
      childrenInfo[1].component, goog.ui.SplitPane.Orientation.VERTICAL, opt_domHelper);

  // We have to decorate AFTER superClass's constructor
  goog.array.forEach(childrenInfo, function(childInfo) {
    childInfo.component.decorate(childInfo.element);
  });

  this.setHandleSize(zoy.primitive.container.SplitContainer.HANDLE_SIZE);

};
goog.inherits(zoy.primitive.container.SplitContainer, goog.ui.SplitPane);

zoy.primitive.container.SplitContainer.HANDLE_SIZE = 10;

/** @inheritDoc */
zoy.primitive.container.SplitContainer.prototype.enterDocument = function() {
  this.initializeHandlePosition();
  goog.base(this, 'enterDocument');
};

/** @protected */
zoy.primitive.container.SplitContainer.prototype.initializeHandlePosition = function() {
  this.setInitialSize(this.getMaxSize_() / 2);
};

/**
 * @param {goog.math.Size=} opt_outerSize
 * @return {number} Max size of a firstComponent .
 */
zoy.primitive.container.SplitContainer.prototype.getMaxSize_ = function(opt_outerSize) {
  var outerSize = goog.isNumber(opt_outerSize) ?
      opt_outerSize : goog.style.getContentBoxSize(this.getElement());
  return (this.isVertical() ? outerSize.height : outerSize.width) -
      zoy.primitive.container.SplitContainer.HANDLE_SIZE;
};

/**
 * @param {boolean} enable .
 * @suppress {visibility}
 */
zoy.primitive.container.SplitContainer.prototype.setEnabled = function(enable) {
  this.splitDragger_.setEnabled(enable);
};

