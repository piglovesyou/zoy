
goog.provide('app.ui');

goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.json');
goog.require('goog.ui.Component');
goog.require('zoy.tool');

app.ui = {};


app.ui.enter = function(rootEl) {
  var rootComponent = zoy.tool.generate(rootEl);
  rootComponent.decorate(rootEl);
};
goog.exportSymbol('app.ui.enter', app.ui.enter);

