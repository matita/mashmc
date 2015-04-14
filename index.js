/*var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  lib = require('./lib/library'),
  api = require('./lib/api')(app, lib),
  Filer = require('./content/filer.js');

var port = 3000;

var filer = new Filer(lib);
var now = new Date();
filer
  .addPath('\\\\openelec\\TOSHIBA EXT')
  .on('end', function(path) {
    console.log('end of crawling', path, '(' + (new Date().getTime() - now.getTime()) + 'ms)');
  });

*/

var server = require('./lib/server.js')(3000),
  apps = require('./lib/apps.js'),
  db = require('./lib/db.js');

initApp('apps', apps);
apps.on('loaded', function(apps) {
  for (var appName in apps)
    initApp(appName, apps[appName]);
});

function initApp(appName, app) {
  console.log('init', appName);

  if (app.init)
    app.init(db, apps);

  if (app.route) {
    for (var path in app.route) {
      var route = app.route[path];
      for (var method in route) {
        server[method]('/' + appName + path, route[method]);
      }
    }
  }
    
}
