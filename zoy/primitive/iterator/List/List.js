/**
 * @license
 * Copyright (c) 2012 Soichi Takamura (http://stakam.net/).
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

goog.provide('zoy.primitive.iterator.List');
goog.provide('zoy.primitive.iterator.List.ClickItemEvent');
goog.provide('zoy.primitive.iterator.List.EventType');
goog.provide('zoy.primitive.iterator.List.StyleSheet_');

goog.require('goog.Disposable');
goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events.Event');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.math.Range');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('zoy.BaseInterface');
goog.require('zoy.primitive.iterator.list.Data');
goog.require('zoy.primitive.iterator.list.Data.EventType');
goog.require('zoy.primitive.iterator.list.Item');






/**
 * @constructor
 * @extends {goog.ui.Component}
 * @implements {zoy.BaseInterface}
 */
zoy.primitive.iterator.List = function(data, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.data = data;

  /**
   * @private
   * @type {function (new:zoy.primitive.iterator.list.Item, (Function|null)=, (goog.dom.DomHelper|null)=)}
   */
  this.itemClassRef_;

  /**
   * @type {Function}
   */
  this.rowRenderer_;

  if (this.itemClassRef_ = this.data.rowComponent && goog.getObjectByName(this.data.rowComponent)) {
  } else if (this.rowRenderer_ = this.data.rowRenderer && goog.getObjectByName(this.data.rowRenderer)) {
  } else {
  }
  if (!this.itemClassRef_) {
    this.itemClassRef_ = zoy.primitive.iterator.list.Item;
  }
  if (!this.rowRenderer_) {
    this.rowRenderer_ = zoy.primitive.iterator.List.defaultRenderer;
  }

  /**
   * @type {number}
   */
  this.rowCountPerPage = goog.isNumber(this.data.rowCountPerPage) ?
      this.data.rowCountPerPage : 25;

  /**
   * @type {number}
   */
  this.itemHeight = 80; // This will overridden at the first item rendering.

  /**
   * @private
   * @type {Function}
   */
  this.rowRenderer_;

  /**
   * Map to find an existing item by index.
   * { index: itemRef }
   * @private
   * @type {Object.<zoy.primitive.iterator.list.Item>}
   */
  this.indexItemMap_ = {};

  /**
   * Map to find index by item id.
   * { itemId : index }
   * @private
   * @type {Object.<number>}
   */
  this.idIndexMap_ = {};

  var totalRowCount = goog.isNumber(this.data.totalRowCount) ? this.data.totalRowCount : 50;
  this.setData(zoy.primitive.iterator.list.Data.get(this.data.url));

  window.list = this;
};
goog.inherits(zoy.primitive.iterator.List, goog.ui.Component);
goog.exportSymbol('zoy.primitive.iterator.List', zoy.primitive.iterator.List);


zoy.primitive.iterator.List.defaultRenderer = function(data) {
  return (data.id ? 'id: ' + data.id : '') +
         (data.title ? 'title: ' + data.title : '');
};


/**
 * @enum {string}
 */
zoy.primitive.iterator.List.EventType = {
  // TODO: rename it to CLICKITEM
  CLICKROW: 'clickrow',
  UPDATE_TOTAL: 'updatetotal'
};


/**
 * @param {zoy.primitive.iterator.list.Data} data .
 */
zoy.primitive.iterator.List.prototype.setData = function(data) {
  if (this.data_) {
    this.data_.dispose();
  }
  if (this.dataHandler_) {
    this.dataHandler_.dispose();
  }

  /**
   * @type {zoy.primitive.iterator.list.Data} .
   */
  this.data_ = data;

  /**
   * @type {goog.events.EventHandler}
   */
  this.dataHandler_ = new goog.events.EventHandler(this);
  this.dataHandler_
    .listen(this.data_,
        zoy.primitive.iterator.list.Data.EventType.UPDATE_TOTAL, this.handleTotalUpdate)
    .listen(this.data_,
        zoy.primitive.iterator.list.Data.EventType.UPDATE_ROW, this.handleRowUpdate_)
    .listenOnce(this.data_,
        zoy.primitive.iterator.list.Data.EventType.UPDATE_ROW, this.examinFirstItemHeight);

  this.updateParamsInternal();

  /**
   * Reset last range cache.
   * @type {goog.math.Range}
   */
  this.lastRange = null;
};


/**
 * @return {zoy.primitive.iterator.list.Data} data .
 */
zoy.primitive.iterator.List.prototype.getData = function() {
  return this.data_;
};


/** @inheritDoc */
zoy.primitive.iterator.List.prototype.getContentElement = function() {
  return this.contentEl;
};


