
goog.provide('g.tool');
g.tool = {};



/**
 * @param {Element} element
 * @return {goog.ui.Component} .
 */
g.tool.generate = function(element) {
  var data = g.tool.parse_(element);
  var classRef = goog.getObjectByName(data.component);
  goog.asserts.assertInstanceof(classRef.prototype, goog.ui.Component);
  return new classRef(data);
};

g.tool.parse_ = function(element) {
  var d = goog.dom.dataset.get(element, 'componentData');
  return goog.json.unsafeParse(d);
};

