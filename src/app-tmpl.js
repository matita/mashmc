(function() {
  var app = {{appJson}};
  var AppFn = require('{{jsPath}}');
  var util = require('util');
  var BaseApp = require('./mashmc-app.js')(app);

  util.inherits(AppFn, BaseApp);

  mashmc.apps[app.name] = new AppFn(app);

  console.log('appPath', '{{jsPath}}');

})();