/***/
zoy.primitive.iterator.List.prototype.updateParamsInternal = function() {
  this.lastPageIndex =
      Math.ceil(this.data_.getTotal() / this.rowCountPerPage) - 1;
  this.pageHeight = this.itemHeight * this.rowCountPerPage;

  // Cache for a speed.
  this.lastPageRows = this.data_.getTotal() % this.rowCountPerPage;
  if (this.lastPageRows == 0) this.lastPageRows = this.rowCountPerPage;
};


/** @inheritDoc */
zoy.primitive.iterator.List.prototype.createDom = function() {
  var dh = this.getDomHelper();
  var element = dh.createDom('div', 'goog-list',
    this.topMarginEl = dh.createDom('div', 'goog-list-topmargin'),
    this.contentEl = dh.createDom('div', 'goog-list-container'),
    this.bottomMarginEl = dh.createDom('div', 'goog-list-bottommargin'));
  this.setElementInternal(element);
};


/** @inheritDoc */
zoy.primitive.iterator.List.prototype.canDecorate = function(element) {
  if (element &&
      goog.dom.classlist.contains(element, 'goog-list') &&
      (this.topMarginEl =
          goog.dom.getElementByClass('goog-list-topmargin', element)) &&
      (this.contentEl =
          goog.dom.getElementByClass('goog-list-container', element)) &&
      (this.bottomMarginEl =
          goog.dom.getElementByClass('goog-list-bottommargin', element))) {
    return true;
  }
  return false;
};


/***/
zoy.primitive.iterator.List.prototype.updateVirualSizing = function() {
  goog.asserts.assert(this.lastRange);

  if (this.lastRange.start == 0 && this.data_.getTotal() < this.getChildCount()) {
    goog.array.forEach(this.getChildIds().slice(this.data_.getTotal()), function(id) {
      var child = this.removeChild(this.getChild(id), true);
      child.dispose();
    }, this);
  }

  this.topMargin.set(this.lastRange.start * this.pageHeight);
  this.bottomMargin.set(
      this.itemHeight * this.data_.getTotal() -
      this.lastRange.start * this.pageHeight -
      this.getChildCount() * this.itemHeight);
};


/** @inheritDoc */
zoy.primitive.iterator.List.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var eh = this.getHandler();
  var element = this.getElement();

  this.elementHeight = goog.style.getContentBoxSize(element).height;

  goog.asserts.assert(this.topMarginEl && this.bottomMarginEl);
  this.topMargin = new zoy.primitive.iterator.List.Margin_(this.topMarginEl);
  this.bottomMargin = new zoy.primitive.iterator.List.Margin_(this.bottomMarginEl);

  eh.listen(element, goog.events.EventType.SCROLL, this.redraw)
    .listen(this.getContentElement(),
        goog.events.EventType.CLICK, this.handleClick);

  this.installStylesheet_();

  if (this.data_) {
    this.redraw();
  } 
};


/**
 * @private
 */
zoy.primitive.iterator.List.prototype.installStylesheet_ = function() {
  var element = this.getElement();
  var id = element.id || (element.id = 'goog-list-' + goog.getUid(element));
  var styleSheet = new zoy.primitive.iterator.List.StyleSheet_(id, element);
  styleSheet.set('.goog-list-container', 'overflow', 'hidden');
  styleSheet.set('.goog-list-item', 'box-sizing', 'border-box');
  this.styleSheet = styleSheet;
};


/**
 * Examin the first rendered item and get its height.
 */
zoy.primitive.iterator.List.prototype.examinFirstItemHeight = function() {
  var c = this.getChildAt(0);
  if (!c) return;
  goog.style.setHeight(c.getElement(), '');
  var size = goog.style.getBorderBoxSize(c.getElement());

  this.setItemHeight_(size.height);

  this.updateParamsInternal();
  this.updateVirualSizing();
};


/**
 * @private
 * @param {number} h .
 */
zoy.primitive.iterator.List.prototype.setItemHeight_ = function(h) {
  this.itemHeight = h;
  this.styleSheet.set('.goog-list-item', 'height', h + 'px');
  this.styleSheet.update();
};


/**
 * @param {goog.events.Event} e .
 */
zoy.primitive.iterator.List.prototype.handleClick = function(e) {
  var item = this.findRowFromEventTarget(/**@type{Element}*/(e.target));
  if (item) {
    var index = this.getIndexById(item.getId());
    this.data_.asSelected([index]);
    item.dispatchEvent(new zoy.primitive.iterator.List.ClickItemEvent(
        this.data_.getRowByIndex(index), item));
  }
};


/**
 * @param {Element} et .
 * @return {?zoy.primitive.iterator.list.Item} .
 */
zoy.primitive.iterator.List.prototype.findRowFromEventTarget = function(et) {
  // TODO: Can be faster to seek item from a visible content.
  var found;
  goog.array.findIndex(this.getChildIds(), function(id, i) {
    var child = this.getChild(id);
    if (goog.dom.contains(child.getElement(), et)) {
      found = /**@type{zoy.primitive.iterator.list.Item}*/(child);
      return true;
    }
    return false;
  }, this);
  return found;
};


