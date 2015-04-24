(function() {
  var app = {"name":"mashmc-apps","appName":"apps","version":"0.1.0","description":"Lists all installed apps","author":{"name":"Matita","email":"matitald@gmail.com"},"path":"c:\\matteo\\progetti\\mashmc\\node_modules\\mashmc-apps","url":"/apps","hasGUI":true,"jsPath":"c:\\matteo\\progetti\\mashmc\\node_modules\\mashmc-apps\\public\\app.js","html":"  <div class=\"main\">\r\n\r\n  </div>\r\n\r\n\r\n  <script class=\"tmpl-plugin\" type=\"text/html\">\r\n    <a href=\"{{url}}\">\r\n      <div class=\"mashmc-list-item plugin\">\r\n        <h2 class=\"plugin-name\">{{appName}}</h2>\r\n        <p class=\"plugin-description\">{{description}}</p>\r\n      </div>\r\n    </a>\r\n  </script>"};
  var AppFn = require('c:\\matteo\\progetti\\mashmc\\node_modules\\mashmc-apps\\public\\app.js');
  var util = require('util');
  var BaseApp = require('./mashmc-app.js')(app);

  util.inherits(AppFn, BaseApp);

  mashmc.apps[app.name] = new AppFn(app);

})();