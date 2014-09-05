
goog.provide('app.ui');

goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.json');
goog.require('goog.ui.Component');

app.ui = {};


app.ui.enter = function(rootEl) {
  var rootComponent = app.ui.generate(rootEl);
  rootComponent.decorate(rootEl);
};
goog.exportSymbol('app.ui.enter', app.ui.enter);

/**
 * @param {Element} element
 * @return {goog.ui.Component} .
 */
app.ui.generate = function(element) {
  var data = app.ui.parse(element);
  var classRef = goog.getObjectByName(data.component);
  goog.asserts.assertInstanceof(classRef.prototype, goog.ui.Component);
  return new classRef(data);
};

app.ui.parse = function(element) {
  var d = goog.dom.dataset.get(element, 'componentData');
  return goog.json.unsafeParse(d);
};

app.ui.generateChildren = function(data) {
  if (data.children) {
    return goog.array.map(data.children, function(childId) {
      return app.ui.generate(goog.dom.getElement(childId));
    });
  }
  return [];
};