/**
 * @private
 * @param {goog.events.EventLike} e .
 */
zoy.primitive.iterator.List.prototype.handleRowUpdate_ = function(e) {
  var item = this.getItemByIndex(/**@type{number}*/(e.index));
  // There can be none for some reasons.
  if (item) item.renderContent(/**@type {goog.ds.DataNode} */(e.row));
};


/**
 * @param {number} index .
 * @return {zoy.primitive.iterator.list.Item} .
 */
zoy.primitive.iterator.List.prototype.getItemByIndex = function(index) {
  return this.indexItemMap_[index];
};


/**
 * @param {string} itemId .
 * @return {number} index .
 */
zoy.primitive.iterator.List.prototype.getIndexById = function(itemId) {
  return this.idIndexMap_[itemId];
};


/**
 * @protected
 * @param {goog.events.Event} e .
 */
zoy.primitive.iterator.List.prototype.handleTotalUpdate = function(e) {
  this.updateParamsInternal();
  this.updateVirualSizing();

  this.dispatchEvent({
    type: zoy.primitive.iterator.List.EventType.UPDATE_TOTAL,
    total: e.target.getTotal()
  });
};


/**
 * Here is the most of the logic in zoy.primitive.iterator.List.
 * A kind of large method but it would be hard to devide.
 */
zoy.primitive.iterator.List.prototype.redraw = function() {
  var dh = this.getDomHelper();
  var element = this.getElement();
  var content = this.contentEl;

  var top = element.scrollTop;
  var paddingTopPage = Math.floor(top / this.pageHeight);

  var boxMiddle = top + this.elementHeight / 2;
  var pageMiddle = paddingTopPage * this.pageHeight + this.pageHeight / 2;
  var boxPosLessThanPagePos = boxMiddle < pageMiddle;

  var isEdge = paddingTopPage == 0 && boxPosLessThanPagePos ||
               paddingTopPage == this.lastPageIndex && !boxPosLessThanPagePos;

  var range;
  if (isEdge) {
    range = new goog.math.Range(paddingTopPage, paddingTopPage);
  } else {
    var page1index = !boxPosLessThanPagePos ?
      paddingTopPage : paddingTopPage - 1;
    range = new goog.math.Range(page1index, page1index + 1);
  }

  if (goog.math.Range.equals(range, this.lastRange)) {
    return;
  }

  var lastRange = this.lastRange; // nullable
  this.lastRange = range;

  // We want to create only necessary rows, so if there is a item
  // that will be needed at this time as well, we keep it.
  if (!lastRange || !goog.math.Range.hasIntersection(range, lastRange)) {
    this.removeChildren(true);
  } else {
    for (var i = lastRange.start; i < lastRange.end + 1; i++) {
      if (!goog.math.Range.containsPoint(range, i)) {
        var from = i * this.rowCountPerPage;
        var to = Math.min(from + this.rowCountPerPage, this.data_.getTotal());
        for (var j = from; j < to; j++) {
          var item = this.indexItemMap_[j];
          goog.asserts.assert(item);
          var itemId = item.getId();
          this.removeChild(item, true);
          delete this.indexItemMap_[j];
          delete this.idIndexMap_[itemId];
        }
      }
    }
  }

  // Create rows of a page.
  // If we already have rows of a page, skip.
  var fragment = dh.getDocument().createDocumentFragment();
  for (var i = range.start; i < range.end + 1; i++) {
    if (!lastRange || !goog.math.Range.containsPoint(lastRange, i)) {
      var count = this.calcRowCountInPage_(i);
      fragment.appendChild(this.createPage(i, count));
    }
  }

  // In short, we are creating a virtual content, which contains a top margin +
  // a real dom content + a bottom margin. These three's height always comes
  // to (rowHeight * total), so that a browser native scrollbar indicates
  // a real size and position.
  this.updateVirualSizing();

  // We promise rows' data before append DOMs because we want
  // minimum manipulation of the DOM tree.
  var from = range.start * this.rowCountPerPage;
  goog.array.forEach(this.data_.collect(
      from, this.getChildCount()), function(node, i) {
    var item = this.getItemByIndex(from + i);
    // There can be none for some reasons.
    if (item) item.renderContent(node);
  }, this);

  //   .wait(goog.bind(this.onResolved, this));

  // Finally append DOMs to the DOM tree.
  if (!lastRange || lastRange.end < range.end) {
    content.appendChild(fragment);
  } else {
    dh.insertChildAt(content, fragment, 0);
  }
  // Make sure all the children entered in the Document.
  this.forEachChild(function(c) {
    if (!c.isInDocument()) c.enterDocument();
  });
};


