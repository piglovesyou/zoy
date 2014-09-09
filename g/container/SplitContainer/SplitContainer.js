


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

  goog.base(this, childrenInfo[0].component, childrenInfo[1].component,
      // goog.ui.SplitPane.Orientation.VERTICAL, opt_domHelper);
      goog.ui.SplitPane.Orientation.HORIZONTAL, opt_domHelper);

  // We have to decorate AFTER superClass's constructor
  goog.array.forEach(childrenInfo, function(childInfo) {
    childInfo.component.decorate(childInfo.element);
  });

  /**
   * Represent handle state.
   * @type {g.container.SplitContainer.HandleState}
   */
  this.snapTo_ = g.container.SplitContainer.HandleState.BOTTOM_RIGHT;
  this.setHandleSize(g.container.SplitContainer.HANDLE_SIZE);

};
goog.inherits(g.container.SplitContainer, goog.ui.SplitPane);

g.container.SplitContainer.HANDLE_SIZE = 10;

/**
 * @enum
 */
g.container.SplitContainer.HandleState = {
  NONE: 1,
  TOP_LEFT: 2,
  BOTTOM_RIGHT: 4
};

/** @inheritDoc */
g.container.SplitContainer.prototype.enterDocument = function() {
  var eh = this.getHandler();
  this.initializeHandlePosition_();
  goog.base(this, 'enterDocument');
  this.setEnabled(!this.isSnapped_());
  eh.listen(this.getElementByClass('goog-splitpane-handle'),
      goog.events.EventType.CLICK, this.handleSplitHandleClick_);
};

g.container.SplitContainer.prototype.handleSplitHandleClick_ = function(e) {
  var that = this;
  var et = /** @type {Element} */(e.target);
  var size;
  if (goog.dom.contains(this.getElementByClass('goog-splitpane-handle-btn-topleft'), et)) {
    if (this.snapTo_ & g.container.SplitContainer.HandleState.BOTTOM_RIGHT) {
      toMiddle();
    } else if (this.snapTo_ & g.container.SplitContainer.HandleState.NONE) {
      this.snapTo_ = g.container.SplitContainer.HandleState.TOP_LEFT;
      size = 0;
    }
  } else if (goog.dom.contains(this.getElementByClass('goog-splitpane-handle-btn-bottomright'), et)) {
    if (this.snapTo_ & g.container.SplitContainer.HandleState.TOP_LEFT) {
      toMiddle();
    } else if (this.snapTo_ & g.container.SplitContainer.HandleState.NONE) {
      this.snapTo_ = g.container.SplitContainer.HandleState.BOTTOM_RIGHT;
      size = this.getMaxSize_();
    }
  }
  if (goog.isNumber(size)) {
    this.setEnabled(!this.isSnapped_());
    this.setFirstComponentSize(size);
    e.stopPropagation();
  }
  function toMiddle() {
    that.snapTo_ = g.container.SplitContainer.HandleState.NONE;
    size = that.getMaxSize_() / 2;
  }
};

/**
 * XXX: Refactor
 */
g.container.SplitContainer.prototype.toMiddle = function() {
  this.snapTo_ = g.container.SplitContainer.HandleState.NONE;
  var size = this.getMaxSize_() / 2;
  this.setEnabled(!this.isSnapped_());
  this.setFirstComponentSize(size);
};

g.container.SplitContainer.prototype.isSnapped_ = function() {
  return this.snapTo_ & g.container.SplitContainer.HandleState.BOTTOM_RIGHT ||
         this.snapTo_ & g.container.SplitContainer.HandleState.TOP_LEFT;
};

g.container.SplitContainer.prototype.initializeHandlePosition_ = function() {
  this.setInitialSize(this.getMaxSize_());
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

