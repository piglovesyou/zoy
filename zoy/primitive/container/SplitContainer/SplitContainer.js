
goog.provide('zoy.primitive.container.SplitContainer');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.events.EventType');
goog.require('goog.ui.SplitPane');
goog.require('zoy.dom.ViewportSizeMonitor');



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

  var orientation = this.data.orientation == 'vertical' ?
      goog.ui.SplitPane.Orientation.VERTICAL : goog.ui.SplitPane.Orientation.HORIZONTAL;
  goog.base(this, childrenInfo[0].component,
      childrenInfo[1].component, orientation, opt_domHelper);

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
  if (this.data.resizeOnViewportChange) {
    // can be resized
    var eh = this.getHandler();
    eh.listen(zoy.dom.ViewportSizeMonitor.getInstance(),
        zoy.dom.ViewportSizeMonitor.EventType.DELAYED_RESIZE, this.handleViewportResize_)
  }
  goog.base(this, 'enterDocument');
};

zoy.primitive.container.SplitContainer.prototype.handleViewportResize_ = function(e) {
  goog.style.setStyle(this.getElement(), {
    width: this.data.style.width || '',
    height: this.data.style.height || ''
  });
  var size = goog.style.getContentBoxSize(this.getElement())
  this.setSize(size);
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