/**
 * @private
 * @param {number} pageIndex .
 * @return {number} .
 */
zoy.primitive.iterator.List.prototype.calcRowCountInPage_ = function(pageIndex) {
  var total = this.data_.getTotal();
  if (total < (pageIndex + 1) * this.rowCountPerPage) {
    return total % this.rowCountPerPage;
  }
  return this.rowCountPerPage;
};


/**
 * @param {number} index The page index.
 * @param {number} rowCount .
 * @return {Node} .
 */
zoy.primitive.iterator.List.prototype.createPage = function(index, rowCount) {
  var dh = this.getDomHelper();
  var page = dh.getDocument().createDocumentFragment();
  var start = index * this.rowCountPerPage;
  var end = start + rowCount;
  for (var i = start; i < end; i++) {
    var item = new this.itemClassRef_(this.rowRenderer_, dh);
    item.createDom();
    dh.appendChild(page, item.getElement());
    this.addChild(item);
    this.indexItemMap_[i] = item;
    this.idIndexMap_[item.getId()] = i;
  }
  return page;
};



/**
 * An event dispached by list.Item.
 * @constructor
 * @extends {goog.events.Event}
 * @param {goog.ds.DataNode} data .
 * @param {Object=} row .
 */
zoy.primitive.iterator.List.ClickItemEvent = function(data, row) {
  goog.base(this, zoy.primitive.iterator.List.EventType.CLICKROW, row);

  /**
   * @type {goog.ds.DataNode}
   */
  this.data = data;
};
goog.inherits(zoy.primitive.iterator.List.ClickItemEvent, goog.events.Event);




















/**
 * @private
 * @constructor
 * @extends {goog.Disposable}
 * @param {Element} firstElement .
 */
zoy.primitive.iterator.List.Margin_ = function(firstElement) {
  goog.base(this);
  this.elms = [firstElement];
};
goog.inherits(zoy.primitive.iterator.List.Margin_, goog.Disposable);

/**
 * @type {number}
 */
zoy.primitive.iterator.List.Margin_.MAX_HEIGHT = 100 * 100 * 100;

/**
 * @param {number} height .
 */
zoy.primitive.iterator.List.Margin_.prototype.set = function(height) {

  // TODO: refactor

  var countNeeded = Math.ceil(height / zoy.primitive.iterator.List.Margin_.MAX_HEIGHT);
  var i;

  if (!countNeeded) {
    goog.style.setHeight(this.elms[0], 0);
    i = 1;
  } else {
    for (i = 0; i < countNeeded; i++) {
      // Cannot be zero.
      var h = i == countNeeded - 1 &&
              (height % zoy.primitive.iterator.List.Margin_.MAX_HEIGHT) ||
              zoy.primitive.iterator.List.Margin_.MAX_HEIGHT;
      if (!this.elms[i]) {
        var el = goog.dom.createDom('div');
        goog.dom.insertSiblingAfter(el,
            /**@type{Element}*/(goog.array.peek(this.elms)));
        this.elms[i] = el;
      }
      goog.style.setHeight(this.elms[i], h);
    }
  }

  for (; i < this.elms.length; i++) {
    goog.dom.removeNode(this.elms[i]);
    this.elms[i] = null;
  }

  this.elms.length = Math.max(countNeeded, 1);
};





/**
 * @constructor
 * @param {string} id .
 * @param {Element} element .
 * @private
 */
zoy.primitive.iterator.List.StyleSheet_ = function(id, element) {

  /**
   * Used as all selector prefix.
   */
  this.id = id;

  /**
   * @type {Element}
   */
  this.element = element;

  /**
   * styles[selector][property][value]
   */
  this.styles = {};

  /**
   * @type {Element|StyleSheet}
   */
  this.styleSheet = null;
};

/**
 * @param {string} selector .
 * @param {string} property .
 * @param {string} value .
 */
zoy.primitive.iterator.List.StyleSheet_.prototype.set = function(selector, property, value) {
  var sets = this.styles[selector] || (this.styles[selector] = {});
  sets[property] = value;
};

/**
 * Write a stylesheet and apply it on a document.
 */
zoy.primitive.iterator.List.StyleSheet_.prototype.update = function() {
  if (this.styleSheet) {
    goog.style.uninstallStyles(this.styleSheet);
  }
  this.styleSheet =
      goog.style.installStyles(this.buildStyles_(), this.element);
};

/**
 * Build stylesheet string.
 * @private
 * @return {string} .
 */
zoy.primitive.iterator.List.StyleSheet_.prototype.buildStyles_ = function() {
  var rv = '';
  for (var selector in this.styles) {
    rv += '#' + this.id + ' ' + selector + '{';
    for (var property in this.styles[selector]) {
      rv += property + ':' + this.styles[selector][property] + ';';
    }
    rv += '}';
  }
  return rv;
};

