var npm = require('npm');
var path = require('path');
var isThere = require('is-there');
var express = require('express');
var fs = require('fs');
var browserify = require('browserify');
var Handlebars = require('handlebars');

var apps = [];
var appInstances = {};
var guis = {};
var master;
var mainPath = path.dirname(require.main.filename);
var masterPath = path.resolve(mainPath, 'public/index.html');




exports.get = function(appsList, callback) {
  if (typeof(appsList) == 'string')
    appsList = [appsList];

  callback.apply({}, appsList.map(function(appName) {
    return apps[appName];
  }));
}


exports.init = function(mashmc, callback) {
  console.log('loading apps');

  fs.readFile(masterPath, function(err, data) {
    if (err)
      return console.error('Cannot read', masterPath, err);
    master = data.toString();
  });

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
    url: appUrl
  };

  
  initAppGUI(package, mashmc, scopedRoute);

  apps.push(package);
  appInstances[packageName] = app;
  console.log('- app:', appName);
}


function initAppGUI(app, mashmc, scopedRoute) {
  var publicPath = path.resolve(app.path, 'public');
  var hasPublic = isThere.sync(publicPath);
  if (hasPublic) {
    app.hasGUI = hasPublic;
    storeAppHtml(app, publicPath);
    scopedRoute.use('', injectToMaster(app, publicPath));
    scopedRoute.use('', express.static(publicPath));
  }
}


function injectToMaster(app, publicPath) {
  return function(req, res) {
    storeAppHtml(app, publicPath);

    createAppsJs();
    var html = getAppsHtml();

    var page = master.replace('<!--APPS-->', html);
    res.send(page);
  }
}

function getAppsHtml() {
  var appTmplPath = path.resolve('public', 'app-tmpl.html');
  var appTmplHtml = fs.readFileSync(appTmplPath).toString();
  var appTmpl = Handlebars.compile(appTmplHtml);
  var html = apps
    .map(appTmpl)
    .join('');
  return html;
}


function createAppsJs() {
  var js = apps
    .map(createAppJsFile)
    .join('');
  var tempJsPath = path.resolve('src', 'temp-apps.js');
  fs.writeFileSync(tempJsPath, js);
  var outputJsPath = path.resolve('public', 'apps.js');
  var outputJsStream = fs.createWriteStream(outputJsPath);
  var b = browserify();
  b.add(tempJsPath)
    .bundle()
    .pipe(outputJsStream);
}


function storeAppHtml(app, publicPath) {
  var indexPath = path.resolve(publicPath, 'index.html');
  var data = fs.readFileSync(indexPath).toString();
  var html = data; //'<!--' + app.name + '-->' + data + '<!--/' + app.name + '-->';
  app.html = html;

  var jsPath = path.resolve(publicPath, 'app.js');
  app.jsPath = jsPath;
}


function createAppJsFile(app) {
  var jsTmpl = fs.readFileSync('src/app-tmpl.js').toString();
  jsTmpl = jsTmpl
    .replace(/\{\{jsPath\}\}/g, app.jsPath.replace(/\\/g, '\\\\'))
    .replace(/\{\{appJson\}\}/g, JSON.stringify(app));
  return jsTmpl;
}