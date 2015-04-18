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

var fs = require('fs'),
  server = require('./lib/webserver.js'),
  appsmanager = require('./lib/appsmanager.js'),
  db = require('./lib/db.js');

var mashmc = {
  config: JSON.parse(fs.readFileSync('./config.json')),
  db: db,
  server: server,
  apps: appsmanager
};


server.init(mashmc, function(err) {
  if (err) return console.error(err);
});


appsmanager.init(mashmc, function(err) {
  if (err) return console.error(err);
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
