var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// global.CLOSURE_BASE_PATH = 'libs/closure-library/closure/goog/';
// require('closure').Closure(global);

var soynode = require('soynode');
var assert = require('assert');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';


soynode.setOptions({
  tmpDir: '/tmp/zoy',
  allowDynamicRecompile: !isProduction,
  classpath: [ __dirname + '/java/classes' ],
  pluginModules: [ "com.piglovesyou.soy.function.SoyFunctionsModule" ]
});

soynode.compileTemplates(__dirname + '/zoy', function(err) {
  if (err) throw err;
  console.log('soy ready.');
});

var SoyData = {
  isProduction: isProduction,
  id: "__root__",
  context: {
    "__root__": { component: "app.RootContainer", children: [ "__wrapper__" ] },
    "__wrapper__": { component: "zoy.primitive.container.Container", classNames: [ 'container' ], children: [ "__toolbar__", "__toolbar__2", "__document__", "__header__", "__snapSplitContainer__", "__namecard__" ] },

    "__toolbar__2": {
      component: "zoy.primitive.device.Toolbar",
      orientation: 'vertical',
      buttonItems: [
        { type: 'toggle', id: 'bold', icon: 'bold', description: 'Bold'},
        { type: 'toggle', id: 'italic', icon: 'italic', description: 'Italic'},
        { type: 'toggle', id: 'magnet', icon: 'magnet', description: 'Underline'},
        { type: 'menu', id: 'color', icon: 'pencil', description: 'Text color', menuItems: [
              {id: "__textColor01__", text: "Red", style: {color: '#800' }},
              {id: "__textColor02__", text: "Green", style: {color: '#080' }},
              {id: "__textColor03__", text: "Blue", style: {color: '#008' }},
              ] },
        { type: 'menu', id: 'bgColor', icon: 'tint', description: 'Background color', menuItems: [
              {id: "__bgColor01__", text: "Red", style: {color: '#800' }},
              {id: "__bgColor02__", text: "Green", style: {color: '#080' }},
              {id: "__bgColor03__", text: "Blue", style: {color: '#008' }},
              ] },
        { type: 'menu', id: 'style', text: 'Style', description: 'Style', menuItems: [
              {id: "__style01__", text: "Clear formatting"},
              {type: '--'},
              {id: "__style02__", text: "Normal paragraph text"},
              {id: "__style03__", text: "Minor heading (H3)"},
              {id: "__style04__", text: "Sub-heading (H2)"},
              {id: "__style05__", text: "Heading (H1)"},
              {type: '--'},
              {id: "__style06__", text: "Indent more"},
              {id: "__style07__", text: "Indent less"},
              {id: "__style010__", text: "Blockquote", disabled: true},
              ] },
        { type: '--' },
        { type: 'menu', id: 'insert', icon: 'picture', description: 'Insert', menuItems: [
              {id: "__insert01__", text: "Picture" },
              {id: "__insert02__", text: "Drawing" },
              {id: "__insert03__", text: "Other..." },
              ] },
        { type: '--' },
        { type: 'button', id: 'link', icon: 'link', description: 'Create link' },
        { type: 'menu', id: 'listStyle', icon: 'list', description: 'List style', menuItems: [ ], disabled: true },
        ] // end buttons
    },

    "__toolbar__": {
      component: "zoy.primitive.device.Toolbar",
      // orientation: 'vertical',
      buttonItems: [
        { type: 'select', id: 'font', text: 'Select font', description: 'Font', menuItems: [
              {id: "__font01__", text: "Normal"},
              {id: "__font02__", text: "Times"},
              {id: "__font03__", text: "Courier New"},
              {id: "__font04__", text: "Georgia"},
              {id: "__font05__", text: "Trebuchet"},
              {id: "__font06__", text: "Verdana"},
              ] },
        { type: 'select', id: 'fontSize', text: 'Size', description: 'Font size', menuItems: [
              {id: "__fontSize01__", text: "7pt"},
              {id: "__fontSize02__", text: "10pt"},
              {id: "__fontSize03__", text: "14pt"},
              {id: "__fontSize04__", icon: 'bold', text: "18pt"},
              {id: "__fontSize05__", text: "24pt"},
              {id: "__fontSize06__", text: "36pt"},
              ] },
        { type: 'toggle', id: 'bold', icon: 'bold', description: 'Bold'},
        { type: 'toggle', id: 'italic', icon: 'italic', description: 'Italic'},
        { type: 'toggle', id: 'magnet', icon: 'magnet', description: 'Underline'},
        { type: 'menu', id: 'color', icon: 'pencil', description: 'Text color', menuItems: [
              {id: "__textColor01__", text: "Red", style: {color: '#800' }},
              {id: "__textColor02__", text: "Green", style: {color: '#080' }},
              {id: "__textColor03__", text: "Blue", style: {color: '#008' }},
              ] },
        { type: 'menu', id: 'bgColor', icon: 'tint', description: 'Background color', menuItems: [
              {id: "__bgColor01__", text: "Red", style: {color: '#800' }},
              {id: "__bgColor02__", text: "Green", style: {color: '#080' }},
              {id: "__bgColor03__", text: "Blue", style: {color: '#008' }},
              ] },
        { type: 'menu', id: 'style', text: 'Style', description: 'Style', menuItems: [
              {id: "__style01__", text: "Clear formatting"},
              {type: '--'},
              {id: "__style02__", text: "Normal paragraph text"},
              {id: "__style03__", text: "Minor heading (H3)"},
              {id: "__style04__", text: "Sub-heading (H2)"},
              {id: "__style05__", text: "Heading (H1)"},
              {type: '--'},
              {id: "__style06__", text: "Indent more"},
              {id: "__style07__", text: "Indent less"},
              {id: "__style010__", text: "Blockquote", disabled: true},
              ] },
        { type: '--' },
        { type: 'menu', id: 'insert', icon: 'picture', text: 'Insert', description: 'Insert', menuItems: [
              {id: "__insert01__", text: "Picture" },
              {id: "__insert02__", text: "Drawing" },
              {id: "__insert03__", text: "Other..." },
              ] },
        { type: '--' },
        { type: 'button', id: 'link', icon: 'link', text: 'Link', description: 'Create link' },
        { type: 'menu', id: 'listStyle', icon: 'list', description: 'List style', menuItems: [ ], disabled: true },
        { type: '--' },
        { type: 'menu', id: 'spellcheck', text: 'Check spelling', description: 'Check spelling', menuItems: [ ], disabled: true },
        ] // end buttons
    },

    "__snapSplitContainer__": { component: "zoy.primitive.container.SnapSplitContainer", children: ["__list__", "__list2__" ], style: {height: '200px' }, resizeOnViewportChange: true, orientation: 'horizontal'},

    "__list__": { component: "zoy.primitive.iterator.List", children: [],
                  url: '/api/list',
                  style: { height: '100%' } },

    "__list2__": { component: "zoy.primitive.iterator.List", children: [],
                  url: '/api/list',
                  style: { height: '100%' } },

    // "__textXX__": { component: "zoy.primitive.device.StaticText", text: "さいしょのテキスト" },
    "__textYY__": { component: "zoy.primitive.device.StaticText", text: "２個目のテキスト" },

    // Heading Text
    "__header__": { component: "zoy.primitive.device.BlockText", text: "レディースエンドジェントルマン！", tagName: 'h1' },

    // Namecard
    "__namecard__": { component: "zoy.primitive.container.Container", children: [ '__namecardGrid__' ], classNames: ['zoy-document__fieldswrap'] },
    "__namecardGrid__": { component: "zoy.primitive.container.GridContainer", children: [ '__namecardLabel__', '__namecardWidget__' ], styles: [ {numerator: 3}, {numerator: 9} ] },
    "__namecardLabel__": { component: "zoy.primitive.device.Image", text: "これ画像！", path: "/images/photo.jpg", style: { width: '100%'} },
    "__namecardWidget__": { component: "zoy.primitive.container.Container", children: [ '__namecardName__', '__namecardButtonWrap__' ] },
    "__namecardName__": { component: "zoy.primitive.device.StaticText", text: "オラ悟空！" },
    "__namecardButtonWrap__": { component: "zoy.primitive.container.Container", children: [ '__namecardButton__'], style: { 'text-align': 'right' }  },
    "__namecardButton__": { component: "zoy.primitive.device.Button", text: "✓ お、おう" },

    // Document
    "__document__": { component: "zoy.primitive.container.Container", children: [ "__documentTitle__", "__tabContainer__", "__buttonSet__" ], classNames: ['zoy-document'] },
    "__documentTitle__": { component: "zoy.primitive.device.BlockText", text: "文書を作成してください..", tagName: 'p' },

    "__tabContainer__": { component: "zoy.primitive.container.TabContainer", children: [ "__tabContentA__", "__tabContentB__", "__tabContentC__" ], selectedTabIndex: 0, location: 'top' },
    "__tabContentA__": { component: "zoy.primitive.container.Container", title: "基本タブ", children: [ "__field01__", "__field02__", "__field03__", "__field04__" ], classNames: ['zoy-document__fieldswrap'] },
    "__tabContentB__": { component: "zoy.primitive.container.Container", title: "詳細設定", children: [ "__field05__", "__field06__", "__field07__", "__field08__" ], classNames: ['zoy-document__fieldswrap'] },
    "__tabContentC__": { component: "zoy.primitive.container.Container", title: "これだめ", disabled: true, children: [ ], classNames: ['zoy-document__fieldswrap'] },

    "__field01__": { component: "zoy.primitive.container.GridContainer", children: [ "__field01Label", "__field01Widget__" ],
        styles: [ {numerator: 4, 'text-align': 'right'}, {numerator: 8} ] },
    "__field01Label": { component: "zoy.primitive.device.StaticText", text: "テキストフィールド" },
    "__field01Widget__": { component: "zoy.primitive.device.TextInput", placeholder: "テキストを入力" },
    "__field02__": { component: "zoy.primitive.container.GridContainer", children: [ "__field02Label", "__field02Widget__" ],
        styles: [ {numerator: 4, 'text-align': 'right'}, {numerator: 8} ] },
    "__field02Label": { component: "zoy.primitive.device.StaticText", text: "日時フィールド" },
    "__field02Widget__": { component: "zoy.primitive.device.InputDatePicker", pattern: "yyyy'/'MM'/'dd", placeholder: '日時を選択' },


    "__field03__": { component: "zoy.primitive.container.GridContainer", children: [ "__field03Label", "__field03Widget__" ],
        styles: [ {numerator: 4, 'text-align': 'right'}, {numerator: 8} ] },

    "__field03Label": { component: "zoy.primitive.device.StaticText", text: "ビューフィールド" },
    "__field03Widget__": { component: "zoy.primitive.iterator.List", children: [],
                  url: '/api/list',
                  style: { height: '200px' } },


    "__field04__": { component: "zoy.primitive.container.GridContainer", children: [ "__field04Label", "__field04Widget__" ],
        styles: [ {numerator: 4, 'text-align': 'right'}, {numerator: 8} ] },
    "__field04Label": { component: "zoy.primitive.device.StaticText", text: "フィールド44" },
    "__field04Widget__": { component: "zoy.primitive.device.MenuButton", text: "メニューボタン", menuItems: [
        {id: "__menuItem01__", label: "menuItem01"},
        {id: "__menuItem02__", label: "menuItem02"},
        {id: "__menuItem03__", label: "menuItem03"},
        // TODO: Use "type"
        {id: "--"},
        {id: "__menuItem04__", label: "menuItem04"}] },

    "__field05__": { component: "zoy.primitive.container.GridContainer", children: [ "__field05Label", "__field05Widget__" ],
        styles: [ {numerator: 4, 'text-align': 'right'}, {numerator: 8} ] },
    "__field05Label": { component: "zoy.primitive.device.StaticText", text: "フィールド05" },
    "__field05Widget__": { component: "app.Button", text: "ボタン" },
    "__field06__": { component: "zoy.primitive.container.GridContainer", children: [ "__field06Label", "__field06Widget__" ],
        styles: [ {numerator: 4, 'text-align': 'right'}, {numerator: 8} ] },
    "__field06Label": { component: "zoy.primitive.device.StaticText", text: "フィールド06" },
    "__field06Widget__": { component: "app.Button", text: "ボタン" },
    "__field07__": { component: "zoy.primitive.container.GridContainer", children: [ "__field07Label", "__field07Widget__" ],
        styles: [ {numerator: 4, 'text-align': 'right'}, {numerator: 8} ] },
    "__field07Label": { component: "zoy.primitive.device.StaticText", text: "フィールド07" },
    "__field07Widget__": { component: "app.Button", text: "ボタン" },
    "__field08__": { component: "zoy.primitive.container.GridContainer", children: [ "__field08Label", "__field08Widget__" ],
        styles: [ {numerator: 4, 'text-align': 'right'}, {numerator: 8} ] },
    "__field08Label": { component: "zoy.primitive.device.StaticText", text: "フィールド08" },
    "__field08Widget__": { component: "app.Button", text: "ボタン" },

    "__buttonSet__": { component: "zoy.primitive.container.Container", children: [ "__cancelButton__", "__submitButton__" ], style: { 'text-align': 'right' }, classNames: ['zoy-document__buttonset'] },
    "__cancelButton__": { component: "app.Button", text: "やめる" },
    "__submitButton__": { component: "app.Button", text: "送信" },

  }
};
validateSoyData(SoyData);

app.get('/', function(req, res) {
  res.end(soynode.render('app.soy.index.main', SoyData));
});





var dummyListTotal = 138;
var dummyListData = [];
for (var i = 0; i < dummyListTotal; i++) {
  dummyListData[i] = {id: 'id_' + i, title: 'title_' + i};
}
app.get('/api/list', function(req, res) {
  var t;
  var offset = (t = req.param('offset')) ? parseInt(t, 10) : 0;
  var count = (t = req.param('count')) ? parseInt(t, 10) : 50;
  res.json({
    total: dummyListTotal,
    offset: offset,
    count: count,
    items: dummyListData.slice(offset, offset + count)
  });
});


// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


function validateSoyData(data) {
  var context = data.context;

  var childrenIds = {};

  // Validate root component exists
  assert(context[data.id], 'Root container Id does not exists.');

  for (var k in context) {
    var d = context[k];

    // Validate having component
    assert(d.component, '"component" should be in a component data.');

    // Validate all children exist
    if (d.children) {
      d.children.forEach(function(id) {
        assert(context[id], '"' + id + '" does not exists.');
        assert(!childrenIds[id], 'Child "' + id + '" is refered 2nd time by "' + k + '".');
        childrenIds[id] = true;
      });
    }
  }

}
