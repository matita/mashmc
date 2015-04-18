(function() {
  var app = {"name":"mashmc-apps","appName":"apps","version":"0.1.0","description":"Lists all installed apps","author":{"name":"Matita","email":"matitald@gmail.com"},"path":"c:\\Progetti\\mashmc\\node_modules\\mashmc-apps","url":"/apps","hasGUI":true,"html":"  <div class=\"main\">\r\n\r\n  </div>\r\n\r\n\r\n  <script class=\"tmpl-plugin\" type=\"text/html\">\r\n    <div class=\"plugin\">\r\n      <a href=\"{{url}}\"><h2 class=\"plugin-name\">{{appName}}</h2></a>\r\n      <p class=\"plugin-description\">{{description}}</p>\r\n    </div>\r\n  </script>","jsPath":"c:\\Progetti\\mashmc\\node_modules\\mashmc-apps\\public\\app.js"};
  var AppFn = require('c:\\Progetti\\mashmc\\node_modules\\mashmc-apps\\public\\app.js');
  var util = require('util');
  var BaseApp = require('./mashmc-app.js')(app);

  util.inherits(AppFn, BaseApp);

  mashmc.apps[app.name] = new AppFn(app);

  console.log('appPath', 'c:\\Progetti\\mashmc\\node_modules\\mashmc-apps\\public\\app.js');

})();