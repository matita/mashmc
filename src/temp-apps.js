(function() {
  var app = {"name":"mashmc-apps","appName":"apps","version":"0.1.0","description":"Lists all installed apps on mashmc","author":{"name":"Matita","email":"matitald@gmail.com"},"path":"c:\\Progetti\\mashmc\\node_modules\\mashmc-apps","url":"/apps","hasGUI":true,"jsPath":"c:\\Progetti\\mashmc\\node_modules\\mashmc-apps\\public\\app.js","html":"  <div class=\"main\">\r\n\r\n  </div>\r\n\r\n\r\n  <script class=\"tmpl-plugin\" type=\"text/html\">\r\n    <a href=\"{{url}}\">\r\n      <div class=\"mashmc-list-item plugin\">\r\n        <h2 class=\"plugin-name\">{{appName}}</h2>\r\n        <p class=\"plugin-description\">{{description}}</p>\r\n      </div>\r\n    </a>\r\n  </script>"};
  var AppFn = require('c:\\Progetti\\mashmc\\node_modules\\mashmc-apps\\public\\app.js');
  var util = require('util');
  var BaseApp = require('./mashmc-app.js')(app);

  util.inherits(AppFn, BaseApp);

  mashmc.apps[app.name] = new AppFn(app);

})();(function() {
  var app = {"name":"mashmc-library","appName":"library","version":"0.1.0","description":"Lists media in mashmc","author":{"name":"Matita","email":"matitald@gmail.com"},"path":"c:\\Progetti\\mashmc\\node_modules\\mashmc-library","url":"/library","hasGUI":true,"jsPath":"c:\\Progetti\\mashmc\\node_modules\\mashmc-library\\public\\app.js","html":"<div class=\"media mashmc-list\">\r\n\r\n</div>\r\n\r\n\r\n<script class=\"tmpl-type\" type=\"text/html\">\r\n  <div class=\"media-type mashmc-list-item\">\r\n    <h2 class=\"media-type-title\">{{name}}</h2>\r\n  </div>\r\n</script>\r\n\r\n<script class=\"tmpl-media\" type=\"text/html\">\r\n  <div class=\"media-item mashmc-list-item\">\r\n    <h2 class=\"media-item-title\">{{title}}</h2>\r\n    <p class=\"media-item-filepath\">{{filepath}}</p>\r\n  </div>\r\n</script>"};
  var AppFn = require('c:\\Progetti\\mashmc\\node_modules\\mashmc-library\\public\\app.js');
  var util = require('util');
  var BaseApp = require('./mashmc-app.js')(app);

  util.inherits(AppFn, BaseApp);

  mashmc.apps[app.name] = new AppFn(app);

})();