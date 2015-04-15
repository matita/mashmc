var npm = require('npm');

var apps = {};




exports.get = function(appsList, callback) {
  if (typeof(appsList) == 'string')
    appsList = [appsList];

  callback.apply({}, appsList.map(function(appName) {
    return apps[appName];
  }));
}


exports.init = function(mashmc, callback) {
  console.log('loading apps');

  npm.load(function() {
    npm.commands.ls('', true, function(err, pluginList) {
      if (err && !pluginList)
        return callback(err);
        
      apps = {};
      var appNamespace = mashmc.config.appNamespace;
      
      for (var packageName in pluginList.dependencies)
        if (packageName.indexOf(appNamespace) == 0)
          initApp(packageName, appNamespace, mashmc);

      console.log('apps loaded');
      callback(null, apps);
    })
  });
}


exports.all = function() {
  return apps;
}


function initApp(packageName, appNamespace, mashmc) {
  var ctor = require(packageName);
  var app = new ctor(mashmc);
  var appName = packageName.substr(appNamespace.length);

  if (app.route)
    app.route(mashmc.server.scopedRouter('/' + appName));

  apps[appName] = app;
  console.log('- app:', appName);
}