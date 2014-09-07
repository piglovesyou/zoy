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
    "__root__": { "component": "app.RootContainer", children: [ "__wrapper__" ] },
    "__wrapper__": { "component": "g.container.Container", children: [ "__header__", "__button__", "__staticText__", "__button2__", "__gridContainer__" ] },
    "__header__": { "component": "g.container.Container", children: [ "__headerTitle__"] },
    "__headerTitle__": { "component": "g.device.StaticText", "title": "レディースエンドジェントルマン！" },
    "__staticText__": { "component": "g.device.StaticText", "title": "からの〜" },
    "__button__": { "component": "app.Button", "title": "xjasldfjasdkjf" },
    "__button2__": { "component": "app.Button", "title": "yyyyyyyyyyyyyyy" },

    "__gridContainer__": { "component": "g.container.GridContainer", children: [ "__button3__", "__button4__" ], layout: {denominator: 24, numerators: [10, 14]} },
    "__button3__": { "component": "app.Button", "title": "button3...." },
    "__button4__": { "component": "app.Button", "title": "button4...." },
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
