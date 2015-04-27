module.exports = function(app) {
  
  var BaseApp = function() { };

  // app ajax API
  BaseApp.prototype.api = {
    get: function() {
      arguments[0] = app.url + arguments[0];
      return $.get.apply($, arguments);
    }
  }

  // app jQuery wrapper
  var rootSelector = '.mashmc-app-' + app.name;
  BaseApp.prototype.$root = $(rootSelector);

  // app template utils
  BaseApp.prototype.tmpl = {};
  $(rootSelector + ' script[class^="tmpl-"]').each(function() {
    var $this = $(this),
      className = $this.attr('class').split(' ').shift(),
      name = className.replace(/^tmpl-/, '');
    BaseApp.prototype.tmpl[name] = Handlebars.compile($this.html());
  });

  // app route
  BaseApp.prototype.route = function() {
    console.log('basic route', arguments);
  }



  return BaseApp;

}