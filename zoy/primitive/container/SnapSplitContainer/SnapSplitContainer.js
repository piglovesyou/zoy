


goog.provide('zoy.primitive.container.SnapSplitContainer');
goog.provide('zoy.primitive.container.SnapSplitContainer.HandleState');

goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('zoy.primitive.container.SplitContainer');



/**
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper .
 * @extends {zoy.primitive.container.SplitContainer}
 */
zoy.primitive.container.SnapSplitContainer = function(data, opt_domHelper) {

  goog.base(this, data, opt_domHelper);

  /**
   * Represent handle state.
   * @type {zoy.primitive.container.SnapSplitContainer.HandleState}
   */
  this.snapTo_ = zoy.primitive.container.SnapSplitContainer.HandleState.NONE

};
goog.inherits(zoy.primitive.container.SnapSplitContainer, zoy.primitive.container.SplitContainer);

/**
 * @enum
 */
zoy.primitive.container.SnapSplitContainer.HandleState = {
  NONE: 1,
  TOP_LEFT: 2,
  BOTTOM_RIGHT: 4
};

/** @inheritDoc */
zoy.primitive.container.SnapSplitContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var eh = this.getHandler();
  eh.listen(this.getElementByClass('goog-splitpane-handle'),
      goog.events.EventType.CLICK, this.handleSplitHandleClick);
};

/**
 * @protected
 */
zoy.primitive.container.SnapSplitContainer.prototype.handleSplitHandleClick = function(e) {
  var that = this;
  var et = /** @type {Element} */(e.target);
  var size;
  if (goog.dom.contains(this.getElementByClass('zoy-snapsplitcontainer__handle-btn-topleft'), et)) {
    if (this.snapTo_ & zoy.primitive.container.SnapSplitContainer.HandleState.BOTTOM_RIGHT) {
      toMiddle();
    } else if (this.snapTo_ & zoy.primitive.container.SnapSplitContainer.HandleState.NONE) {
      this.snapTo_ = zoy.primitive.container.SnapSplitContainer.HandleState.TOP_LEFT;
      size = 0;
    }
  } else if (goog.dom.contains(this.getElementByClass('zoy-snapsplitcontainer__handle-btn-bottomright'), et)) {
    if (this.snapTo_ & zoy.primitive.container.SnapSplitContainer.HandleState.TOP_LEFT) {
      toMiddle();
    } else if (this.snapTo_ & zoy.primitive.container.SnapSplitContainer.HandleState.NONE) {
      this.snapTo_ = zoy.primitive.container.SnapSplitContainer.HandleState.BOTTOM_RIGHT;
      size = this.getMaxSize_();
    }
  }
  if (goog.isNumber(size)) {
    this.setEnabled(!this.isSnapped_());
    this.setFirstComponentSize(size);
    e.stopPropagation();
  }
  function toMiddle() {
    that.snapTo_ = zoy.primitive.container.SnapSplitContainer.HandleState.NONE;
    size = that.getMaxSize_() / 2;
  }
};

/**
 * XXX: Refactor
 */
zoy.primitive.container.SnapSplitContainer.prototype.toMiddle = function() {
  this.snapTo_ = zoy.primitive.container.SnapSplitContainer.HandleState.NONE;
  var size = this.getMaxSize_() / 2;
  this.setEnabled(!this.isSnapped_());
  this.setFirstComponentSize(size);
};

zoy.primitive.container.SnapSplitContainer.prototype.isSnapped_ = function() {
  return this.snapTo_ & zoy.primitive.container.SnapSplitContainer.HandleState.BOTTOM_RIGHT ||
         this.snapTo_ & zoy.primitive.container.SnapSplitContainer.HandleState.TOP_LEFT;
};

/**
 * @param {boolean} enable .
 * @suppress {visibility}
 */
zoy.primitive.container.SnapSplitContainer.prototype.setEnabled = function(enable) {
  this.splitDragger_.setEnabled(enable);
};

