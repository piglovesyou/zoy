


goog.provide('g.container.SnapSplitContainer');
goog.require('goog.events.EventType');
goog.require('goog.ui.SplitPane');
goog.require('g.container.SplitContainer');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {g.container.SplitContainer}
 * @implements {g.container.Interface}
 */
g.container.SnapSplitContainer = function(data, opt_domHelper) {

  goog.base(this, data, opt_domHelper);

  /**
   * Represent handle state.
   * @type {g.container.SnapSplitContainer.HandleState}
   */
  this.snapTo_ = g.container.SnapSplitContainer.HandleState.NONE

};
goog.inherits(g.container.SnapSplitContainer, g.container.SplitContainer);

/**
 * @enum
 */
g.container.SnapSplitContainer.HandleState = {
  NONE: 1,
  TOP_LEFT: 2,
  BOTTOM_RIGHT: 4
};

/** @inheritDoc */
g.container.SnapSplitContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var eh = this.getHandler();
  eh.listen(this.getElementByClass('goog-splitpane-handle'),
      goog.events.EventType.CLICK, this.handleSplitHandleClick);
};

/**
 * @protected
 */
g.container.SnapSplitContainer.prototype.handleSplitHandleClick = function(e) {
  var that = this;
  var et = /** @type {Element} */(e.target);
  var size;
  if (goog.dom.contains(this.getElementByClass('goog-splitpane-handle-btn-topleft'), et)) {
    if (this.snapTo_ & g.container.SnapSplitContainer.HandleState.BOTTOM_RIGHT) {
      toMiddle();
    } else if (this.snapTo_ & g.container.SnapSplitContainer.HandleState.NONE) {
      this.snapTo_ = g.container.SnapSplitContainer.HandleState.TOP_LEFT;
      size = 0;
    }
  } else if (goog.dom.contains(this.getElementByClass('goog-splitpane-handle-btn-bottomright'), et)) {
    if (this.snapTo_ & g.container.SnapSplitContainer.HandleState.TOP_LEFT) {
      toMiddle();
    } else if (this.snapTo_ & g.container.SnapSplitContainer.HandleState.NONE) {
      this.snapTo_ = g.container.SnapSplitContainer.HandleState.BOTTOM_RIGHT;
      size = this.getMaxSize_();
    }
  }
  if (goog.isNumber(size)) {
    this.setEnabled(!this.isSnapped_());
    this.setFirstComponentSize(size);
    e.stopPropagation();
  }
  function toMiddle() {
    that.snapTo_ = g.container.SnapSplitContainer.HandleState.NONE;
    size = that.getMaxSize_() / 2;
  }
};

/**
 * XXX: Refactor
 */
g.container.SnapSplitContainer.prototype.toMiddle = function() {
  this.snapTo_ = g.container.SnapSplitContainer.HandleState.NONE;
  var size = this.getMaxSize_() / 2;
  this.setEnabled(!this.isSnapped_());
  this.setFirstComponentSize(size);
};

g.container.SnapSplitContainer.prototype.isSnapped_ = function() {
  return this.snapTo_ & g.container.SnapSplitContainer.HandleState.BOTTOM_RIGHT ||
         this.snapTo_ & g.container.SnapSplitContainer.HandleState.TOP_LEFT;
};

/**
 * @param {boolean} enable .
 * @suppress {visibility}
 */
g.container.SnapSplitContainer.prototype.setEnabled = function(enable) {
  this.splitDragger_.setEnabled(enable);
};

