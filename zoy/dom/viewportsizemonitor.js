
goog.provide('zoy.dom.ViewportSizeMonitor');

goog.require('goog.Timer');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.events.EventHandler');



/**
 * @constructor
 * @extends {goog.dom.ViewportSizeMonitor}
 */
zoy.dom.ViewportSizeMonitor = function(opt_window) {
  goog.base(this);

  /**
   * @private
   * @type {goog.events.EventHandler}
   */
  this.eh_ = new goog.events.EventHandler(this);

  /**
   * @private
   * @type {goog.Timer}
   */
  this.timer_ = new goog.Timer(100);

  this.eh_
      .listen(this.timer_, goog.Timer.TICK, this.handleResizeTimerTick_)
      .listen(this, goog.events.EventType.RESIZE, this.handleViewportResize_);
};
goog.inherits(zoy.dom.ViewportSizeMonitor, goog.dom.ViewportSizeMonitor);
goog.addSingletonGetter(zoy.dom.ViewportSizeMonitor);


/**
 * @enum {string}
 */
zoy.dom.ViewportSizeMonitor.EventType = {
  DELAYED_RESIZE: 'delayedreisze'
};


/**
 * @private
 * @param {goog.events.Event} e An event provided by ViewportSizeMonitor.
 */
zoy.dom.ViewportSizeMonitor.prototype.handleViewportResize_ = function(e) {
  if (this.timer_.enabled) {
    this.timer_.stop();
  }
  this.timer_.start();
};


/**
 * @private
 * @param {goog.events.Event} e A tick event.
 */
zoy.dom.ViewportSizeMonitor.prototype.handleResizeTimerTick_ = function(e) {
  this.timer_.stop();
  this.dispatchEvent(zoy.dom.ViewportSizeMonitor.EventType.DELAYED_RESIZE);
};


/** @inheritDoc */
zoy.dom.ViewportSizeMonitor.prototype.disposeInternal = function() {
  if (this.eh_) {
    this.eh_.dispose();
    this.eh_ = null;
  }
  if (this.timer_) {
    this.timer_.dispose();
    this.timer_ = null;
  }
  goog.base(this, 'disposeInternal');
};

