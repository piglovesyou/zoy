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
  tmpDir: '/tmp/g',
  allowDynamicRecompile: !isProduction,
  classpath: [ __dirname + '/java/classes' ],
  pluginModules: [ "com.piglovesyou.soy.function.SoyFunctionsModule" ]
});

soynode.compileTemplates(__dirname + '/g/soy', function(err) {
  if (err) throw err;
  console.log('soy ready.');
});

var SoyData = {
  isProduction: isProduction,
  id: "__root__",
  context: {
    "__root__": { component: "app.RootContainer", children: [ "__wrapper__" ] },
    "__wrapper__": { component: "g.container.Container", children: [ "__header__", "__document__" ] },

    "__header__": { component: "g.device.BlockText", text: "レディースエンドジェントルマン！", tagName: 'h1' },

    // Document
    "__document__": { component: "g.container.Container", children: [ "__documentTitle__", "__tabContainer__", "__buttonSet__" ], className: 'g-document' },
    "__documentTitle__": { component: "g.device.BlockText", text: "文書を作成してください..", tagName: 'p' },

    "__tabContainer__": { component: "g.container.TabContainer", children: [ "__tabContentA__", "__tabContentB__" ], selectedTabIndex: 0, location: 'top' },
    "__tabContentA__": { component: "g.container.Container", title: "基本タブ", children: [ "__field01__", "__field02__", "__field03__", "__field04__" ], className: 'g-fields-wrap' },
    "__tabContentB__": { component: "g.container.Container", title: "詳細設定", children: [ "__field05__", "__field06__", "__field07__", "__field08__" ], className: 'g-fields-wrap' },

    "__field01__": { component: "g.container.GridContainer", children: [ "__field01Label", "__field01Widget__" ],
        denominator: 24, styles: [ {numerator: 8, textAlign: 'right'}, {numerator: 16} ] },
    "__field01Label": { component: "g.device.StaticText", text: "フィールド01" },
    "__field01Widget__": { component: "app.Button", text: "ボタン" },
    "__field02__": { component: "g.container.GridContainer", children: [ "__field02Label", "__field02Widget__" ],
        denominator: 24, styles: [ {numerator: 8, textAlign: 'right'}, {numerator: 16} ] },
    "__field02Label": { component: "g.device.StaticText", text: "フィールド02" },
    "__field02Widget__": { component: "app.Button", text: "ボタン" },
    "__field03__": { component: "g.container.GridContainer", children: [ "__field03Label", "__field03Widget__" ],
        denominator: 24, styles: [ {numerator: 8, textAlign: 'right'}, {numerator: 16} ] },
    "__field03Label": { component: "g.device.StaticText", text: "フィールド03" },
    "__field03Widget__": { component: "app.Button", text: "ボタン" },
    "__field04__": { component: "g.container.GridContainer", children: [ "__field04Label", "__field04Widget__" ],
        denominator: 24, styles: [ {numerator: 8, textAlign: 'right'}, {numerator: 16} ] },
    "__field04Label": { component: "g.device.StaticText", text: "フィールド44" },
    "__field04Widget__": { component: "app.Button", text: "ボタン" },

    "__field05__": { component: "g.container.GridContainer", children: [ "__field05Label", "__field05Widget__" ],
        denominator: 24, styles: [ {numerator: 8, textAlign: 'right'}, {numerator: 16} ] },
    "__field05Label": { component: "g.device.StaticText", text: "フィールド05" },
    "__field05Widget__": { component: "app.Button", text: "ボタン" },
    "__field06__": { component: "g.container.GridContainer", children: [ "__field06Label", "__field06Widget__" ],
        denominator: 24, styles: [ {numerator: 8, textAlign: 'right'}, {numerator: 16} ] },
    "__field06Label": { component: "g.device.StaticText", text: "フィールド06" },
    "__field06Widget__": { component: "app.Button", text: "ボタン" },
    "__field07__": { component: "g.container.GridContainer", children: [ "__field07Label", "__field07Widget__" ],
        denominator: 24, styles: [ {numerator: 8, textAlign: 'right'}, {numerator: 16} ] },
    "__field07Label": { component: "g.device.StaticText", text: "フィールド07" },
    "__field07Widget__": { component: "app.Button", text: "ボタン" },
    "__field08__": { component: "g.container.GridContainer", children: [ "__field08Label", "__field08Widget__" ],
        denominator: 24, styles: [ {numerator: 8, textAlign: 'right'}, {numerator: 16} ] },
    "__field08Label": { component: "g.device.StaticText", text: "フィールド08" },
    "__field08Widget__": { component: "app.Button", text: "ボタン" },

    "__buttonSet__": { component: "g.container.Container", children: [ "__cancelButton__", "__submitButton__" ], style: { textAlign: 'right' }, className: 'g-buttonset' },
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
