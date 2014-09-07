
goog.provide('g.container.TabContainer');

goog.require('g.container.Interface');
goog.require('g.container.common');
goog.require('goog.ui.TabBar');



/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {g.container.Interface}
 */
g.container.TabContainer = function(data) {
  goog.base(this);

  this.data = data;

  this.tabbar_ = new goog.ui.TabBar(goog.ui.TabBar.Location.TOP);

  this.childElementsRef_ = goog.array.map(data.children, goog.dom.getElement);
  goog.array.forEach(this.childElementsRef_, function(el, i) {
    var child = g.tool.generate(el);
    this.addChildAt(child, i);
  }, this);

};
goog.inherits(g.container.TabContainer, goog.ui.Component);


/**
 * @private
 * @type {Array.<Element>}
 */
g.container.TabContainer.prototype.childElementsRef_;


g.container.TabContainer.prototype.broadcast = g.container.common.broadcast;


/** @override */
g.container.TabContainer.prototype.decorateInternal = function(element) {
  this.tabbar_.decorate(goog.dom.getElement(element.id + '_tabbar'));
  this.forEachChild(function(child, i) {
    child.decorate(this.childElementsRef_[i]);
    child.setSelected(goog.dom.classlist.contains(this.childElementsRef_[i], 'goog-tab-selected'))
  }, this);
  goog.base(this, 'decorateInternal', element);
};


g.container.TabContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  g.container.common.asBroadcaster(this, this.getHandler());

  // Handle SELECT events dispatched by tabs.
  var eh = this.getHandler();
  var lastSelectedTab = this.tabbar_.getSelectedTab();
  eh.listen(this.tabbar_, goog.ui.Component.EventType.SELECT, function update() {
    if (lastSelectedTab) {
      g.container.TabContainer.showTabContent(lastSelectedTab, false)
    }
    g.container.TabContainer.showTabContent((lastSelectedTab =
        /** @type {goog.ui.Tab} */(this.tabbar_.getSelectedTab())), true)
  });
};

g.container.TabContainer.showTabContent = function(tab, show) {
  var tabContentEl = goog.dom.getElement(tab.getId() + 'content');
  goog.style.setElementShown(tabContentEl, show)
};
