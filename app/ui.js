
goog.provide('app.ui');

goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.json');
goog.require('goog.ui.Component');
goog.require('g.tool');

app.ui = {};


app.ui.enter = function(rootEl) {
  var rootComponent = g.tool.generate(rootEl);
  rootComponent.decorate(rootEl);
};
goog.exportSymbol('app.ui.enter', app.ui.enter);

