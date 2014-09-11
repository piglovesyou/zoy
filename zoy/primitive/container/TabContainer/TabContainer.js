
goog.provide('zoy.primitive.container.TabContainer');

goog.require('zoy.primitive.container.Interface');
goog.require('zoy.primitive.container.common');
goog.require('goog.ui.TabBar');



/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {zoy.primitive.container.Interface}
 */
zoy.primitive.container.TabContainer = function(data) {
  goog.base(this);

  this.data = data;

  this.tabbar_ = new goog.ui.TabBar(goog.ui.TabBar.Location.TOP);

  this.childElementsRef_ = goog.array.map(data.children, goog.dom.getElement);
  goog.array.forEach(this.childElementsRef_, function(el, i) {
    var child = zoy.tool.generate(el);
    this.addChildAt(child, i);
  }, this);

};
goog.inherits(zoy.primitive.container.TabContainer, goog.ui.Component);


/**
 * @private
 * @type {Array.<Element>}
 */
zoy.primitive.container.TabContainer.prototype.childElementsRef_;


zoy.primitive.container.TabContainer.prototype.broadcast = zoy.primitive.container.common.broadcast;


/** @override */
zoy.primitive.container.TabContainer.prototype.decorateInternal = function(element) {
  this.tabbar_.decorate(goog.dom.getElement(element.id + '_tabbar'));
  this.tabbar_.forEachChild(function(tab) {
    tab.setSelected(goog.dom.classlist.contains(tab.getElement(), 'goog-tab-selected'))
    tab.setEnabled(!goog.dom.classlist.contains(tab.getElement(), 'goog-tab-disabled'))
  }, this.tabbar_)
  this.forEachChild(function(child, i) {
    child.decorate(this.childElementsRef_[i]);
  }, this);
  goog.base(this, 'decorateInternal', element);
};


zoy.primitive.container.TabContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  zoy.primitive.container.common.asBroadcaster(this, this.getHandler());

  // Handle SELECT events dispatched by tabs.
  var eh = this.getHandler();
  var lastSelectedTab = this.tabbar_.getSelectedTab();
  eh.listen(this.tabbar_, goog.ui.Component.EventType.SELECT, function update() {
    if (lastSelectedTab) {
      zoy.primitive.container.TabContainer.showTabContent(lastSelectedTab, false)
    }
    zoy.primitive.container.TabContainer.showTabContent((lastSelectedTab =
        /** @type {goog.ui.Tab} */(this.tabbar_.getSelectedTab())), true)
  });
};

zoy.primitive.container.TabContainer.showTabContent = function(tab, show) {
  var tabContentEl = goog.dom.getElement(tab.getId() + 'content');
  goog.style.setElementShown(tabContentEl, show)
};
