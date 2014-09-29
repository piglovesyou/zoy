
goog.provide('app.decorate');

goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.json');
goog.require('goog.ui.Component');
goog.require('zoy.core');

app.decorate = {};


app.decorate = function(rootEl) {
  var rootComponent = zoy.core.generate(rootEl);
  rootComponent.decorate(rootEl);
};
goog.exportSymbol('app.decorate', app.decorate);

