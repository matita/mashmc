var npm = require('npm');
var path = require('path');
var isThere = require('is-there');
var express = require('express');

var apps = [];
var appInstances = {};




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
        
      var appNamespace = mashmc.config.appNamespace;
      
      for (var packageName in pluginList.dependencies)
        if (packageName.indexOf(appNamespace) == 0) {
          var npmPackage = pluginList.dependencies[packageName];
          initApp(npmPackage, appNamespace, mashmc);
        }

      console.log('apps loaded');
      callback(null, apps);
    })
  });
}


exports.all = function() {
  return apps;
}


/** package is
  {
    name: 'mashmc',
    version: '0.1.0',
    description: 'Media center written in Node.js',
    main: 'index.js',
    scripts: { test: 'mocha' },
    author: { name: 'Matita', email: 'matitald@gmail.com' },
    license: 'ISC'
    devDependencies: { 'expect.js': '^0.3.1' }
    gitHead: 'f04b7bd6ac1e2f0f70296cbac731682097d25c80'
    readme: 'ERROR: No README data found!',
    _id: 'mashmc@0.1.0',
    realName: 'mashmc',
    _dependencies: { 
      express: '^4.12.3',
      nedb: '^1.1.2',
      npm: '^2.7.6',
      walkdir: '0.0.7',
      'expect.js': '^0.3.1' },
    extraneous: false,
    path: 'c:\matteo\progetti\mashmc',
    realPath: 'c:\matteo\progetti\mashmc',
    link: undefined,
    depth: 0,
    peerDependencies: {},
    root: true
  }
  */
function initApp(npmPackage, appNamespace, mashmc) {
  var packageName = npmPackage.name;
  var appName = packageName.indexOf(appNamespace) == 0 ? packageName.substr(appNamespace.length) : packageName;
  var appUrl = '/' + appName;
  var publicPath = path.resolve(npmPackage.path, 'public');
  var hasPublic = isThere.sync(publicPath);
  var ctor = require(packageName);
  var scopedRoute = mashmc.server.scopedRouter(appUrl);
  var app = new ctor(mashmc, scopedRoute);

  var package = {
    name: packageName,
    appName: appName,
    version: npmPackage.version,
    description: npmPackage.description,
    author: npmPackage.author,
    path: npmPackage.path,
    hasGUI: hasPublic,
    url: appUrl
  };

  
  if (hasPublic)
    scopedRoute.use('', express.static(publicPath));

  apps.push(package);
  appInstances[packageName] = app;
  console.log('- app:', appName);
}