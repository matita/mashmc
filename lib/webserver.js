var express = require('express');
  app = express(),
  http = require('http').createServer(app);


exports.init = function(mashmc, callback) {
  var config = mashmc.config;

  app
    .get('/', function(req, res) {
      if (config.homeRedirect)
        res.redirect(config.homeRedirect);
    })
    .get('/apps', function(req, res) {
      res.send('apps');
    })
    .listen(config.webserverPort, function(err) {
      if (err)
        return callback(err);
      console.log('server listening on port', config.webserverPort);
      callback(null);
    });
}


exports.scopedRouter = function(path) {
  var router = {};
  Object.keys(app)
    .forEach(function(method) {
      router[method] = function() {
        if (arguments.length && typeof(arguments[0]) == 'string')
          arguments[0] = path + arguments[0];
        app[method].apply(app, arguments);
        return router;
      }
    });

  //console.log('scopedroute', router);

  return router;
}