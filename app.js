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
    "__wrapper__": { component: "zoy.primitive.container.Container", children: [ "__header__", "__splitContainer__", "__snapSplitContainer__", "__namecard__", "__document__" ] },

    "__splitContainer__": { component: "zoy.primitive.container.SplitContainer", orientation: 'vertical', children: ["__textX__", "__textY__" ], style: {height: '200px' }, resizeOnViewportChange: true },
    "__textX__": { component: "zoy.primitive.device.StaticText", text: "さいしょのテキスト" },
    "__textY__": { component: "zoy.primitive.device.StaticText", text: "２個目のテキスト" },

    "__snapSplitContainer__": { component: "zoy.primitive.container.SnapSplitContainer", children: ["__textXX__", "__textYY__" ], style: {height: '200px' }, resizeOnViewportChange: true },
    "__textXX__": { component: "zoy.primitive.device.StaticText", text: "さいしょのテキスト" },
    "__textYY__": { component: "zoy.primitive.device.StaticText", text: "２個目のテキスト" },

    // Heading Text
    "__header__": { component: "zoy.primitive.device.BlockText", text: "レディースエンドジェントルマン！", tagName: 'h1' },

    // Namecard
    "__namecard__": { component: "zoy.primitive.container.Container", children: [ '__namecardGrid__' ], classNames: ['g-fields-wrap'] },
    "__namecardGrid__": { component: "zoy.primitive.container.GridContainer", children: [ '__namecardLabel__', '__namecardWidget__' ], denominator: 4, styles: [ {numerator: 1}, {numerator: 3} ] },
    "__namecardLabel__": { component: "zoy.primitive.device.Image", text: "これ画像！", path: "/images/photo.jpg", style: { width: '100%'} },
    "__namecardWidget__": { component: "zoy.primitive.container.Container", children: [ '__namecardName__', '__namecardButtonWrap__' ] },
    "__namecardName__": { component: "zoy.primitive.device.StaticText", text: "オラ悟空！" },
    "__namecardButtonWrap__": { component: "zoy.primitive.container.Container", children: [ '__namecardButton__'], style: { 'text-align': 'right' }  },
    "__namecardButton__": { component: "zoy.primitive.device.Button", text: "✓ お、おう" },

    // Document
    "__document__": { component: "zoy.primitive.container.Container", children: [ "__documentTitle__", "__tabContainer__", "__buttonSet__" ], classNames: ['g-document'] },
    "__documentTitle__": { component: "zoy.primitive.device.BlockText", text: "文書を作成してください..", tagName: 'p' },

    "__tabContainer__": { component: "zoy.primitive.container.TabContainer", children: [ "__tabContentA__", "__tabContentB__", "__tabContentC__" ], selectedTabIndex: 0, location: 'top' },
    "__tabContentA__": { component: "zoy.primitive.container.Container", title: "基本タブ", children: [ "__field01__", "__field02__", "__field03__", "__field04__" ], classNames: ['g-fields-wrap'] },
    "__tabContentB__": { component: "zoy.primitive.container.Container", title: "詳細設定", children: [ "__field05__", "__field06__", "__field07__", "__field08__" ], classNames: ['g-fields-wrap'] },
    "__tabContentC__": { component: "zoy.primitive.container.Container", title: "これだめ", disabled: true, children: [ ], classNames: ['g-fields-wrap'] },

    "__field01__": { component: "zoy.primitive.container.GridContainer", children: [ "__field01Label", "__field01Widget__" ],
        denominator: 24, styles: [ {numerator: 8, 'text-align': 'right'}, {numerator: 16} ] },
    "__field01Label": { component: "zoy.primitive.device.StaticText", text: "フィールド01" },
    "__field01Widget__": { component: "app.Button", text: "ボタン" },
    "__field02__": { component: "zoy.primitive.container.GridContainer", children: [ "__field02Label", "__field02Widget__" ],
        denominator: 24, styles: [ {numerator: 8, 'text-align': 'right'}, {numerator: 16} ] },
    "__field02Label": { component: "zoy.primitive.device.StaticText", text: "フィールド02" },
    "__field02Widget__": { component: "app.Button", text: "ボタン" },
    "__field03__": { component: "zoy.primitive.container.GridContainer", children: [ "__field03Label", "__field03Widget__" ],
        denominator: 24, styles: [ {numerator: 8, 'text-align': 'right'}, {numerator: 16} ] },
    "__field03Label": { component: "zoy.primitive.device.StaticText", text: "フィールド03" },
    "__field03Widget__": { component: "app.Button", text: "ボタン" },
    "__field04__": { component: "zoy.primitive.container.GridContainer", children: [ "__field04Label", "__field04Widget__" ],
        denominator: 24, styles: [ {numerator: 8, 'text-align': 'right'}, {numerator: 16} ] },
    "__field04Label": { component: "zoy.primitive.device.StaticText", text: "フィールド44" },
    "__field04Widget__": { component: "app.Button", text: "ボタン" },

    "__field05__": { component: "zoy.primitive.container.GridContainer", children: [ "__field05Label", "__field05Widget__" ],
        denominator: 24, styles: [ {numerator: 8, 'text-align': 'right'}, {numerator: 16} ] },
    "__field05Label": { component: "zoy.primitive.device.StaticText", text: "フィールド05" },
    "__field05Widget__": { component: "app.Button", text: "ボタン" },
    "__field06__": { component: "zoy.primitive.container.GridContainer", children: [ "__field06Label", "__field06Widget__" ],
        denominator: 24, styles: [ {numerator: 8, 'text-align': 'right'}, {numerator: 16} ] },
    "__field06Label": { component: "zoy.primitive.device.StaticText", text: "フィールド06" },
    "__field06Widget__": { component: "app.Button", text: "ボタン" },
    "__field07__": { component: "zoy.primitive.container.GridContainer", children: [ "__field07Label", "__field07Widget__" ],
        denominator: 24, styles: [ {numerator: 8, 'text-align': 'right'}, {numerator: 16} ] },
    "__field07Label": { component: "zoy.primitive.device.StaticText", text: "フィールド07" },
    "__field07Widget__": { component: "app.Button", text: "ボタン" },
    "__field08__": { component: "zoy.primitive.container.GridContainer", children: [ "__field08Label", "__field08Widget__" ],
        denominator: 24, styles: [ {numerator: 8, 'text-align': 'right'}, {numerator: 16} ] },
    "__field08Label": { component: "zoy.primitive.device.StaticText", text: "フィールド08" },
    "__field08Widget__": { component: "app.Button", text: "ボタン" },

    "__buttonSet__": { component: "zoy.primitive.container.Container", children: [ "__cancelButton__", "__submitButton__" ], style: { 'text-align': 'right' }, classNames: ['g-buttonset'] },
    "__cancelButton__": { component: "app.Button", text: "やめる" },
    "__submitButton__": { component: "app.Button", text: "送信" },

  }
};
validateSoyData(SoyData);

app.get('/', function(req, res) {
  res.end(soynode.render('app.soy.index.main', SoyData));
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
      })
    }
  }

}
