
goog.provide('g.tool');
g.tool = {};



/**
 * @param {Element} element
 * @return {goog.ui.Component} .
 */
g.tool.generate = function(element) {
  var data = g.tool.parse_(element);
  var classRef = goog.getObjectByName(data.component);
  goog.asserts.assert(classRef, 'Export "' + data.component + '".');
  goog.asserts.assertInstanceof(classRef.prototype, goog.ui.Component, '"' + data.component + '" should inherit goog.ui.Component');
  return new classRef(data);
};

/**
 * @param {Element} element .
 * @return {ObjectInterface.ComponentData}
 */
g.tool.parse_ = function(element) {
  var d = goog.dom.dataset.get(element, 'componentData');
  goog.asserts.assertString(d);
  var rv;
  try {
    rv = goog.json.unsafeParse(d);
  }
  catch(e) {
    goog.asserts.fail('Element must have dataset of "componentData".') 
    rv = {};
  }
  return /** @type {ObjectInterface.ComponentData} */(rv);
};

