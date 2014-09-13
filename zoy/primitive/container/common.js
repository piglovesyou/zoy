
goog.provide('zoy.primitive.container');
goog.provide('zoy.primitive.container.common');


zoy.primitive.container.common = {};

/**
 * @this {goog.ui.Component}
 * @param {goog.events.EventType} type .
 * @param {Object} data .
 */
zoy.primitive.container.common.broadcast = function(type, data) {
  this.forEachChild(function(childId) {
    var child = this.getChild(childId);
    if (goog.isFunction(child.broadcast)) {
      child.broadcast(type, data);
    } else if (child.cannels && child.cannels[type]) {
      /** @type {zoy.primitive.device.Interface} */(child).channels[type].call(child, data);
    }
  }, this);
};

/**
 * @param {goog.ui.Component} component
 * @param {goog.events.EventHandler} eh .
 */
zoy.primitive.container.common.asBroadcaster = function(component, eh) {
  eh.listen(component, component.data.broadcastEvents || [], function(e) {
    component.broadcast(
        /** @type {goog.events.EventType} */(e.type),
        /** @type {Object} */(e.data));
  });
};
